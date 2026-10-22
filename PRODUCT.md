# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 18 + Vite + Tailwind, prerendered to static HTML (scripts/prerender.mjs), deployed on Vercel (Pro). Languages: bg (root), en, de, nl (`/nl` is tailored for Belgium).

## What it is

rafetov.com — a web studio based in Sofia, Bulgaria (registered in Popovo). Builds business websites, online shops, platforms and internal systems, mobile and desktop apps, AI automations (chatbots, inquiry handling, document processing), digital menus, and runs Google/Meta ads. Works remotely for clients in Bulgaria, Germany, Belgium, UK, Spain and Norway.

## Users and how they arrive

- Most new clients are local acquaintances and people who saw his short videos (TikTok, Facebook, Instagram). They mostly phone or write on WhatsApp instead of using the site form.
- Most video viewers and followers are builders and craftsmen: roofs, windows/PVC, pergolas and blinds, renovations, excavation, cleaning. Many are Bulgarian firm owners working in Germany or Belgium, who speak Bulgarian with him but need a site in the local language.
- Paying clients are mixed niches (e-shops, solar, a mill, renovation, ad materials). Construction is the largest audience, not the only client base — never write "само за строителни фирми".

## Positioning and proof

- Fixed price told within 24 hours, after a free call (phone or Google Meet). No prices anywhere on the site (owner decision, 2026-10-22); packages without prices are not shown either — the site leads to a brief/inquiry instead.
- Real proof only: 5.0 on Google from 20 reviews, live client sites listed in `src/constants/projects.ts`.
- Voice: formal „вие“, plural „ние“.
- One site, one look: every video says "rafetov.com", so all traffic goes to the homepage. The homepage shows six featured projects per language (`FEATURED` in src/constants/projects.ts) and expands to all of them; every project has its own page (`/proekti/<id>`, `/en/projects/<id>`, …) built from src/constants/caseStudies.ts. No separate landing pages with their own visual world.
- Separate pages for trust: "About" (`ABOUT_BASE` per language) and the projects index (`PROJECT_BASE`). A "trusted by" strip under the hero shows real client logos in their original colours on tiles (dark logos on white tiles, light logos on navy) from src/components/TrustedBy.tsx and public/logos/.
- Visual rules (owner, 2026-10-19): one accent colour (cyan), no background grids or colour blobs outside the hero, no eyebrow labels above headings, one call to action per section, no Three.js or generated imagery. Real screenshots and real reviews only.
- Neutral studio tone (owner, 2026-10-22): no about/face section on the homepage, no first-person copy; „ние“ throughout. Projects keep their order from src/constants/projects.ts.

## Primary contact

WhatsApp is the main action for builders (+359 897 758 062), then the form, then the phone. Inquiries should reach the owner instantly in Telegram (bot), with email as backup.

## Assets

- His own site footage (crane, excavator, him walking at a construction site) and licensed stock clips: `../promo-video/public/footage`, `../promo-video/public/stock`.
- Portfolio screenshots: `public/work/*.webp` (900×589, browser-window mockups).
