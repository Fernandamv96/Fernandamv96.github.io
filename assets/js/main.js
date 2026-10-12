// Portafolio FERR: scroll suave y estadísticas desde data.json (generado por GitHub Actions).
(function () {
  'use strict'

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Scroll suave para enlaces internos (respeta prefers-reduced-motion)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
      history.replaceState(null, '', id)
      if (id === '#home') return
      el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
    })
  })

  // Estadísticas: si data.json no existe o falla, se mantiene el fallback sin números
  const stats = document.querySelector('.stats-live')
  const fallback = document.querySelector('.stats-fallback')
  if (!stats) return

  // Ruta absoluta: funciona igual desde / y desde /en/
  fetch('/data.json', { cache: 'no-cache' })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status)
      return res.json()
    })
    .then(function (data) {
      const u = data.user
      if (!u || typeof u.publicRepos !== 'number') throw new Error('data.json inválido')

      stats.querySelector('[data-stat="publicRepos"]').textContent = u.publicRepos
      stats.querySelector('[data-stat="followers"]').textContent = u.followers
      stats.querySelector('[data-stat="following"]').textContent = u.following

      const fecha = new Date(data.generatedAt)
      const time = stats.querySelector('[data-stat="generatedAt"]')
      time.dateTime = data.generatedAt
      const locale = document.documentElement.lang === 'en' ? 'en-US' : 'es-CL'
      time.textContent = fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })

      const bar = stats.querySelector('.langs-bar')
      const list = stats.querySelector('.langs-list')
      ;(data.languages || []).forEach(function (lang, i) {
        const seg = document.createElement('span')
        seg.className = 'langs-seg langs-c' + (i % 6)
        seg.style.width = lang.pct + '%'
        bar.appendChild(seg)

        const li = document.createElement('li')
        const dot = document.createElement('span')
        dot.className = 'langs-dot langs-c' + (i % 6)
        dot.setAttribute('aria-hidden', 'true')
        li.append(dot, document.createTextNode(lang.name + ' ' + lang.pct + '%'))
        list.appendChild(li)
      })

      stats.hidden = false
      fallback.hidden = true
    })
    .catch(function (err) {
      console.info('Estadísticas no disponibles:', err.message)
    })
})()
