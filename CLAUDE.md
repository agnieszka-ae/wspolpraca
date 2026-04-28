# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static design handoff package for **Alloweat** — specifically the meal plan auto-generation feature (*autogeneracja jadłospisu*). Three deliverables, all plain HTML files:

| File | Purpose |
|---|---|
| `index.html` | Landing hub linking to the other files |
| `prototype.html` | Clickable interactive prototype (~540 KB, HTML + React + Tailwind) |
| `components.html` | Component library — 27 components in 4 groups with specs and state snapshots |
| `tokens.json` | W3C Design Tokens (CG draft) — importable to Figma Variables / Tokens Studio / Style Dictionary |

No build step, no package manager, no server. Open files directly in a browser.

## Tech stack

- **Tailwind CSS** loaded from CDN (`https://cdn.tailwindcss.com`) — configured inline via `tailwind.config` in each HTML file's `<script>` block
- **Fonts**: Figtree (sans-serif UI) + JetBrains Mono (monospace/code), loaded from Google Fonts
- **Dark mode**: Tailwind `darkMode: 'class'` — toggled by adding/removing `dark` class on `<html>`
- **prototype.html** additionally uses React (also CDN-loaded, no JSX transpilation step)

## Design token system

All tokens are defined in `tokens.json` and mirrored as Tailwind theme extensions in each HTML file. The canonical color roles:

- `brand` — primary purple (`#7448D0`), with `dark`/`darker` hover/active variants and `50`–`500` tint scale
- `ink` — neutral scale `900`–`100` (dark text to white canvas)
- `dark.*` — dark mode surface palette (`bg`, `surface`, `elevated`, `border`, `text`, `textMuted`, `textDim`, `accent`)
- Semantic: `success`, `warning`, `error`, `info` — each has `dark` (text), `DEFAULT` (icon), `light` (tonal bg), `bright` (dark mode highlight)
- `graphite` (`#31314D`) — header bg, meal time labels
- `deepviolet` (`#2D1D51`) — modal backdrop overlay

Shadow scale: `e1` (subtle card) → `e4` (modal/sidepanel) + `brand-sm/md/lg` (CTA buttons).

Animation timings in `tokens.json` under `animation` are physically validated — preserve them when implementing interactions.

## Component groups (components.html)

1. **Atoms** — Button, Input, Chip, Badge, Avatar, …
2. **Molecules** — Tabs, Accordion, Search, …
3. **Organisms** — Modals (7 total), AddRecipesSidePanel, MealRow, …
4. **Patterns** — Product section layouts

Modal widths: narrow 560 px · default 600 px · wide 680 px · side-panel 640 px (slide-in from right).

## Editing guidelines

- When modifying any HTML file, keep the `tailwind.config` block consistent across all three HTML files — they each define the full token set inline.
- `components.html` uses CSS custom properties (`--col-border`) in addition to Tailwind for the component card grid borders.
- Polish is the project language for all UI text and comments.
