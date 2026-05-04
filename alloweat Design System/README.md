# alloweat Design System

## Overview

**alloweat** is a Polish B2B SaaS platform for managing employee meal allowances, financial tracking, and food-related workplace services. The product helps companies manage food benefits, track spending, and connect with catering/restaurant partners.

**Brand personality:** Playful but professional. Warm, modern, trustworthy. Inspired by top SaaS tools like Linear, Notion, and Loom.

### Source Files
- `uploads/Dashboard.svg` — Main dashboard screen (1440×990)
- `uploads/Finance.svg` — Finance/payments screen (1440×990)
- `uploads/Dane i usługi.svg` — Data & Services screen (1440×990)
- `uploads/logo.svg fill.svg` — Full wordmark logo (129×27)
- `uploads/Vector.svg` — Icon-only logomark (36×30)

No Figma link or codebase was provided. Design system is derived from the screen SVGs.

---

## CONTENT FUNDAMENTALS

### Voice & Tone
- **Playful but professional** — conversational, human, never robotic
- **Polish-first** — the product UI is in Polish ("Dane i usługi", "Pulpit", "Finanse")
- **Second person** — direct, action-oriented ("Zarządzaj", "Dodaj", "Sprawdź")
- **Short labels** — nav items are single nouns; no long instructions in UI
- **No emoji** in the UI — clean, icon-driven communication
- **Sentence case** throughout — not ALL CAPS, not Title Case Every Word
- **Numbers formatted clearly** — financial data uses Polish decimal comma convention

### Copy Examples (from screens)
- Navigation: "Pulpit", "Finanse", "Dane i usługi", "Integracje", "Konfiguracja"
- Actions: search bar uses a subtle placeholder, no aggressive CTAs
- Headers: short, noun-first ("Raporty", "Dashboard")

---

## VISUAL FOUNDATIONS

### Colors
| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#7448D0` | Brand, CTA buttons, active icons, logo |
| `--color-primary-deep` | `#2D1D51` | Wordmark text, dark brand accents |
| `--color-primary-tint` | `#F5F1FE` | Active nav icon backgrounds |
| `--color-primary-mid` | `#59379E` | Alt purple, secondary accents |
| `--color-bg` | `#F7F7FB` | App background / page canvas |
| `--color-surface` | `#FFFFFF` | Cards, sidebar, topbar |
| `--color-ink` | `#050505` | Primary text |
| `--color-ink-secondary` | `rgba(5,5,5,0.65)` | Secondary icons, secondary text |
| `--color-border` | `rgba(20,20,20,0.10)` | Dividers, card borders, inputs |
| `--color-success` | `#16A34A` | Positive financial values |
| `--color-danger` | `#DC2626` | Negative values, errors |

### Typography
- **Font family:** Figtree (Google Fonts) — geometric sans-serif, friendly and modern
- **Fallback:** `system-ui, -apple-system, sans-serif`
- **Weights used:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Scale:**
  - Display: 32px / 700 — page titles
  - H1: 24px / 600
  - H2: 18px / 600
  - H3: 15px / 600
  - Body: 14px / 400 — default content
  - Small: 13px / 400 — labels, meta
  - Micro: 12px / 400 — captions, timestamps
- **Letter-spacing:** slightly tight on headings (-0.01em); normal on body
- **Line-height:** 1.5 body, 1.25 headings

### Spacing
- Base unit: **4px**
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- Sidebar width: 52px
- Topbar height: 56px
- Card padding: 20–24px
- Nav icon container: 36×36px with 8px inset from sidebar edge

### Corner Radius
- **4px** — small badges, tags
- **8px** — nav icon backgrounds, inputs, small cards
- **12px** — primary cards, modals
- **20px** — action buttons (pill-adjacent)
- **9999px** — avatar circles, pills

### Borders & Dividers
- Card border: `1px solid rgba(20,20,20,0.10)`
- Sidebar right border: `1px solid rgba(20,20,20,0.10)`
- Section dividers: `1px solid rgba(20,20,20,0.10)`
- No drop shadows on most elements — border-only card style

### Backgrounds
- Main canvas: `#F7F7FB` (slightly lavender-tinted near-white)
- Cards / panels: pure `#FFFFFF`
- No full-bleed imagery; no gradients in UI
- No textures or patterns — clean flat surfaces

### Animations
- Subtle and fast: `150–200ms ease` for hover/active states
- No bouncy springs — composed, professional transitions
- Hover: slight background tint or opacity shift (`opacity: 0.8`)
- Press: no scale shrink — background color deepens slightly

### Iconography
See ICONOGRAPHY section below.

### Cards
- White background, `rx="8"` or `rx="12"` corner radius
- `1px` border `rgba(20,20,20,0.10)`
- No outer shadow — clean, flat card system
- Padding: 20–24px

### Layout
- Fixed 52px collapsed sidebar (icon-only; no text labels visible)
- Fixed 56px topbar
- Fluid content area to the right of sidebar and below topbar
- No sticky footers; content scrolls within the main area

### Transparency / Blur
- No blur effects observed
- Subtle transparency used for borders and secondary text only

---

## ICONOGRAPHY

- **Style:** SF Symbols-style outline icons, 36×36px artboard, 20px visual icon area
- **Weight:** Regular/medium stroke weight, rounded caps
- **Color:** `#050505` at 65% opacity for inactive; `#7448D0` for active
- **Active state:** Icon placed on `#F5F1FE` background with `rx="8"`, 36×36px
- **No icon font** — icons are inline SVG paths
- **Source:** Icons appear to be SF Symbols or a compatible set (not a named third-party library)
- **CDN substitute:** Use Lucide Icons (`https://unpkg.com/lucide@latest`) as closest match — same stroke style, rounded ends
- **Emoji:** Not used in UI

**Navigation icons observed:**
- Dashboard / Grid
- People / Team
- Calendar
- Finance / Money
- Leaf / Nature (likely "Posiłki" meals)
- Spice / Herb
- Shopping / Cart
- Documents / Files
- Clipboard
- Cloud / Download
- Education / Graduation
- Warning / Alert
- Settings / Cog
- Box / Package
- Star / AI
- 3D Box / Integrations

---

## FILE INDEX

```
README.md                      ← This file
SKILL.md                       ← Agent skill definition
colors_and_type.css            ← CSS variables for colors and typography
assets/
  logo.svg                     ← Full wordmark (129×27)
  logo-icon.svg                ← Icon-only logomark (36×30)
  screens/
    Dashboard.svg              ← Dashboard screen reference
    Finance.svg                ← Finance screen reference
    Dane-i-uslugi.svg          ← Data & Services screen reference
preview/
  colors-brand.html            ← Brand color palette
  colors-neutral.html          ← Neutral / semantic colors
  typography-scale.html        ← Type scale specimen
  typography-body.html         ← Body text specimen
  spacing-tokens.html          ← Spacing + radius tokens
  components-buttons.html      ← Button variants
  components-inputs.html       ← Form inputs
  components-cards.html        ← Card + badge variants
  components-nav.html          ← Sidebar + topbar navigation
  brand-logo.html              ← Logo variants
ui_kits/
  app/
    index.html                 ← Interactive app prototype
    Sidebar.jsx                ← Sidebar navigation component
    Topbar.jsx                 ← Top navigation bar
    Dashboard.jsx              ← Dashboard screen
    Finance.jsx                ← Finance screen
    DataServices.jsx           ← Dane i usługi screen
```
