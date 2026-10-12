// Genera las tarjetas de proyectos desde JSON y las inserta en cada página
// entre <!-- proyectos:inicio --> y <!-- proyectos:fin -->. El HTML queda estático
// (visible sin JavaScript); el CI verifica que esté sincronizado con los JSON.
// Uso: node scripts/build-proyectos.mjs [--check]
import { readFile, writeFile } from 'node:fs/promises'

const INICIO = '<!-- proyectos:inicio -->'
const FIN = '<!-- proyectos:fin -->'
const check = process.argv.includes('--check')

// Una entrada por idioma: JSON de origen, página destino, prefijo de rutas y textos fijos
const PAGINAS = [
  {
    json: 'data/proyectos.json',
    html: 'index.html',
    prefijo: '',
    t: {
      problema: 'El problema', solucion: 'La solución', stack: 'Stack:', resumen: 'Cómo lo construí',
      tecnologias: 'Cómo usé cada tecnología', decisiones: 'Decisiones y seguridad',
      codigo: 'código', demo: 'demo', de: 'de',
    },
  },
  {
    json: 'data/proyectos.en.json',
    html: 'en/index.html',
    prefijo: '../',
    t: {
      problema: 'The problem', solucion: 'The solution', stack: 'Stack:', resumen: 'How I built it',
      tecnologias: 'How I used each technology', decisiones: 'Decisions & security',
      codigo: 'code', demo: 'demo', de: 'for',
    },
  },
]

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

// Texto con `código` → <code>código</code>
const rich = (s) => escape(s).replace(/`([^`]+)`/g, '<code>$1</code>')

function tarjeta(p, { t: textos, prefijo }) {
  const t = Object.fromEntries(Object.entries(textos).map(([k, v]) => [k, escape(v)]))
  const tituloId = `proyecto-${p.id}-titulo`
  const demo = p.demo
    ? `\n              <a class="case-link case-link-demo" href="${escape(p.demo)}" target="_blank" rel="noopener noreferrer">${t.demo} ↗<span class="sr-only"> ${t.de} ${escape(p.nombre)}</span></a>`
    : ''
  const tecnologias = p.tecnologias
    .map((x) => `                  <dt>${escape(x.nombre)}</dt>\n                  <dd>${rich(x.uso)}</dd>`)
    .join('\n')
  const decisiones = p.decisiones.map((d) => `                  <li>${rich(d)}</li>`).join('\n')
  const stack = p.stack.map((s) => `<li>${escape(s)}</li>`).join('')
  const imagen = p.imagen
    ? `\n          <img class="case-thumb" src="${escape(prefijo + p.imagen)}" alt="${escape(p.alt)}" width="640" height="360" loading="lazy" decoding="async" />`
    : ''

  return `        <article class="case" id="proyecto-${escape(p.id)}" aria-labelledby="${tituloId}">${imagen}
          <div class="project-head">
            <span class="project-tag">${escape(p.tag)}</span>
            <span class="lang-dot lang-${escape(p.lang)}" aria-hidden="true"></span>
          </div>
          <h3 class="project-title" id="${tituloId}">${escape(p.nombre)}</h3>
          <dl class="case-summary">
            <div><dt>${t.problema}</dt><dd>${rich(p.problema)}</dd></div>
            <div><dt>${t.solucion}</dt><dd>${rich(p.solucion)}</dd></div>
          </dl>
          <p class="sr-only">${t.stack}</p>
          <ul class="case-stack">${stack}</ul>
          <details class="case-details">
            <summary>${t.resumen}</summary>
            <div class="case-body">
              <div>
                <h4>${t.tecnologias}</h4>
                <dl class="case-tech">
${tecnologias}
                </dl>
              </div>
              <div>
                <h4>${t.decisiones}</h4>
                <ul class="case-decisions">
${decisiones}
                </ul>
              </div>
              <p class="case-result">${rich(p.resultado)}</p>
            </div>
          </details>
          <div class="case-links">
              <a class="case-link" href="${escape(p.repo)}" target="_blank" rel="noopener noreferrer">${t.codigo} ↗<span class="sr-only"> ${t.de} ${escape(p.nombre)}</span></a>${demo}
          </div>
        </article>`
}

let desincronizado = false
for (const pagina of PAGINAS) {
  const proyectos = JSON.parse(await readFile(new URL(`../${pagina.json}`, import.meta.url), 'utf8'))
  const htmlPath = new URL(`../${pagina.html}`, import.meta.url)
  const html = await readFile(htmlPath, 'utf8')

  const i = html.indexOf(INICIO)
  const f = html.indexOf(FIN)
  if (i === -1 || f === -1 || f < i) throw new Error(`No se encontraron los marcadores de proyectos en ${pagina.html}`)

  const generado = `${INICIO}\n${proyectos.map((p) => tarjeta(p, pagina)).join('\n\n')}\n        ${FIN}`
  const nuevo = html.slice(0, i) + generado + html.slice(f + FIN.length)

  if (check) {
    if (nuevo !== html) {
      console.error(`${pagina.html} no está sincronizado con ${pagina.json}. Ejecuta: npm run proyectos`)
      desincronizado = true
    }
  } else {
    await writeFile(htmlPath, nuevo)
    console.log(`${pagina.html}: ${proyectos.length} proyectos generados`)
  }
}

if (check) {
  if (desincronizado) process.exit(1)
  console.log('Proyectos sincronizados ✔')
}
