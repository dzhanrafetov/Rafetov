# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 18 + Vite + Tailwind, prerendered to static HTML (scripts/prerender.mjs), deployed on Vercel (Pro). Languages: bg (root), en, de, nl (`/nl` is tailored for Belgium).

## What it is

rafetov.com — Dzhan Rafetov, a one-person web studio based in Sofia, Bulgaria (registered in Popovo). Builds business websites, online shops, digital menus, and runs Google/Meta ads. Works remotely for clients in Bulgaria, Germany, Belgium, UK, Spain and Norway.

## Users and how they arrive

- Most new clients are local acquaintances and people who saw his short videos (TikTok, Facebook, Instagram). They mostly phone or write on WhatsApp instead of using the site form.
- Most video viewers and followers are builders and craftsmen: roofs, windows/PVC, pergolas and blinds, renovations, excavation, cleaning. Many are Bulgarian firm owners working in Germany or Belgium, who speak Bulgarian with him but need a site in the local language.
- Paying clients are mixed niches (e-shops, solar, a mill, renovation, ad materials). Construction is the largest audience, not the only client base — never write "само за строителни фирми".

## Positioning and proof

- Fixed price told within 24 hours, after a free call (phone or Google Meet). Starting prices (packages from 580 €, shop from 700 €) are shown in every language, including Bulgarian (owner decision, 2026-10-19).
- Real proof only: 5.0 on Google from 20 reviews, live client sites listed in `src/constants/projects.ts`.
- Voice: formal „вие“, plural „ние“.
- One site, one look: every video says "rafetov.com", so all traffic goes to the homepage. The homepage shows six featured projects per language (`FEATURED` in src/constants/projects.ts) and expands to all of them; every project has its own page (`/proekti/<id>`, `/en/projects/<id>`, …) built from src/constants/caseStudies.ts. No separate landing pages with their own visual world.
- Separate pages for trust: "About" (`ABOUT_BASE` per language) and the projects index (`PROJECT_BASE`). A "trusted by" strip under the hero lists client names from src/components/TrustedBy.tsx; drop real logo files into public/logos/ and set `logo` there to show them instead of names.
- Visual rules (owner, 2026-10-19): one accent colour (cyan), no background grids or colour blobs outside the hero, no eyebrow labels above headings, one call to action per section, no Three.js or generated imagery. Real screenshots and real reviews only.
- The owner is visible: the homepage has an "about" section (src/pages/About.tsx, photo in public/about/) right after the hero, in first person, because visitors come from his videos and look for the same person. The section does not name him; it speaks for Rafetov as the brand, with him as its founder. Projects keep their order from src/constants/projects.ts.

## Primary contact

WhatsApp is the main action for builders (+359 897 758 062), then the form, then the phone.

## Assets

- His own site footage (crane, excavator, him walking at a construction site) and licensed stock clips: `../promo-video/public/footage`, `../promo-video/public/stock`.
- Portfolio screenshots: `public/work/*.webp` (900×589, browser-window mockups).
