---
name: rafetov.com
description: Web studio homepage; one message on WhatsApp becomes a live client site, shown along a single lit cyan path.
colors:
  ink: "#07090f"
  ink-panel: "#0e1626"
  ink-raised: "#141f33"
  hairline: "rgba(255, 255, 255, 0.08)"
  field: "rgba(255, 255, 255, 0.04)"
  accent: "#22d3ee"
  accent-text: "#67e8f9"
  accent-wash: "rgba(34, 211, 238, 0.10)"
  text-strong: "#ffffff"
  text-body: "#e2e8f0"
  text-muted: "#94a3b8"
  text-subtle: "#64748b"
  error: "#f87171"
  error-text: "#fca5a5"
typography:
  display:
    fontFamily: "Onest Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.35rem, 9.2vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.034em"
    fontFeature: "\"locl\" 0"
  headline:
    fontFamily: "Onest Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 5.5vw, 3.1rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Onest Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.6vw, 1.5rem)"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body-lead:
    fontFamily: "Onest Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Onest Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.625
  ui:
    fontFamily: "Onest Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.25
  label:
    fontFamily: "Onest Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  inset: "10px"
  control: "12px"
  cta: "14px"
  card: "16px"
  panel: "22px"
  panel-lg: "24px"
  tail: "6px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "56px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.cta}"
    height: "56px"
    padding: "0 28px"
  button-primary-compact:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 24px"
  button-tinted:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.accent-text}"
    rounded: "{rounded.card}"
    height: "56px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-body}"
    rounded: "{rounded.control}"
    height: "40px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 16px"
  chip:
    backgroundColor: "{colors.field}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.pill}"
    height: "36px"
    padding: "0 16px"
  chip-active:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.accent-text}"
    rounded: "{rounded.pill}"
  card-panel:
    backgroundColor: "{colors.ink-panel}"
    rounded: "{rounded.card}"
    padding: "8px"
  bubble-incoming:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.card}"
    padding: "10px 14px"
  bubble-outgoing:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.card}"
    padding: "10px 14px"
  path-node:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.accent-text}"
    rounded: "{rounded.pill}"
    size: "28px"
---

# Design System: rafetov.com

## Overview

**Creative North Star: "The Lit Path"**

The site is a night-time conversation that turns into a working website. Everything sits on one near-black navy ground; content rises onto slightly lighter navy panels edged with a hairline of white, and a single cyan does all the talking: the thing to press, the word to notice, the path to follow. Depth comes from tone and a soft cyan glow, never from decoration.

A thin cyan path is the structural signature. It leaves the bottom of the hero chat panel, and each chapter of the page (01 to 06) opens with a short segment of that path drawn down into a glowing numbered node. The node carries the chapter number itself, so headings stand alone with nothing stacked above them. Chat bubbles, incoming slate and outgoing cyan-tinted, are the second signature: the product promise (write one message) is shown in its own native form.

Density is calm and generous: heavy, tight display type over quiet muted body copy, wide section gaps, proof (real screenshots, real Google reviews, real logos) given full width rather than shrunk into icon rows.

**Key Characteristics:**
- One ground (ink), two lifts (panel, raised), one hairline border, one accent.
- Cyan path segments and numbered glowing nodes mark every chapter.
- Chat bubbles as the signature component; screenshots framed as message attachments.
- Extra-bold, negatively tracked sans for headings; muted slate body.
- Motion is drawn once on first view and disappears under reduced motion.

## Colors

A near-monochrome navy dark world with a single cyan accent split into a fill tone and a text tone.

### Primary
- **Signal Cyan** (accent): fills only. Primary buttons, the path line and nodes, live-status dots, progress bars, selected checkmarks. Text on it is always ink.
- **Lit Cyan Text** (accent-text): cyan when it must be read on dark: the one highlighted word in a headline, active icons, chip and tinted-button labels, focus outlines, star ratings.
- **Cyan Wash** (accent-wash): the tinted surface for outgoing bubbles, selected chips, the secondary WhatsApp button and info notes, always paired with a cyan ring at 22 to 50% opacity.

### Neutral
- **Night Ink** (ink): the page ground for every section, also image wells and the path-node fill.
- **Panel Navy** (ink-panel): raised containers: the chat panel, proof panels, the FAQ contact card.
- **Raised Navy** (ink-raised): the third step: incoming bubbles, the active service row, avatar and dark logo tiles.
- **Hairline** (hairline): the 1px white border at 8% that edges every panel and divides list rows.
- **Field** (field): input and idle chip fill, white at 4%.
- **Pure White / Slate 50** (text-strong): headings.
- **Slate 200** (text-body): body text inside panels, item names, emphasized figures.
- **Slate 400** (text-muted): paragraph copy under headings and descriptions.
- **Slate 500** (text-subtle): timestamps, metadata, group labels, idle icons.
- **Error Red** (error, error-text): validation rings and messages in the brief form only.

### Named Rules
**The One Cyan Rule.** Cyan is the only hue in the interface. One highlighted word per headline at most; no second accent, no gradients between hues.

**The Fill-Versus-Text Rule.** Signal Cyan fills; Lit Cyan Text is read. Never set small text in the fill tone on ink, and never fill a button with the text tone.

## Typography

**Display Font:** Onest Variable (with ui-sans-serif, system-ui)
**Body Font:** Onest Variable, same family

**Character:** One geometric-humanist sans in two voices: extra-bold and tightly tracked for anything that is a heading, regular and relaxed for reading. Bulgarian localized letterforms are switched off (`locl` 0) site-wide for legibility.

### Hierarchy
- **Display**: the hero headline only; one word in Lit Cyan Text; capped near 14ch on mobile.
- **Headline**: every chapter heading (h2), centered under its path node or left-aligned in two-column chapters; balanced wrapping.
- **Title**: card and panel headings (h3).
- **Body Lead**: the hero sub-line, max ~52ch.
- **Body**: paragraph copy in muted slate, 40 to 52ch.
- **UI**: button and chip labels, semibold to bold.
- **Label**: uppercase tracked micro-text, reserved for chat-native metadata (day dividers, "example conversation") and status badges on screenshots ("live").

### Named Rules
**The Heading-Stands-Alone Rule.** Nothing sits above a heading. The chapter number lives inside the path node; uppercase labels never act as section eyebrows.

**The No-Orphans Rule.** Headings use balanced wrapping and paragraphs use pretty wrapping; a lone word on the last line is a defect.

## Layout

Single column of chapters on one ink ground, contained at 1280px with gutters of 16 to 20px on mobile, 24 to 32px on tablet and 48px at xl. Each chapter opens with its path mark (a 64 to 96px line into a 28px node), then 24 to 32px to the heading, and closes with 80px (mobile) to 112px (desktop) of bottom padding; there are no section background changes, so the path, not color bands, separates chapters.

The hero is a two-column grid (copy about 55%, chat panel 400 to 520px) that collapses to centered single column. Chapters alternate between centered stacks and asymmetric two-column splits (5/7 or 4/7) whose left side becomes sticky on desktop (service index with sticky proof panel, FAQ heading with sticky contact card). Work uses a 12-column bento with equal row heights; on mobile only the first four projects show until expanded.

## Elevation & Depth

Depth is tonal: ink, panel and raised steps plus the hairline border. Shadows exist only in two roles: a deep, soft drop under the hero chat panel, and a cyan glow under accent elements.

### Shadow Vocabulary
- **Panel drop** (`0 40px 90px -30px rgba(0,0,0,0.8)`): the hero chat panel only, lifting the signature component off the ground.
- **Cyan lift** (`0 8px 24px -10px rgba(34,211,238,0.6)`, growing on hover): primary buttons.
- **Node glow** (`0 0 0 5px rgba(34,211,238,.10), 0 6px 18px -4px rgba(34,211,238,.45)`): chapter path nodes; the hero start node uses a stronger ring and 24px halo.
- **Inner hairline** (`inset 0 0 0 1px rgba(255,255,255,0.06-0.08)`): over screenshots so they sit inside their frame.

### Named Rules
**The Glow-Is-Cyan Rule.** Any light emitted in the interface is cyan and soft; neutral surfaces never cast colored or hard-edged shadows.

## Shapes

Soft, consistent rounding that grows with container size: 10px for image insets, 12px for controls (inputs, chips in the form, form buttons, service rows), 14px for the primary call to action, 16px for cards and bubbles, 22 to 24px for the large panels. Pills are reserved for filter chips, status badges, dots and nodes. Chat bubbles flatten one corner (6px) toward the speaker: top-left for incoming, top-right for outgoing and attached screenshot cards. Borders are always 1px hairlines or inset rings, never thick strokes.

## Components

### Buttons
- **Shape:** gently rounded (cta, 14px) at full 56px height; compact form and card variants use the control radius at 48px.
- **Primary:** Signal Cyan fill, ink label with the WhatsApp or arrow icon, cyan lift shadow. Full width on mobile.
- **Hover / Focus:** lifts 1 to 2px with a stronger glow (or brightens); presses down 1px; focus shows a 2px Lit Cyan ring offset from the ink.
- **Tinted:** Cyan Wash fill with a cyan inner ring and Lit Cyan label; the second WhatsApp entry inside the brief chapter.
- **Outline:** transparent with a 10% white hairline, slate label; Viber and phone alternatives.
- **Quiet link:** muted text with a faint bottom border that brightens on hover; the secondary hero action.

### Chips
- **Style:** pill filter chips on a faint white fill with a hairline; in the brief form the same treatment at the control radius and 44px touch height.
- **State:** selected chips switch to Cyan Wash, a cyan ring and Lit Cyan label.

### Cards / Containers
- **Corner Style:** 16px; large panels 22 to 24px.
- **Background:** Panel Navy, with an 8px inner well of Night Ink holding the screenshot.
- **Shadow Strategy:** none at rest except the hero chat panel (see Elevation).
- **Border:** hairline.
- **Internal Padding:** 8px around media, 20 to 28px for text.

### Inputs / Fields
- **Style:** Field fill, 10% white inset ring, control radius, 48px tall (44px on desktop), 16px text on mobile to prevent zoom.
- **Focus:** fill brightens slightly and the ring becomes a 2px cyan at 50%.
- **Error:** the ring turns red at 60%, with a red-200/300 message beneath; failures show in a red-washed note.

### Chat Bubbles (signature)
Incoming bubbles are Raised Navy with a hairline; outgoing bubbles are Cyan Wash with a 22% cyan border, 16px radius with the speaker-side corner at 6px, 14 to 14.5px text, timestamps in 11px tabular figures. A typing indicator (three pulsing Lit Cyan dots) holds the outgoing bubble's place. A delivered project arrives as an attachment card: ink well, screenshot, "live" pill with a glowing dot, project title and country flag.

### Path Mark (signature)
A 2px line fading from transparent into Signal Cyan, drawn downward (0.9s, ease-out-expo) when the chapter enters view, ending in a 28px ink node with a 60% cyan border, the chapter number in 11px bold Lit Cyan, and the node glow. Under reduced motion it renders complete and still.

## Do's and Don'ts

### Do:
- **Do** open every homepage chapter with a path mark carrying its two-digit number, then the heading.
- **Do** frame real client screenshots as message attachments or inside an ink well with an inner hairline.
- **Do** keep every surface on the ink, panel, raised ladder with a 1px hairline.
- **Do** play entrance motion once on first view with the expo-out curve and drop it entirely under prefers-reduced-motion.
- **Do** keep tap targets at 44px or more and inputs at 16px text on mobile.

### Don't:
- **Don't** place uppercase labels, kickers or eyebrows above headings; the path node carries the chapter number.
- **Don't** introduce a second accent hue or a multi-color gradient; cyan is the only color voice.
- **Don't** use hard offset or neutral heavy shadows on cards; depth is tonal plus cyan glow.
- **Don't** break chapters with alternating background bands; the path separates them on one ink ground.
- **Don't** draw the path as one continuous line across two-column layouts; it is a segment per chapter.
