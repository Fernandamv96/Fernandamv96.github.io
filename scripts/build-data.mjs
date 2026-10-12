// Genera data.json con datos públicos del perfil desde la API de GitHub.
// Se ejecuta en el workflow de deploy (con GITHUB_TOKEN para evitar el rate limit).
// Uso: node scripts/build-data.mjs [ruta-salida]
import { writeFile } from 'node:fs/promises'

const USER = 'Fernandamv96'
const OUT = process.argv[2] ?? 'data.json'
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': `${USER}-portfolio-build`,
  ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
}

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers })
  if (!res.ok) throw new Error(`GitHub API ${path}: ${res.status} ${res.statusText}`)
  return res.json()
}

const user = await gh(`/users/${USER}`)
const repos = (await gh(`/users/${USER}/repos?per_page=100&type=owner`))
  .filter((r) => !r.fork && !r.archived && r.size > 0)

// Lenguajes por bytes (más fiel que el "lenguaje principal" de cada repo)
const bytes = {}
for (const repo of repos) {
  const langs = await gh(`/repos/${USER}/${repo.name}/languages`)
  for (const [lang, n] of Object.entries(langs)) bytes[lang] = (bytes[lang] ?? 0) + n
}
const total = Object.values(bytes).reduce((a, b) => a + b, 0) || 1
const languages = Object.entries(bytes)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 6)
  .map(([name, n]) => ({ name, pct: Math.round((n / total) * 1000) / 10 }))

const data = {
  generatedAt: new Date().toISOString(),
  user: {
    login: user.login,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
  },
  totals: {
    stars: repos.reduce((a, r) => a + r.stargazers_count, 0),
    reposWithCode: repos.length,
  },
  languages,
  repos: Object.fromEntries(
    repos.map((r) => [r.name, { language: r.language, stars: r.stargazers_count, pushedAt: r.pushed_at }]),
  ),
}

await writeFile(OUT, JSON.stringify(data, null, 2) + '\n')
console.log(`data.json: ${repos.length} repos con código, ${languages.length} lenguajes → ${OUT}`)
