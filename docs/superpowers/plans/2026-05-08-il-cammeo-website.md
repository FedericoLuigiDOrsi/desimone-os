# Il Cammeo — Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page showcase website for Il Cammeo BnB in Torre del Greco, with a cinematic Story Arc structure that drives foreign tourists to book on Airbnb.

**Architecture:** Single HTML file with modular CSS and vanilla JS. Each visual section (act) is a full-viewport block with scroll-triggered animations via IntersectionObserver. Mapbox GL JS handles the 3D terrain map. No build step — works locally and deploys to any static host.

**Tech Stack:** HTML5, CSS custom properties, Vanilla JS (ES modules), Mapbox GL JS v3 (CDN), Google Fonts (CDN)

---

## File Structure

```
il-cammeo/
├── index.html                  — single HTML shell, all sections
├── css/
│   ├── reset.css               — minimal reset + CSS variables (colors, fonts, spacing)
│   ├── typography.css          — headings, body, tagline styles
│   ├── sections.css            — shared section layout + scroll-reveal classes
│   ├── hero.css                — video hero specific styles
│   ├── units.css               — ACT 2 two-card layout
│   ├── map.css                 — Mapbox container + distance markers
│   ├── slider.css              — ACT 4 reviews slider
│   └── footer.css              — ACT 5 closing CTA
├── js/
│   ├── scroll.js               — IntersectionObserver, adds .visible class to sections
│   ├── map.js                  — Mapbox 3D terrain init + markers
│   └── slider.js               — reviews slider (prev/next + auto-advance)
├── assets/
│   ├── videos/
│   │   └── hero-loop.mp4       — AI-generated video (to be produced separately)
│   └── images/
│       ├── act1/               — volcanic territory photos
│       ├── act2/               — unit interiors + terrace
│       ├── act3/               — food (pasticceria, street food) + cameos
│       ├── act4/               — guest photos
│       └── act5/               — closing landscape
└── docs/
    └── superpowers/
        ├── specs/2026-05-08-il-cammeo-website-design.md
        └── plans/2026-05-08-il-cammeo-website.md
```

---

## Task 1: Project Scaffold + CSS Variables

**Files:**
- Create: `il-cammeo/index.html`
- Create: `il-cammeo/css/reset.css`
- Create: `il-cammeo/css/typography.css`

- [ ] **Step 1: Create the project folder and open it**

```bash
mkdir -p il-cammeo/css il-cammeo/js il-cammeo/assets/videos il-cammeo/assets/images/act1 il-cammeo/assets/images/act2 il-cammeo/assets/images/act3 il-cammeo/assets/images/act4 il-cammeo/assets/images/act5
```

- [ ] **Step 2: Create `css/reset.css`**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* Colors */
  --color-black:    #0a0805;
  --color-ash:      #1a1410;
  --color-ember:    #c45010;
  --color-gold:     #f0a040;
  --color-cream:    #f5f0e8;
  --color-white:    #ffffff;

  /* Fonts */
  --font-display:   'Cormorant Garamond', Georgia, serif;
  --font-body:      'Inter', system-ui, sans-serif;

  /* Spacing */
  --section-pad:    clamp(4rem, 10vw, 8rem);
  --content-max:    1200px;
}

html { scroll-behavior: smooth; }
body { background: var(--color-black); color: var(--color-cream); font-family: var(--font-body); overflow-x: hidden; }
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
```

- [ ] **Step 3: Create `css/typography.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

.tagline {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.2;
  color: var(--color-white);
}

.act-label {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-ember);
  margin-bottom: 1rem;
}

.act-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 300;
  line-height: 1.1;
  color: var(--color-white);
}

.act-body {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  color: rgba(245, 240, 232, 0.75);
  max-width: 580px;
}

.cta-button {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  border: 1px solid var(--color-ember);
  color: var(--color-cream);
  transition: background 0.3s, color 0.3s;
  cursor: pointer;
}

.cta-button:hover { background: var(--color-ember); color: var(--color-white); }
.cta-button.secondary { border-color: rgba(245,240,232,0.3); font-size: 0.75rem; }
.cta-button.secondary:hover { background: rgba(245,240,232,0.1); }
```

- [ ] **Step 4: Create `index.html` with the document shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Il Cammeo — Torre del Greco, Napoli</title>
  <meta name="description" content="Sleep where the volcano meets the sea. Authentic BnB in Torre del Greco, between Vesuvius and the Gulf of Naples.">

  <!-- Mapbox GL JS -->
  <link href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css" rel="stylesheet">
  <script src="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js"></script>

  <!-- Styles -->
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/typography.css">
  <link rel="stylesheet" href="css/sections.css">
  <link rel="stylesheet" href="css/hero.css">
  <link rel="stylesheet" href="css/units.css">
  <link rel="stylesheet" href="css/map.css">
  <link rel="stylesheet" href="css/slider.css">
  <link rel="stylesheet" href="css/footer.css">
</head>
<body>

  <!-- HERO -->
  <section id="hero"></section>

  <!-- ACT 1: THE LAND -->
  <section id="the-land" class="reveal-section"></section>

  <!-- ACT 2: YOUR HOME -->
  <section id="your-home" class="reveal-section"></section>

  <!-- ACT 3: EXPLORE -->
  <section id="explore" class="reveal-section"></section>

  <!-- ACT 4: VOICES -->
  <section id="voices" class="reveal-section"></section>

  <!-- ACT 5: YOURS -->
  <section id="yours" class="reveal-section"></section>

  <!-- Scripts -->
  <script type="module" src="js/scroll.js"></script>
  <script type="module" src="js/map.js"></script>
  <script type="module" src="js/slider.js"></script>
</body>
</html>
```

- [ ] **Step 5: Open `index.html` in browser, verify black page loads with no console errors**

```bash
open il-cammeo/index.html
# Expected: black page, no errors in DevTools console
```

- [ ] **Step 6: Commit**

```bash
git add il-cammeo/
git commit -m "feat: scaffold Il Cammeo website — HTML shell + CSS variables"
```

---

## Task 2: Shared Section Styles + Scroll Reveal

**Files:**
- Create: `il-cammeo/css/sections.css`
- Create: `il-cammeo/js/scroll.js`

- [ ] **Step 1: Create `css/sections.css`**

```css
.reveal-section {
  padding: var(--section-pad) clamp(1.5rem, 6vw, 4rem);
  max-width: var(--content-max);
  margin: 0 auto;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-inner {
  display: grid;
  gap: 2rem;
}

.section-text { display: flex; flex-direction: column; gap: 1.25rem; }

/* Full-bleed wrapper for sections that go edge-to-edge */
.full-bleed {
  width: 100vw;
  margin-left: calc(-1 * clamp(1.5rem, 6vw, 4rem));
}
```

- [ ] **Step 2: Create `js/scroll.js`**

```js
const sections = document.querySelectorAll('.reveal-section');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => observer.observe(section));
```

- [ ] **Step 3: Verify in browser**

Add temporary content to `index.html` inside `.reveal-section` divs to test scroll reveal:
```html
<section id="the-land" class="reveal-section">
  <p class="act-body">Test paragraph for scroll reveal.</p>
</section>
```
Open `index.html`, scroll down — section should fade in from below when it enters viewport.

- [ ] **Step 4: Remove test content, commit**

```bash
git add il-cammeo/css/sections.css il-cammeo/js/scroll.js
git commit -m "feat: scroll reveal via IntersectionObserver"
```

---

## Task 3: HERO — Video Loop

**Files:**
- Modify: `il-cammeo/index.html` (hero section)
- Create: `il-cammeo/css/hero.css`

> **Note:** `assets/videos/hero-loop.mp4` will be a placeholder until the AI video is produced. Use a dark fallback image in the meantime.

- [ ] **Step 1: Add a dark placeholder image for the hero fallback**

Download or create a 1920×1080 dark image and save as `assets/images/hero-fallback.jpg`. For now, any dark solid-color image works.

- [ ] **Step 2: Fill the hero section in `index.html`**

```html
<section id="hero">
  <video
    class="hero-video"
    autoplay
    muted
    loop
    playsinline
    poster="assets/images/hero-fallback.jpg"
  >
    <source src="assets/videos/hero-loop.mp4" type="video/mp4">
  </video>

  <div class="hero-overlay"></div>

  <div class="hero-content">
    <span class="act-label">Il Cammeo · Torre del Greco</span>
    <h1 class="tagline">Sleep where the volcano<br>meets the sea.</h1>
  </div>

  <a class="hero-scroll-cue" href="#the-land" aria-label="Scroll to explore">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 5v14M5 12l7 7 7-7"/>
    </svg>
  </a>
</section>
```

- [ ] **Step 3: Create `css/hero.css`**

```css
#hero {
  position: relative;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 8, 5, 0.3) 0%,
    rgba(10, 8, 5, 0.55) 60%,
    rgba(10, 8, 5, 0.85) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.hero-scroll-cue {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  color: rgba(245, 240, 232, 0.5);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(8px); }
}
```

- [ ] **Step 4: Verify in browser**

Open `index.html`. Expected:
- Full-viewport hero with dark overlay
- Tagline "Sleep where the volcano meets the sea." centered
- Bouncing scroll arrow at bottom
- If `hero-loop.mp4` is missing, dark fallback image shows — no broken icon

- [ ] **Step 5: Commit**

```bash
git add il-cammeo/index.html il-cammeo/css/hero.css
git commit -m "feat: hero section — video loop with fallback + tagline"
```

---

## Task 4: ACT 1 — The Land

**Files:**
- Modify: `il-cammeo/index.html` (the-land section)

> **Photos needed:** Place 2–3 landscape images in `assets/images/act1/`. Use `Foto Eruzioni storiche` and `Foto Campania` from Google Drive. Rename to `volcano-01.jpg`, `coast-01.jpg`, etc.

- [ ] **Step 1: Fill the-land section in `index.html`**

```html
<section id="the-land" class="reveal-section">
  <div class="section-inner land-grid">

    <div class="section-text">
      <span class="act-label">The Land</span>
      <h2 class="act-title">City between<br>fire and sea.</h2>
      <p class="act-body">
        Torre del Greco sits at the foot of Vesuvius, where the volcano's lava
        has reached the shoreline seventeen times and the city has rebuilt itself
        every single time. This is not a place that fears its origins. It wears them.
      </p>
      <p class="act-body">
        From here, the Gulf of Naples stretches south toward Capri, and the summit
        of Vesuvius rises north — visible from almost every street corner.
        You are not visiting this landscape. You are living inside it.
      </p>
    </div>

    <div class="land-images">
      <img src="assets/images/act1/volcano-01.jpg" alt="Vesuvius at dusk" class="land-img-main" loading="lazy">
      <img src="assets/images/act1/coast-01.jpg"   alt="Gulf of Naples"   class="land-img-secondary" loading="lazy">
    </div>

  </div>
</section>
```

- [ ] **Step 2: Add land-specific styles to `sections.css`**

```css
.land-grid {
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
}

.land-images {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 0.75rem;
}

.land-img-main      { width: 100%; aspect-ratio: 4/5; object-fit: cover; }
.land-img-secondary { width: 60%; aspect-ratio: 16/9; object-fit: cover; margin-left: auto; }

@media (max-width: 768px) {
  .land-grid { grid-template-columns: 1fr; }
  .land-img-secondary { width: 80%; }
}
```

- [ ] **Step 3: Verify in browser**

Scroll to The Land section. Expected:
- Text fades in on scroll
- Two photos in asymmetric grid (main tall + secondary offset)
- On mobile: single column

- [ ] **Step 4: Commit**

```bash
git add il-cammeo/index.html il-cammeo/css/sections.css
git commit -m "feat: ACT 1 — The Land section"
```

---

## Task 5: ACT 2 — Your Home (Two Units)

**Files:**
- Modify: `il-cammeo/index.html` (your-home section)
- Create: `il-cammeo/css/units.css`

> **Photos needed:** Place 2–3 photos per unit in `assets/images/act2/`. Use `1 - Il Cammeo` and `2 - Il Cammeo 2` folders from Google Drive.
> **Airbnb URLs needed:** Replace `YOUR_AIRBNB_LINK_UNIT_1` and `YOUR_AIRBNB_LINK_UNIT_2` with actual listing URLs.

- [ ] **Step 1: Fill your-home section in `index.html`**

```html
<section id="your-home" class="reveal-section">
  <div class="section-text" style="margin-bottom: 3rem;">
    <span class="act-label">Your Home</span>
    <h2 class="act-title">Two apartments,<br>one experience.</h2>
    <p class="act-body">Both units are a short walk from each other, in the heart of Torre del Greco. Same hospitality, same sense of place — with one difference.</p>
  </div>

  <div class="units-grid">

    <div class="unit-card">
      <div class="unit-images">
        <img src="assets/images/act2/cammeo1-main.jpg" alt="Il Cammeo — living area" loading="lazy">
      </div>
      <div class="unit-body">
        <h3 class="unit-name">Il Cammeo</h3>
        <p class="act-body">A quiet, comfortable apartment steps from the sea — the ideal base for exploring the area at your own pace.</p>
        <a href="YOUR_AIRBNB_LINK_UNIT_1" target="_blank" rel="noopener" class="cta-button">Check availability on Airbnb</a>
      </div>
    </div>

    <div class="unit-card unit-card--featured">
      <div class="unit-images">
        <img src="assets/images/act2/cammeo2-main.jpg"    alt="Il Cammeo 2 — terrace" loading="lazy">
        <img src="assets/images/act2/cammeo2-terrace.jpg" alt="Terrace with Vesuvius view" loading="lazy" class="unit-img-accent">
      </div>
      <div class="unit-body">
        <span class="unit-badge">Terrace · Volcano view</span>
        <h3 class="unit-name">Il Cammeo 2</h3>
        <p class="act-body">Same warmth — with a private terrace facing Vesuvius. Wake up to the volcano every morning.</p>
        <a href="YOUR_AIRBNB_LINK_UNIT_2" target="_blank" rel="noopener" class="cta-button">Check availability on Airbnb</a>
      </div>
    </div>

  </div>
</section>
```

- [ ] **Step 2: Create `css/units.css`**

```css
.units-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.unit-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 1px solid rgba(245, 240, 232, 0.08);
  padding: 0;
  overflow: hidden;
}

.unit-card--featured { border-color: rgba(196, 80, 16, 0.4); }

.unit-images { position: relative; }
.unit-images img:first-child { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
.unit-img-accent {
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  width: 45%;
  aspect-ratio: 1;
  object-fit: cover;
  border: 3px solid var(--color-black);
}

.unit-body { padding: 2rem; display: flex; flex-direction: column; gap: 1rem; }

.unit-name {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 300;
  color: var(--color-white);
}

.unit-badge {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-ember);
}

@media (max-width: 768px) {
  .units-grid { grid-template-columns: 1fr; }
  .unit-img-accent { display: none; }
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Your Home. Expected:
- Two cards side by side
- Cammeo 2 has amber border and "Terrace · Volcano view" badge
- Both have working Airbnb CTA buttons (even if links are placeholders)
- Mobile: stacks vertically

- [ ] **Step 4: Commit**

```bash
git add il-cammeo/index.html il-cammeo/css/units.css
git commit -m "feat: ACT 2 — Your Home two-unit cards with Airbnb CTAs"
```

---

## Task 6: ACT 3 — Explore (Mapbox 3D + Food + Cameos)

**Files:**
- Modify: `il-cammeo/index.html` (explore section)
- Create: `il-cammeo/css/map.css`
- Create: `il-cammeo/js/map.js`

> **Mapbox API key needed:** Register at mapbox.com (free tier). Replace `YOUR_MAPBOX_TOKEN` in `map.js`.

- [ ] **Step 1: Fill explore section in `index.html`**

```html
<section id="explore" class="reveal-section">

  <div class="section-text" style="margin-bottom: 3rem;">
    <span class="act-label">Explore</span>
    <h2 class="act-title">Everything is<br>within reach.</h2>
    <p class="act-body">From Il Cammeo, Southern Italy's greatest sites are a short drive away. Vesuvius as your compass.</p>
  </div>

  <div id="map" class="map-container" aria-label="Interactive 3D map showing distances from Il Cammeo"></div>

  <div class="distance-markers">
    <div class="marker-item"><span class="marker-time">10 min</span><span class="marker-name">Herculaneum</span></div>
    <div class="marker-item"><span class="marker-time">15 min</span><span class="marker-name">Pompeii</span></div>
    <div class="marker-item"><span class="marker-time">30 min</span><span class="marker-name">Naples</span></div>
    <div class="marker-item"><span class="marker-time">45 min</span><span class="marker-name">Amalfi Coast</span></div>
  </div>

  <!-- Food sub-section -->
  <div class="explore-sub reveal-section" style="margin-top: 5rem;">
    <span class="act-label">Local Food</span>
    <h3 class="act-title" style="font-size: clamp(1.8rem, 3vw, 2.5rem);">Eat like a local.</h3>
    <div class="food-grid">
      <img src="assets/images/act3/food-01.jpg" alt="Local pastry" loading="lazy">
      <img src="assets/images/act3/food-02.jpg" alt="Street food" loading="lazy">
      <img src="assets/images/act3/food-03.jpg" alt="Local cuisine" loading="lazy">
    </div>
  </div>

  <!-- Cameos sub-section -->
  <div class="explore-sub reveal-section" style="margin-top: 4rem;">
    <span class="act-label">Craftsmanship</span>
    <h3 class="act-title" style="font-size: clamp(1.8rem, 3vw, 2.5rem);">Coral and cameos.</h3>
    <p class="act-body">Torre del Greco has been the world capital of cameo and coral carving for over three centuries. Walk into any workshop and watch craftsmen shape stories into stone.</p>
  </div>

</section>
```

- [ ] **Step 2: Create `css/map.css`**

```css
.map-container {
  width: 100%;
  height: 480px;
  border-radius: 2px;
  overflow: hidden;
  border: 1px solid rgba(245, 240, 232, 0.08);
}

.distance-markers {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.marker-item { display: flex; flex-direction: column; gap: 0.25rem; }
.marker-time { font-family: var(--font-display); font-size: 1.5rem; color: var(--color-ember); font-weight: 300; }
.marker-name { font-family: var(--font-body); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,240,232,0.5); }

.food-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 2rem;
}

.food-grid img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }

.explore-sub { padding: 0; opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
.explore-sub.visible { opacity: 1; transform: translateY(0); }

@media (max-width: 768px) {
  .map-container { height: 320px; }
  .food-grid { grid-template-columns: 1fr 1fr; }
  .food-grid img:last-child { display: none; }
}
```

- [ ] **Step 3: Create `js/map.js`**

```js
// Replace with your Mapbox public token from mapbox.com
const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN';

mapboxgl.accessToken = MAPBOX_TOKEN;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [14.3608, 40.7887], // Torre del Greco
  zoom: 10,
  pitch: 55,
  bearing: -20,
  antialias: true,
});

map.on('load', () => {
  // Add 3D terrain
  map.addSource('mapbox-dem', {
    type: 'raster-dem',
    url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
    tileSize: 512,
    maxzoom: 14,
  });
  map.setTerrain({ source: 'mapbox-dem', exaggeration: 2.5 });

  // Add sky layer for atmosphere
  map.addLayer({
    id: 'sky',
    type: 'sky',
    paint: {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 90.0],
      'sky-atmosphere-sun-intensity': 15,
    },
  });

  // Points of interest
  const pois = [
    { name: 'Il Cammeo',     coords: [14.3608, 40.7887], label: 'You are here', primary: true },
    { name: 'Ercolano',      coords: [14.3494, 40.8062], label: '10 min' },
    { name: 'Pompei',        coords: [14.4989, 40.7506], label: '15 min' },
    { name: 'Napoli',        coords: [14.2681, 40.8518], label: '30 min' },
    { name: 'Amalfi Coast',  coords: [14.6027, 40.6340], label: '45 min' },
  ];

  pois.forEach(({ name, coords, label, primary }) => {
    const el = document.createElement('div');
    el.className = primary ? 'map-marker map-marker--home' : 'map-marker';
    el.innerHTML = `<span class="map-marker-label">${label}<br><strong>${name}</strong></span>`;
    new mapboxgl.Marker(el).setLngLat(coords).addTo(map);
  });
});
```

- [ ] **Step 4: Add marker styles to `map.css`**

```css
.map-marker {
  position: relative;
  width: 10px;
  height: 10px;
  background: var(--color-ember);
  border-radius: 50%;
  border: 2px solid rgba(245,240,232,0.6);
  cursor: default;
}

.map-marker--home {
  width: 14px;
  height: 14px;
  background: var(--color-gold);
  border-color: var(--color-white);
}

.map-marker-label {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--color-cream);
  background: rgba(10,8,5,0.85);
  padding: 3px 8px;
  border-radius: 2px;
  pointer-events: none;
}
```

- [ ] **Step 5: Get a free Mapbox token**

1. Go to mapbox.com → Sign up (free)
2. Copy your public access token
3. Replace `YOUR_MAPBOX_TOKEN` in `js/map.js`

- [ ] **Step 6: Verify in browser**

Open `index.html`, scroll to Explore. Expected:
- 3D terrain map showing Vesuvius relief
- 5 markers: Il Cammeo (gold), 4 destinations (amber) with distance labels
- Map is dark theme matching site
- Food grid shows 3 photos
- Both sub-sections fade in on scroll

- [ ] **Step 7: Commit**

```bash
git add il-cammeo/index.html il-cammeo/css/map.css il-cammeo/js/map.js
git commit -m "feat: ACT 3 — Explore with Mapbox 3D terrain + food + cameos"
```

---

## Task 7: ACT 4 — Voices (Reviews Slider)

**Files:**
- Modify: `il-cammeo/index.html` (voices section)
- Create: `il-cammeo/css/slider.css`
- Create: `il-cammeo/js/slider.js`

> **Reviews needed:** Pull 3 real reviews from your Airbnb listing. Replace placeholder text below.

- [ ] **Step 1: Fill voices section in `index.html`**

```html
<section id="voices" class="reveal-section">
  <span class="act-label">Voices</span>
  <h2 class="act-title">Their story.</h2>

  <div class="slider" id="reviews-slider">
    <div class="slider-track">

      <div class="slide">
        <blockquote class="review-quote">
          "Waking up to Vesuvius every morning was something I didn't expect to miss so much. The apartment felt like a real home, not a rental."
        </blockquote>
        <cite class="review-author">— Sarah, United Kingdom</cite>
      </div>

      <div class="slide">
        <blockquote class="review-quote">
          "Perfect base for Pompeii, Naples, and the Amalfi Coast. The hosts gave us tips no guidebook would ever have. We'll be back."
        </blockquote>
        <cite class="review-author">— Thomas, Germany</cite>
      </div>

      <div class="slide">
        <blockquote class="review-quote">
          "Torre del Greco is not on most tourist maps — which makes it even better. This place showed us what Southern Italy actually feels like."
        </blockquote>
        <cite class="review-author">— Anne-Marie, France</cite>
      </div>

    </div>

    <div class="slider-controls">
      <button class="slider-btn" id="prev-btn" aria-label="Previous review">←</button>
      <div class="slider-dots" id="slider-dots"></div>
      <button class="slider-btn" id="next-btn" aria-label="Next review">→</button>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `css/slider.css`**

```css
.slider { overflow: hidden; position: relative; margin-top: 3rem; }

.slider-track {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 clamp(1rem, 8vw, 6rem);
  text-align: center;
  align-items: center;
}

.review-quote {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.5vw, 1.75rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.5;
  color: var(--color-cream);
  max-width: 700px;
}

.review-author {
  font-family: var(--font-body);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: rgba(245,240,232,0.5);
}

.slider-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.slider-btn {
  background: none;
  border: 1px solid rgba(245,240,232,0.2);
  color: var(--color-cream);
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.slider-btn:hover { border-color: var(--color-ember); }

.slider-dots { display: flex; gap: 0.5rem; }

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(245,240,232,0.2);
  cursor: pointer;
  transition: background 0.3s;
}

.dot.active { background: var(--color-ember); }
```

- [ ] **Step 3: Create `js/slider.js`**

```js
const track   = document.querySelector('.slider-track');
const slides  = document.querySelectorAll('.slide');
const dotsEl  = document.getElementById('slider-dots');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let current = 0;
let autoTimer;

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(dot);
});

function goTo(index) {
  current = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === current)
  );
}

function startAuto() {
  autoTimer = setInterval(() => goTo(current + 1), 5000);
}

function stopAuto() {
  clearInterval(autoTimer);
}

prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

startAuto();
```

- [ ] **Step 4: Verify in browser**

Scroll to Voices. Expected:
- Single review visible, others hidden
- Prev/Next arrows navigate between reviews
- Dots show current position, click navigates
- Auto-advances every 5 seconds

- [ ] **Step 5: Commit**

```bash
git add il-cammeo/index.html il-cammeo/css/slider.css il-cammeo/js/slider.js
git commit -m "feat: ACT 4 — Voices reviews slider with auto-advance"
```

---

## Task 8: ACT 5 — Yours (Closing CTA)

**Files:**
- Modify: `il-cammeo/index.html` (yours section)
- Create: `il-cammeo/css/footer.css`

> **Photo needed:** Strong closing image — sunset on the gulf or Vesuvius at night. Save as `assets/images/act5/closing.jpg`.
> **URLs needed:** Replace `YOUR_AIRBNB_LINK` and `YOUR_BOOKING_LINK` with actual listing URLs.

- [ ] **Step 1: Fill yours section in `index.html`**

```html
<section id="yours">
  <div class="yours-image-wrap">
    <img src="assets/images/act5/closing.jpg" alt="Sunset over the Gulf of Naples" loading="lazy">
    <div class="yours-overlay"></div>
  </div>

  <div class="yours-content reveal-section">
    <span class="act-label">Yours</span>
    <h2 class="act-title">This story<br>can be yours.</h2>
    <p class="act-body">Pick your dates and wake up where the volcano meets the sea.</p>

    <div class="yours-ctas">
      <a href="YOUR_AIRBNB_LINK"   target="_blank" rel="noopener" class="cta-button">Book on Airbnb</a>
      <a href="YOUR_BOOKING_LINK"  target="_blank" rel="noopener" class="cta-button secondary">Also on Booking.com</a>
    </div>

    <p class="yours-contact">Questions? <a href="mailto:YOUR_EMAIL" style="color:var(--color-ember);">Write to us</a></p>
  </div>
</section>
```

- [ ] **Step 2: Create `css/footer.css`**

```css
#yours {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.yours-image-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.yours-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.yours-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,8,5,0.9) 0%, rgba(10,8,5,0.5) 60%, rgba(10,8,5,0.3) 100%);
}

.yours-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: var(--section-pad) clamp(1.5rem, 6vw, 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 640px;
}

.yours-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

.yours-contact {
  font-size: 0.8rem;
  color: rgba(245,240,232,0.4);
  margin-top: 0.5rem;
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Yours. Expected:
- Full-viewport dark closing photo
- Text and CTAs centered over the image
- Two buttons: primary Airbnb + secondary Booking.com
- Contact email link in amber

- [ ] **Step 4: Commit**

```bash
git add il-cammeo/index.html il-cammeo/css/footer.css
git commit -m "feat: ACT 5 — Yours closing CTA"
```

---

## Task 9: Responsive + Final Polish

**Files:**
- Modify: `il-cammeo/css/sections.css` (mobile breakpoints already added in each task)

- [ ] **Step 1: Test on mobile viewport in DevTools**

Open Chrome DevTools → Toggle device toolbar → iPhone 14 (390px wide).
Check each section:
- Hero: video fills screen, tagline readable
- The Land: single column
- Your Home: cards stack vertically
- Explore: map is 320px tall, food grid 2 columns
- Voices: arrows and text readable
- Yours: CTA buttons stack on narrow screens

- [ ] **Step 2: Fix any layout issues found**

Common fixes needed:
```css
/* Add to sections.css if needed */
@media (max-width: 480px) {
  .yours-ctas { flex-direction: column; align-items: center; }
  .cta-button { width: 100%; text-align: center; }
  .distance-markers { gap: 1rem; }
}
```

- [ ] **Step 3: Add `<meta>` for social sharing in `index.html` `<head>`**

```html
<meta property="og:title"       content="Il Cammeo — Torre del Greco, Napoli">
<meta property="og:description" content="Sleep where the volcano meets the sea. BnB in Torre del Greco between Vesuvius and the Gulf of Naples.">
<meta property="og:image"       content="assets/images/act5/closing.jpg">
<meta property="og:type"        content="website">
```

- [ ] **Step 4: Final browser check — full scroll**

Open the page and scroll from top to bottom:
- [ ] Hero video plays (or fallback shows)
- [ ] Each section animates in on scroll
- [ ] Mapbox 3D terrain loads with markers
- [ ] Reviews slider auto-advances
- [ ] Airbnb buttons open in new tab

- [ ] **Step 5: Final commit**

```bash
git add il-cammeo/
git commit -m "feat: responsive layout + social meta — Il Cammeo website complete"
```

---

## Open Items (resolve before or during implementation)

| Item | Where needed |
|------|-------------|
| Mapbox public token (free at mapbox.com) | Task 6 — `js/map.js` |
| Airbnb listing URL — Il Cammeo | Task 5 + Task 8 |
| Airbnb listing URL — Il Cammeo 2 | Task 5 |
| Booking.com listing URL | Task 8 |
| Contact email address | Task 8 |
| Hero video `hero-loop.mp4` (AI short film) | Task 3 — can launch without it, video replaces later |
| Photos from Google Drive copied to `assets/images/` | Each task |

---

## Production Deploy (after implementation complete)

```bash
# Option A — Netlify drag & drop
# Drag the il-cammeo/ folder to netlify.com/drop

# Option B — GitHub Pages
git subtree push --prefix il-cammeo origin gh-pages

# Option C — Vercel CLI
npx vercel il-cammeo/
```
