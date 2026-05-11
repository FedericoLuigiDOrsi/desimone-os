# Il Cammeo — BnB Website Design Spec

**Date:** 2026-05-08
**Status:** Approved

---

## Overview

Single-page website for Il Cammeo, a BnB in Torre del Greco (Naples area). The site is a showcase — booking happens externally via Airbnb and Booking.com. Primary audience is foreign tourists (English, German, American) seeking an authentic Southern Italy experience, not a resort.

**Narrative:** "Living on the Volcano" — Story Arc structure with cinematic atmosphere. Every section opens like a scene, not an info block.

**Language:** English

**Booking mechanism:** External links to Airbnb and Booking.com. No internal form or transaction.

---

## Scroll Structure — 6 Acts

### HERO — Video Loop
- Full-screen AI-generated short film (8–15 sec, no audio, seamless loop)
- Subject: Vesuvio, Gulf of Naples, raking light on the sea — no interiors, no property
- Tagline overlay: *"Sleep where the volcano meets the sea."*
- Single CTA: scroll-down arrow only — no buttons in hero
- **Status:** video to be produced (task logged)

### ACT 1 — The Land
- Introduces Torre del Greco: city between fire and sea
- Photos: Vesuvio, historical eruptions (folder: `Foto Eruzioni storiche`), Campania coast (folder: `Foto Campania`)
- Copy: poetic, not didactic — 3–4 sentences max in English
- No CTA in this section

### ACT 2 — Your Home
- Two cards side by side: **Il Cammeo** and **Il Cammeo 2**
- Minimal differentiation — Cammeo 2 highlights terrace with volcano view
- Photos: interiors and terrace from folders `1 - Il Cammeo` and `2 - Il Cammeo 2`
- CTA: "Check availability on Airbnb" → external Airbnb link (one per unit)

### ACT 3 — Explore
- **Mapbox GL JS 3D interactive map** with real terrain
  - Vesuvius visible in 3D relief
  - Distance markers: Napoli (30 min), Pompei (15 min), Ercolano (10 min), Costiera Amalfitana (45 min)
  - Requires Mapbox API key (free tier sufficient)
- **Food sub-section:** local pastry and street food — photos from `Pasticceria` and `Street Food` folders
- **Culture sub-section:** corals and cameos — one paragraph on Torre del Greco's artisan tradition, photos from `Coralli e Cammei`

### ACT 4 — Voices
- 3 guest reviews in horizontal slider
- Format: short quote + guest name + country of origin (e.g. *"— Sarah, UK"*)
- Guest photos if available from folder `3 - Ospiti Casa Vacanze`
- Source: pull from existing Airbnb reviews

### ACT 5 — Yours
- Full-width closing photo: sunset over the gulf or Vesuvio at night
- Copy: *"This story can be yours. Pick your dates."*
- Primary CTA: "Book on Airbnb" → Airbnb link
- Secondary CTA: "Also on Booking.com" → Booking.com link

---

## Photo Assets

All photos sourced from Google Drive folder "1 - Foto Casa Vacanze":

| Folder | Use |
|--------|-----|
| `1 - Il Cammeo` | ACT 2 — unit interiors |
| `2 - Il Cammeo 2` | ACT 2 — unit interiors + terrace |
| `3 - Ospiti Casa Vacanze` | ACT 4 — guest photos |
| `Coralli e Cammei` | ACT 3 — culture sub-section |
| `Costiera Amalfitana` | ACT 1 / ACT 5 — landscape |
| `Foto Campania` | ACT 1 — territory |
| `Foto Eruzioni storiche` | ACT 1 — volcanic history |
| `Foto Napoli` | ACT 3 — Napoli marker |
| `Foto Torre del Greco` | ACT 1 / ACT 3 |
| `Pasticceria` | ACT 3 — food sub-section |
| `Street Food` | ACT 3 — food sub-section |
| `Vesuvio` | HERO / ACT 1 / ACT 5 |

---

## Open Items (to resolve before implementation)

1. **Tech stack** — not yet decided (React, plain HTML/CSS, Webflow, or other)
2. **AI video tool** — to select for hero cortometraggio production (Sora, Runway, Kling, etc.)
3. **Airbnb/Booking URLs** — listing links for each unit needed for CTAs
4. **Mapbox API key** — register at mapbox.com, free tier
5. **Translations** — site is English-only; consider adding Italian as secondary language later

---

## Tasks Logged

- [ ] Creare cortometraggio AI per hero video loop (Vesuvio + golfo, 8–15 sec, no audio)
