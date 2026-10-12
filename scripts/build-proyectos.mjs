// Genera las tarjetas de proyectos desde data/proyectos.json y las inserta en index.html
// entre <!-- proyectos:inicio --> y <!-- proyectos:fin -->. El HTML queda estático
// (visible sin JavaScript); el CI verifica que esté sincronizado con el JSON.
// Uso: node scripts/build-proyectos.mjs [--check]
import { readFile, writeFile } from 'node:fs/promises'

const INICIO = '<!-- proyectos:inicio -->'
const FIN = '<!-- proyectos:fin -->'
const check = process.argv.includes('--check')

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

// Texto con `código` → <code>código</code>
const rich = (s) => escape(s).replace(/`([^`]+)`/g, '<code>$1</code>')

function tarjeta(p) {
  const tituloId = `proyecto-${p.id}-titulo`
  const demo = p.demo
    ? `\n              <a class="case-link case-link-demo" href="${escape(p.demo)}" target="_blank" rel="noopener noreferrer">demo ↗<span class="sr-only"> de ${escape(p.nombre)}</span></a>`
    : ''
  const tecnologias = p.tecnologias
    .map((t) => `                  <dt>${escape(t.nombre)}</dt>\n                  <dd>${rich(t.uso)}</dd>`)
    .join('\n')
  const decisiones = p.decisiones.map((d) => `                  <li>${rich(d)}</li>`).join('\n')
  const stack = p.stack.map((s) => `<li>${escape(s)}</li>`).join('')

  return `        <article class="case" id="proyecto-${escape(p.id)}" aria-labelledby="${tituloId}">
          <div class="project-head">
            <span class="project-tag">${escape(p.tag)}</span>
            <span class="lang-dot lang-${escape(p.lang)}" aria-hidden="true"></span>
          </div>
          <h3 class="project-title" id="${tituloId}">${escape(p.nombre)}</h3>
          <dl class="case-summary">
            <div><dt>El problema</dt><dd>${rich(p.problema)}</dd></div>
            <div><dt>La solución</dt><dd>${rich(p.solucion)}</dd></div>
          </dl>
          <p class="sr-only">Stack:</p>
          <ul class="case-stack">${stack}</ul>
          <details class="case-details">
            <summary>Cómo lo construí</summary>
            <div class="case-body">
              <div>
                <h4>Cómo usé cada tecnología</h4>
                <dl class="case-tech">
${tecnologias}
                </dl>
              </div>
              <div>
                <h4>Decisiones y seguridad</h4>
                <ul class="case-decisions">
${decisiones}
                </ul>
              </div>
              <p class="case-result">${rich(p.resultado)}</p>
            </div>
          </details>
          <div class="case-links">
              <a class="case-link" href="${escape(p.repo)}" target="_blank" rel="noopener noreferrer">código ↗<span class="sr-only"> de ${escape(p.nombre)}</span></a>${demo}
          </div>
        </article>`
}

const proyectos = JSON.parse(await readFile(new URL('../data/proyectos.json', import.meta.url), 'utf8'))
const htmlPath = new URL('../index.html', import.meta.url)
const html = await readFile(htmlPath, 'utf8')

const i = html.indexOf(INICIO)
const f = html.indexOf(FIN)
if (i === -1 || f === -1 || f < i) throw new Error('No se encontraron los marcadores de proyectos en index.html')

const generado = `${INICIO}\n${proyectos.map(tarjeta).join('\n\n')}\n        ${FIN}`
const nuevo = html.slice(0, i) + generado + html.slice(f + FIN.length)

if (check) {
  if (nuevo !== html) {
    console.error('index.html no está sincronizado con data/proyectos.json. Ejecuta: npm run proyectos')
    process.exit(1)
  }
  console.log('Proyectos sincronizados ✔')
} else {
  await writeFile(htmlPath, nuevo)
  console.log(`index.html: ${proyectos.length} proyectos generados`)
}
