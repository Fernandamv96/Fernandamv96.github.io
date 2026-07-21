<div align="center">

# 🌐 ferr.dev

### Personal portfolio · Programming & Cybersecurity

[![Live Site](https://img.shields.io/badge/🌐_live_site-fernandamv96.github.io-00f0ff?style=for-the-badge&logo=githubpages&logoColor=00f0ff&labelColor=050510)](https://fernandamv96.github.io)
[![GitHub Pages](https://img.shields.io/badge/deployed_with-GitHub_Pages-ff2bd6?style=for-the-badge&logo=github&logoColor=ff2bd6&labelColor=050510)](https://pages.github.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/license-MIT-b5ff3a?style=for-the-badge&labelColor=050510)](LICENSE)

<br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=22&pause=1000&color=00F0FF&center=true&vCenter=true&width=600&lines=programming+%C3%97+cybersecurity;ctf+%C3%97+hacking+%C3%A9tico;aprendiendo+siempre..." alt="Typing SVG" />

</div>

---

## ✦ Preview

A single-page, no-build portfolio built from scratch in semantic HTML and a custom CSS design system. The look is **neon tech** — pure-black canvas, cyan/magenta/lime glow, oversized display type, and a circuit-board grid underneath everything.

> 🟢 **Live →** [fernandamv96.github.io](https://fernandamv96.github.io)

---

## ✦ Features

| | |
|---|---|
| 🖤 **Pure-black canvas** with circuit-grid background + scanline overlay |
| 💡 **Neon glow system** — cyan, magenta, lime, violet as the only chromatic accents |
| 🔤 **Display typography** at 100–213px, tight tracking, terminal-style mono micro-copy |
| 📱 **Responsive** down to ~360px — nav collapses, portrait re-anchors, grids reflow |
| ⚡ **Zero build step** — open `index.html` and it works, no `node_modules`, no bundler |
| 🎨 **Custom design tokens** in `:root` for colors, fonts, radii, spacing, glows |
| 🔍 **Smooth scroll** between sections via vanilla JS, no framework |
| 📊 **Live GitHub stats** embedded from `github-readme-stats` |

---

## ✦ Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| Markup | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) Semantic HTML5 |
| Styling | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) Custom design system, no framework |
| Typography | ![Google Fonts](https://img.shields.io/badge/Google_Fonts-Anton_+_Inter_+_JetBrains_Mono-4285F4?style=flat-square&logo=googlefonts&logoColor=white) |
| Hosting | ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white) |
| Versioning | ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) |

</div>

---

## ✦ Project Structure

```
Fernandamv96.github.io/
├── index.html      # Semantic markup, all 7 sections
├── styles.css      # Design tokens + components (~870 lines)
├── README.md       # This file
└── LICENSE         # MIT
```

No nested folders. No build output. Just two files and a doc.

---

## ✦ Sections

```
> home       →  Hero with massive type + live terminal prompt
> whoami     →  Ferr.txt code-card with profile facts
> stack      →  JavaScript · Python · HTML5 · CSS3 · Linux · Git
> learning   →  Python · JS · Linux · CTF/Hacking · HTML/CSS · Networking
> proyectos  →  6 featured repositories
> stats      →  Live GitHub stats + contribution streak
> contacto   →  Email · GitHub · Spotify
```

---

## ✦ Local Preview

No install required. Just open the file:

```bash
# Option 1 — open directly
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# Option 2 — local server (recommended for true preview)
python3 -m http.server 8000
# then visit http://localhost:8000

# Option 3 — VS Code Live Server extension
# right-click index.html → "Open with Live Server"
```

---

## ✦ Deployment

Deployed automatically via **GitHub Pages** from the `main` branch. Every push to `main` triggers a rebuild (~30 seconds).

```bash
git add .
git commit -m "update portfolio"
git push origin main
# → https://fernandamv96.github.io updates within ~1 min
```

Setup reference:
- **Settings → Pages → Source:** Deploy from a branch
- **Branch:** `main` · `/ (root)`
- **Enforce HTTPS:** ✅

---

## ✦ Design Tokens

The whole color system lives in CSS custom properties:

```css
:root {
  /* Surfaces */
  --surface-void:    #050510;  /* page canvas */
  --surface-card:    #0c0c1a;  /* cards, code blocks */
  --surface-deep:    #07070f;  /* deepest, button-on-hover */

  /* Neon accents */
  --color-neon-cyan:    #00f0ff;  /* primary — buttons, headings */
  --color-neon-magenta: #ff2bd6;  /* secondary — outline type, CTF */
  --color-neon-lime:    #b5ff3a;  /* tertiary — status, learning */
  --color-neon-violet:  #8a5cff;  /* quaternary — stat numbers */

  /* Glow tokens */
  --glow-cyan:    0 0 12px rgba(0, 240, 255, 0.45), 0 0 28px rgba(0, 240, 255, 0.18);
  --glow-magenta: 0 0 12px rgba(255, 43, 214, 0.45), 0 0 28px rgba(255, 43, 214, 0.18);
}
```

Swap one variable, the whole site re-themes.

---

## ✦ Roadmap

- [ ] Add Open Graph image for social-share previews
- [ ] Migrate GitHub stats to a self-hosted endpoint (avoid 3rd-party rate limits)
- [ ] Add Spanish/English language toggle
- [ ] Project detail pages for the 6 featured repos
- [ ] Blog section (Markdown-driven)

---

## ✦ Author

<div align="center">

**Fernanda · `Ferr`**

Estudiante de **Programación y Ciberseguridad** @ INACAP

[![GitHub](https://img.shields.io/badge/GitHub-@Fernandamv96-00f0ff?style=for-the-badge&logo=github&logoColor=00f0ff&labelColor=050510)](https://github.com/Fernandamv96)
[![Gmail](https://img.shields.io/badge/Email-Pelusaaaaaaaa@gmail.com-ff2bd6?style=for-the-badge&logo=gmail&logoColor=ff2bd6&labelColor=050510)](mailto:Pelusaaaaaaaa@gmail.com)
[![Spotify](https://img.shields.io/badge/Spotify-3172sdkmnqoucgtdmsmun6nl6xf4-b5ff3a?style=for-the-badge&logo=spotify&logoColor=b5ff3a&labelColor=050510)](https://open.spotify.com/user/3172sdkmnqoucgtdmsmun6nl6xf4)

</div>

---

<div align="center">

<sub>Built with 🖤 by a human who likes CTFs and pixel art. No frameworks harmed.</sub>

</div>
