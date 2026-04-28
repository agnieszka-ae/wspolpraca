# Prototype DS Reskin — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Sidebar and Topbar in `prototype.html` with DS-style components, apply DS token system across all screens, preserve all React logic and UX flows.

**Architecture:** Single-file HTML reskin. All changes are CSS class/style replacements inside `prototype.html`. No new files created. Token system added as CSS custom properties in `<style>` alongside the existing Tailwind config. Screens implemented one at a time with a user validation gate after each.

**Tech Stack:** React 18 (CDN, Babel Standalone), Tailwind CSS (CDN, inline config), Figtree font (Google Fonts CDN), no build step.

---

## File Structure

| File | Role | Action |
|---|---|---|
| `prototype.html` | Single-file prototype (9 257 lines) | Modify — all tasks touch this file |

No new files. No split.

---

## Validation protocol (applies to every task)

After each task:
1. Open `prototype.html` directly in browser (no server needed — all CDN)
2. Check the screen visually against the DS spec
3. User reviews and leaves feedback
4. Agree on adjustments → apply → re-open browser
5. Approve → commit → next task

---

## Task 1: Shell — Token System + Sidebar + Topbar

**Files:**
- Modify: `prototype.html:1-99` (Tailwind config colors)
- Modify: `prototype.html:101-269` (global CSS `<style>` block)
- Modify: `prototype.html:407-562` (Sidebar component)
- Modify: `prototype.html:565-898` (Topbar component)

### What changes

| Element | Before | After |
|---|---|---|
| Tailwind brand colors | `brand.DEFAULT #7448D0`, shades 50–500, dark.* palette | Keep existing config; add CSS custom properties below as overlay |
| CSS custom properties | None | Add `:root` + `.dark` DS token blocks to `<style>` |
| `html/body` background | `#FAFAFB` | `var(--bg)` |
| Sidebar width | Expandable: `md:w-[232px]` / `md:w-[64px]` | Fixed: `w-[52px]` — no collapse button, no expand |
| Sidebar active item | `bg-gradient-brand text-white shadow-brand-sm` | `background: var(--brand-tint); color: var(--brand)` |
| Sidebar hover | `hover:bg-brand-200` | `background: rgba(116,72,208,0.07)` |
| Topbar height | `h-14` (56 px) | `h-14` (already 56 px — no change) |
| Dark mode toggle | Hidden in user dropdown (`Motyw` section, lines 762–780) | Visible icon button in topbar right actions (sun/moon toggle) |

- [ ] **Step 1: Add DS token CSS custom properties**

In `prototype.html`, inside the existing `<style>` block (after line 101, before `html, body`), add:

```css
/* ====== DS TOKEN SYSTEM ====== */
:root {
  --brand:         #7448D0;
  --brand-hover:   #59379E;
  --brand-tint:    #F5F1FE;
  --bg:            #F7F7FB;
  --surface:       #FFFFFF;
  --border:        rgba(20, 20, 20, 0.10);
  --ink:           #050505;
  --ink-secondary: rgba(5, 5, 5, 0.55);
  --ink-tertiary:  rgba(5, 5, 5, 0.35);
  --success:       #16A34A;
  --danger:        #DC2626;
  --warning:       #D97706;
}
.dark {
  --brand:         #9B6FE8;
  --brand-hover:   #7448D0;
  --brand-tint:    rgba(116, 72, 208, 0.18);
  --bg:            #13131F;
  --surface:       #1C1C2E;
  --border:        rgba(255, 255, 255, 0.09);
  --ink:           #F0F0F8;
  --ink-secondary: rgba(240, 240, 248, 0.55);
  --ink-tertiary:  rgba(240, 240, 248, 0.35);
  --success:       #4ADE80;
  --danger:        #F87171;
  --warning:       #FCD34D;
}
```

- [ ] **Step 2: Update `html, body` background to use DS token**

Change line 104 from:
```css
  background: #FAFAFB;
```
to:
```css
  background: var(--bg);
```

Change line 110–113 (`.dark` override block):
```css
  html.dark, html.dark body {
    background: #0B080F;
    color: #EDECFF;
  }
```
to:
```css
  html.dark, html.dark body {
    background: var(--bg);
    color: var(--ink);
  }
```

- [ ] **Step 3: Replace Sidebar component (lines 407–562)**

Replace the entire `const Sidebar = ...` function with a fixed 52 px icon-only DS version:

```jsx
const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const groups = [
    {
      items: [
        { key: 'home',      icon: 'home',       label: 'Dashboard' },
        { key: 'clients',   icon: 'users',      label: 'Klienci',   active: true },
        { key: 'calendar',  icon: 'calendar',   label: 'Terminarz' },
        { key: 'clipboard', icon: 'clipboard',  label: 'Ankiety i raporty' },
        { key: 'apple',     icon: 'apple',      label: 'Produkty' },
        { key: 'doc',       icon: 'doc',        label: 'Przepisy' },
        { key: 'book',      icon: 'book',       label: 'Diety' },
        { key: 'programs',  icon: 'box',        label: 'Programy żywieniowe' },
      ]
    }
  ];
  const bottomItems = [
    { key: 'settings', icon: 'settings', label: 'Ustawienia' },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-deepviolet/50 backdrop-in"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside style={{ width: '52px', minWidth: '52px', background: 'var(--surface)', borderRight: '1px solid var(--border)' }}
        className={`
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          fixed md:relative h-full flex flex-col shrink-0 transition-all duration-200 ease-out z-50 md:z-40
        `}
      >
        {/* Logo */}
        <div style={{ height: '56px', borderBottom: '1px solid var(--border)' }}
          className="flex items-center justify-center shrink-0">
          <AllowLogo size={28} />
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-2 flex flex-col gap-0.5 items-center px-1.5">
          {groups[0].items.map(it => (
            <div key={it.key} className="group/item relative w-full">
              <button
                style={it.active
                  ? { background: 'var(--brand-tint)', color: 'var(--brand)', borderRadius: '8px' }
                  : { color: 'var(--ink-secondary)', borderRadius: '8px' }
                }
                className={`w-full h-[40px] flex items-center justify-center transition-all ${
                  it.active ? '' : 'hover:bg-[rgba(116,72,208,0.07)]'
                }`}
              >
                <Icon name={it.icon} className="w-[18px] h-[18px] shrink-0" stroke={it.active ? 2 : 1.75} />
              </button>
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-deepviolet text-white text-[11px] font-semibold rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-e3 z-50">
                {it.label}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-deepviolet"></div>
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom items */}
        <div style={{ borderTop: '1px solid var(--border)' }} className="py-2 flex flex-col gap-0.5 items-center px-1.5">
          {bottomItems.map(it => (
            <div key={it.key} className="group/item relative w-full">
              <button
                style={{ color: 'var(--ink-tertiary)', borderRadius: '8px' }}
                className="w-full h-[40px] flex items-center justify-center hover:bg-[rgba(116,72,208,0.07)] transition-all"
              >
                <Icon name={it.icon} className="w-[18px] h-[18px] shrink-0" stroke={1.75} />
              </button>
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-deepviolet text-white text-[11px] font-semibold rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-e3 z-50">
                {it.label}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-deepviolet"></div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
```

- [ ] **Step 4: Move dark mode toggle to Topbar right actions**

In the Topbar component, the theme switcher is currently inside the user dropdown (lines ~762–780). 

First, change the `setTheme` to a simple toggle (light ↔ dark) and add a button before the inbox button in the right actions `<div className="ml-auto flex items-center gap-1 shrink-0">`:

```jsx
{/* Dark mode toggle */}
<button
  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
  style={{ borderRadius: '8px' }}
  className="btn-press w-9 h-9 flex items-center justify-center hover:bg-ink-200 dark:hover:bg-dark-elevated text-ink-700 dark:text-dark-textMuted hover:text-ink-900 dark:text-dark-text transition-colors"
  title={theme === 'dark' ? 'Przełącz na jasny' : 'Przełącz na ciemny'}
>
  <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-[18px] h-[18px]" stroke={1.75} />
</button>
```

Keep the full theme switcher (light/dark/system) in the user dropdown — the topbar button is a convenience shortcut.

- [ ] **Step 5: Update Topbar surface to use DS token**

Change the `header` opening tag in Topbar from:
```jsx
<header className="h-14 bg-white dark:bg-dark-surface border-b border-ink-200 dark:border-dark-border ...">
```
to (add `style` for DS surface token, keep all existing classes):
```jsx
<header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }} className="h-14 flex items-center px-3 md:px-5 gap-2 md:gap-4 shrink-0 relative z-30">
```

- [ ] **Step 6: Validate Shell in browser**

Open `prototype.html` in browser:
- Sidebar should be 52 px wide, icon-only, no expand/collapse button
- Active nav item (Klienci) has lavender tint background + purple icon
- Topbar has 56 px height, sun/moon toggle button before inbox
- Light/dark toggle works — page background uses `var(--bg)` token
- All existing screens still navigable

- [ ] **Step 7: User validation gate**

Ask user to review Shell (Sidebar + Topbar + token system). Wait for feedback before continuing. Apply any requested adjustments, then re-validate.

- [ ] **Step 8: Commit Shell**

```bash
git add prototype.html
git commit -m "reskin: DS shell — token system, 52px sidebar, topbar dark toggle"
```

---

## Task 2: Dashboard Screen

**Files:**
- Modify: `prototype.html` — Dashboard component (search for `const Dashboard =`)

### What changes
- Page background: `bg-ink-200 dark:bg-dark-bg` → `background: var(--bg)`
- Cards: `bg-white dark:bg-dark-surface rounded-lg border border-ink-200 dark:border-dark-border` → `background: var(--surface); border: 1px solid var(--border); border-radius: 12px`
- Section headers: ensure `font-size: 15px; font-weight: 600; color: var(--ink)`
- Badges (status chips): border-radius 4–6 px, use DS semantic colors (`var(--success)`, `var(--danger)`, `var(--warning)`)
- Input (search bar): `border: 1px solid var(--border); border-radius: 8px; focus ring: var(--brand)`
- Avatar circles: `border-radius: 9999px`
- Client list rows: hover `background: rgba(116,72,208,0.04)`

- [ ] **Step 1: Apply card DS style to Dashboard**

Find all card containers in Dashboard (pattern: `bg-white dark:bg-dark-surface rounded-lg border border-ink-200 dark:border-dark-border shadow-e1`).

Replace inline style (add `style` prop alongside existing classes):
```jsx
style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}
```
Remove the redundant Tailwind color classes from those elements: `bg-white dark:bg-dark-surface border-ink-200 dark:border-dark-border`.

- [ ] **Step 2: Update badge/chip styles in Dashboard**

Find status badges (active/inactive/trial labels). Replace hardcoded color classes with semantic token styles:

Active: `style={{ background: 'rgba(22,163,74,0.1)', color: 'var(--success)', borderRadius: '4px' }}`
Inactive: `style={{ background: 'rgba(220,38,38,0.1)', color: 'var(--danger)', borderRadius: '4px' }}`
Trial: `style={{ background: 'rgba(217,119,6,0.1)', color: 'var(--warning)', borderRadius: '4px' }}`

- [ ] **Step 3: Update search input in Dashboard**

Find the search input. Add:
```jsx
style={{ border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--surface)' }}
```
Keep `focus:ring-brand/30` Tailwind class for the focus ring.

- [ ] **Step 4: Validate Dashboard in browser**

Open `prototype.html`, verify Dashboard screen:
- Cards use DS `--surface` + `--border`, 12 px radius
- Badges use semantic color tokens
- Search input has DS border
- Dark mode: cards become `--surface` (#1C1C2E), borders `--border` (rgba white 9%)

- [ ] **Step 5: User validation gate**

Ask user to review Dashboard screen. Wait for feedback, apply adjustments, re-validate.

- [ ] **Step 6: Commit Dashboard**

```bash
git add prototype.html
git commit -m "reskin: Dashboard — DS cards, badges, inputs"
```

---

## Task 3: IntentScreen (Wizard Step 1)

**Files:**
- Modify: `prototype.html:1985` — IntentScreen component

### What changes
- Page wrapper background: `var(--bg)`
- Selection cards: `border: 1.5px solid var(--border); border-radius: 12px; background: var(--surface)`
- Selected card: `border-color: var(--brand); background: var(--brand-tint); box-shadow: 0 0 0 3px rgba(116,72,208,0.12)`
- Hover card: `border-color: var(--brand); background: var(--brand-tint)`
- Badge "REKOMENDOWANY": `background: var(--brand); color: #fff; border-radius: 9999px; font-size: 11px; font-weight: 700`
- Icon circles: `background: rgba(116,72,208,0.08); color: var(--brand); border-radius: 50%`
- Card title: `font-size: 15px; font-weight: 600; color: var(--ink)`
- Card description: `font-size: 13px; color: var(--ink-secondary)`
- Bullet points: small color dots using `var(--brand-tint)`
- Page title: `font-size: 22px; font-weight: 700; color: var(--ink)`
- Back button: ghost style with `border: 1px solid var(--border); border-radius: 8px`
- Primary CTA button: keep `.btn-primary` gradient, ensure `border-radius: 8px`

- [ ] **Step 1: Update IntentScreen selection cards**

In the IntentScreen component, find the card mapping (options.map). For each card `<div>` or `<button>`:

Replace Tailwind border/bg classes with inline style:
```jsx
style={{
  border: `1.5px solid ${selectedId === opt.id ? 'var(--brand)' : 'var(--border)'}`,
  borderRadius: '12px',
  background: selectedId === opt.id ? 'var(--brand-tint)' : 'var(--surface)',
  boxShadow: selectedId === opt.id ? '0 0 0 3px rgba(116,72,208,0.12)' : 'none',
  cursor: 'pointer',
  transition: 'border-color 150ms, background 150ms, box-shadow 150ms',
}}
```

If the component has no `selectedId` state, add one:
```jsx
const [selectedId, setSelectedId] = useState(null);
```
And add `onClick={() => setSelectedId(opt.id)}` to each card (in addition to existing `onPick` call for navigation).

- [ ] **Step 2: Update badge and icon in IntentScreen cards**

For the "REKOMENDOWANY" badge:
```jsx
style={{ background: 'var(--brand)', color: '#fff', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, padding: '2px 10px' }}
```

For icon circles:
```jsx
style={{ background: 'rgba(116,72,208,0.08)', color: 'var(--brand)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
```

- [ ] **Step 3: Update typography in IntentScreen**

Page title `h1` or title `<div>`:
```jsx
style={{ fontSize: '22px', fontWeight: 700, color: 'var(--ink)' }}
```
Page subtitle:
```jsx
style={{ fontSize: '14px', color: 'var(--ink-secondary)' }}
```

- [ ] **Step 4: Validate IntentScreen in browser**

Navigate to IntentScreen (click "+" new program from Dashboard). Check:
- 4 selection cards with DS border + radius
- Hover/selected state: brand-tint background + brand border
- "REKOMENDOWANY" badge has brand background
- Dark mode: cards use `--surface` (#1C1C2E)

- [ ] **Step 5: User validation gate**

Ask user to review IntentScreen. Wait for feedback, apply adjustments.

- [ ] **Step 6: Commit IntentScreen**

```bash
git add prototype.html
git commit -m "reskin: IntentScreen — DS selection cards, badges, typography"
```

---

## Task 4: SetupScreen (Wizard Step 2)

**Files:**
- Modify: `prototype.html:3384` — SetupScreen component

### What changes
- Section cards: `border-radius: 12px; border: 1px solid var(--border); background: var(--surface)`
- Input/Select/Textarea: `border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--ink)`
- Input focus ring: `box-shadow: 0 0 0 3px rgba(116,72,208,0.2)` (keep existing `focus:ring-brand/30`)
- Labels: `font-size: 13px; font-weight: 500; color: var(--ink)`
- Helper text: `font-size: 12px; color: var(--ink-secondary)`
- Range slider (macro-slider): already styled in global CSS — no change needed
- Tabs: active tab underline `var(--brand)`, `font-weight: 600`; inactive `color: var(--ink-secondary)`
- Macro sliders section: card with `var(--surface)` + `var(--border)`
- Step progress bar: `background: var(--brand)` for fill, `var(--border)` for track
- Primary CTA: keep `.btn-primary`; ghost buttons `border: 1px solid var(--border); border-radius: 8px`

- [ ] **Step 1: Update SetupScreen form inputs**

Find all `<input>`, `<select>`, `<textarea>` elements in SetupScreen.

Add or update their style:
```jsx
style={{ border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--surface)', color: 'var(--ink)' }}
```
Keep existing Tailwind classes for focus ring, padding, font-size. Remove `bg-white dark:bg-dark-elevated border-ink-200 dark:border-dark-border` class variants.

- [ ] **Step 2: Update SetupScreen section cards**

For all `<div>` cards/panels:
```jsx
style={{ border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--surface)' }}
```
Remove `bg-white dark:bg-dark-surface border-ink-200 dark:border-dark-border rounded-lg` variants.

- [ ] **Step 3: Update SetupScreen tabs**

Find the tab row (day types or section tabs). For each tab button:
- Active: `style={{ color: 'var(--brand)', borderBottom: '2px solid var(--brand)', fontWeight: 600 }}`
- Inactive: `style={{ color: 'var(--ink-secondary)' }}`

- [ ] **Step 4: Validate SetupScreen in browser**

Navigate SetupScreen (pick any flow from IntentScreen). Check:
- Inputs have DS border + focus ring
- Cards use `--surface` + `--border` + 12 px radius
- Dark mode: inputs become dark surface, borders become rgba-white

- [ ] **Step 5: User validation gate**

Ask user to review SetupScreen. Wait for feedback, apply adjustments.

- [ ] **Step 6: Commit SetupScreen**

```bash
git add prototype.html
git commit -m "reskin: SetupScreen — DS inputs, section cards, tabs"
```

---

## Task 5: RecipesScreen (Wizard Step 3)

**Files:**
- Modify: `prototype.html:7311` — RecipesScreen component

### What changes
- Recipe cards: `border-radius: 12px; border: 1px solid var(--border); background: var(--surface)`
- Filter chips/tags: `border-radius: 4px; border: 1px solid var(--border); background: var(--surface); color: var(--ink-secondary)`
- Active filter chip: `background: var(--brand-tint); color: var(--brand); border-color: var(--brand)`
- Search input: `border: 1px solid var(--border); border-radius: 8px`
- Recipe name: `font-size: 14px; font-weight: 600; color: var(--ink)`
- Recipe meta: `font-size: 12px; color: var(--ink-secondary)`
- Macro badges (kcal, B/T/W): `border-radius: 4px; font-size: 11px; font-weight: 600`
- Add button (per recipe): `background: var(--brand); color: #fff; border-radius: 8px`
- Count badge (selected): `background: var(--brand); color: #fff; border-radius: 9999px`

- [ ] **Step 1: Update RecipesScreen recipe cards**

Find the recipe list/grid in RecipesScreen. For each recipe card:
```jsx
style={{ border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--surface)' }}
```

- [ ] **Step 2: Update RecipesScreen filter chips**

Find chip/tag filter buttons. Replace bg/border classes with:
```jsx
style={activeFilter === chip
  ? { background: 'var(--brand-tint)', color: 'var(--brand)', borderColor: 'var(--brand)', borderRadius: '4px', border: '1px solid var(--brand)' }
  : { background: 'var(--surface)', color: 'var(--ink-secondary)', border: '1px solid var(--border)', borderRadius: '4px' }
}
```

- [ ] **Step 3: Update RecipesScreen macro badges**

Find kcal/protein/fat/carb badges per recipe:
```jsx
style={{ borderRadius: '4px', fontSize: '11px', fontWeight: 600, padding: '2px 6px' }}
```
Keep existing background color classes for macro type differentiation.

- [ ] **Step 4: Validate RecipesScreen in browser**

Navigate to RecipesScreen. Check:
- Recipe cards: DS surface/border/radius
- Active filter chip: brand-tint background
- Search input: DS border
- Dark mode: correct surface colors

- [ ] **Step 5: User validation gate**

Ask user to review RecipesScreen. Wait for feedback, apply adjustments.

- [ ] **Step 6: Commit RecipesScreen**

```bash
git add prototype.html
git commit -m "reskin: RecipesScreen — DS recipe cards, filter chips, macro badges"
```

---

## Task 6: ProductsScreen (Wizard Step 4)

**Files:**
- Modify: `prototype.html:8543` — ProductsScreen component

### What changes
- Table container: `border-radius: 12px; border: 1px solid var(--border); background: var(--surface)`
- Table header row: `background: rgba(20,20,20,0.03); border-bottom: 1px solid var(--border)`
- Table header text: `font-size: 11px; font-weight: 600; color: var(--ink-tertiary); text-transform: uppercase`
- Table row hover: `background: rgba(116,72,208,0.04)`
- Table cell text: `font-size: 13px; color: var(--ink)`
- Table cell meta: `font-size: 12px; color: var(--ink-secondary)`
- Checkboxes: accent color `var(--brand)` (CSS `accent-color`)
- Portion/quantity inputs: `border: 1px solid var(--border); border-radius: 8px`
- Search/filter bar: same as RecipesScreen

- [ ] **Step 1: Update ProductsScreen table container**

Find the outer table wrapper `<div>`:
```jsx
style={{ border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--surface)', overflow: 'hidden' }}
```

- [ ] **Step 2: Update ProductsScreen table header**

Find `<thead>` or header row `<div>`:
```jsx
style={{ background: 'rgba(20,20,20,0.03)', borderBottom: '1px solid var(--border)' }}
```
Header cells:
```jsx
style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}
```

- [ ] **Step 3: Update ProductsScreen row hover + inputs**

Add `onMouseEnter`/`onMouseLeave` hover or use Tailwind `hover:bg-[rgba(116,72,208,0.04)]` class on row elements.

Quantity inputs:
```jsx
style={{ border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--surface)' }}
```

Add `style="accent-color: var(--brand)"` to checkbox inputs.

- [ ] **Step 4: Validate ProductsScreen in browser**

Navigate to ProductsScreen (via RecipesScreen → Produkty). Check:
- Table has DS border/radius
- Header uses tertiary ink
- Row hover uses brand micro-tint
- Checkboxes use brand accent color

- [ ] **Step 5: User validation gate**

Ask user to review ProductsScreen. Wait for feedback, apply adjustments.

- [ ] **Step 6: Commit ProductsScreen**

```bash
git add prototype.html
git commit -m "reskin: ProductsScreen — DS table, header, checkboxes"
```

---

## Task 7: MealplanScreen (Wizard Step 5)

**Files:**
- Modify: `prototype.html:7655` — MealplanScreen component (includes MealRow, DayTypeEditor)

### What changes
- Screen wrapper: `background: var(--bg)`
- Day column cards: `border-radius: 12px; border: 1px solid var(--border); background: var(--surface)`
- Day header (time label): keep `bg-graphite` — this is brand-specific, preserve as-is
- MealRow: `border-bottom: 1px solid var(--border)` between rows; drag handle hover `color: var(--brand)`
- Add meal button: `border: 1px dashed var(--border); border-radius: 8px; color: var(--ink-secondary)` hover → `border-color: var(--brand); color: var(--brand)`
- DayTypeEditor tabs: active `color: var(--brand); border-bottom: 2px solid var(--brand); font-weight: 600`
- Macro summary bar: `background: var(--surface); border: 1px solid var(--border); border-radius: 8px`
- Totals badges (kcal): `background: var(--brand-tint); color: var(--brand); border-radius: 4px`
- Copy day button: ghost `border: 1px solid var(--border); border-radius: 8px`
- Generate button: `.btn-primary` — no change

- [ ] **Step 1: Update MealplanScreen day columns**

Find day column wrapper `<div>` elements. Add:
```jsx
style={{ border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--surface)' }}
```

- [ ] **Step 2: Update MealRow DS styling**

Find MealRow component. Update:
- Row dividers: `style={{ borderBottom: '1px solid var(--border)' }}`
- Macro inline badges: `style={{ background: 'rgba(116,72,208,0.08)', color: 'var(--brand)', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}`
- Remove recipe icon: keep existing, just update border to `var(--border)`

- [ ] **Step 3: Update DayTypeEditor tabs**

Find DayTypeEditor tab row. Each tab:
```jsx
style={activeDay === day.id
  ? { color: 'var(--brand)', borderBottom: '2px solid var(--brand)', fontWeight: 600 }
  : { color: 'var(--ink-secondary)' }
}
```

- [ ] **Step 4: Validate MealplanScreen in browser**

Navigate to MealplanScreen (use "Gotowy jadłospis" flow). Check:
- Day columns use DS surface/border/radius
- MealRow dividers use `--border`
- DayType tab indicator is brand color
- Dark mode: columns use `--surface` (#1C1C2E)

- [ ] **Step 5: User validation gate**

Ask user to review MealplanScreen. Wait for feedback, apply adjustments.

- [ ] **Step 6: Commit MealplanScreen**

```bash
git add prototype.html
git commit -m "reskin: MealplanScreen — DS day columns, MealRow, DayTypeEditor tabs"
```

---

## Task 8: MaterialsScreen + DoneScreen (Wizard Steps 6–7)

**Files:**
- Modify: `prototype.html:8028` — MaterialsScreen component
- Modify: `prototype.html:8385` — DoneScreen component

### MaterialsScreen changes
- Section cards: `border-radius: 12px; border: 1px solid var(--border); background: var(--surface)`
- Material item rows: `border-bottom: 1px solid var(--border)` between items
- Checkbox toggles: `accent-color: var(--brand)`
- Upload area: `border: 1px dashed var(--border); border-radius: 8px`; hover → `border-color: var(--brand)`
- Tag chips: `border-radius: 4px; border: 1px solid var(--border)`

### DoneScreen changes
- Success card: `border-radius: 16px; border: 1px solid var(--border); background: var(--surface); box-shadow: 0 20px 40px -8px rgba(45,29,81,0.2)`
- Success icon circle: `background: rgba(22,163,74,0.1); color: var(--success); border-radius: 9999px`
- Summary chips (wizard summary): `border-radius: 4px; background: var(--brand-tint); color: var(--brand)`
- "Wróć do pulpitu" button: `.btn-primary` — no change

- [ ] **Step 1: Update MaterialsScreen cards and rows**

Find section wrappers in MaterialsScreen:
```jsx
style={{ border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--surface)' }}
```
Material item dividers:
```jsx
style={{ borderBottom: '1px solid var(--border)' }}
```
Checkboxes: add `style={{ accentColor: 'var(--brand)' }}`

- [ ] **Step 2: Update DoneScreen success card**

Find the main success panel:
```jsx
style={{ borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--surface)', boxShadow: '0 20px 40px -8px rgba(45,29,81,0.2)' }}
```
Success icon:
```jsx
style={{ background: 'rgba(22,163,74,0.1)', color: 'var(--success)', borderRadius: '9999px', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
```

- [ ] **Step 3: Update DoneScreen summary chips**

Find program summary chips (kcal, days, recipes count):
```jsx
style={{ borderRadius: '4px', background: 'var(--brand-tint)', color: 'var(--brand)', fontSize: '12px', fontWeight: 600, padding: '4px 8px' }}
```

- [ ] **Step 4: Validate MaterialsScreen + DoneScreen in browser**

Navigate through both screens. Check:
- Materials: cards/rows use DS tokens
- Done: success card uses `--surface` + deep-shadow
- Dark mode: success card uses `--surface` (#1C1C2E)

- [ ] **Step 5: User validation gate**

Ask user to review both screens. Wait for feedback, apply adjustments.

- [ ] **Step 6: Commit MaterialsScreen + DoneScreen**

```bash
git add prototype.html
git commit -m "reskin: MaterialsScreen + DoneScreen — DS cards, success panel, chips"
```

---

## Task 9: Modals (all 7)

**Files:**
- Modify: `prototype.html` — 7 modal components:
  - `NewProgramModal` (line 1697)
  - `DayTypesManagerModal` (line 2407)
  - `AutogenRecipesModal` (line 3865)
  - `MealplanGeneratorModal` (line 4770)
  - `AutogenFromScratchModal` (line 5764)
  - `ExchangeProductsModal` (line 8965)
  - Any remaining inline modals

### What changes — applied to ALL modals

| Element | DS value |
|---|---|
| Backdrop | `background: rgba(45,29,81,0.5); backdrop-filter: blur(4px)` |
| Panel | `border-radius: 16px; background: var(--surface); box-shadow: 0 20px 40px -8px rgba(45,29,81,0.2), 0 12px 24px -6px rgba(20,20,20,0.08)` (e4 shadow) |
| Modal header | `border-bottom: 1px solid var(--border); padding: 20px 24px` |
| Modal header title | `font-size: 16px; font-weight: 700; color: var(--ink)` |
| Modal body | `padding: 24px; background: var(--surface)` |
| Modal footer | `border-top: 1px solid var(--border); padding: 16px 24px; background: rgba(20,20,20,0.02)` |
| Close button | `border-radius: 8px; color: var(--ink-secondary)` hover `background: rgba(20,20,20,0.06)` |
| Primary button | `.btn-primary` — keep existing |
| Ghost button | `border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--ink)` |
| Danger button | `background: var(--danger); color: #fff; border-radius: 8px` |
| Inputs inside modals | `border: 1px solid var(--border); border-radius: 8px; background: var(--surface)` |

- [ ] **Step 1: Create a shared modal style helper comment**

At the top of the first modal (NewProgramModal), add a comment listing the reusable style values. This guides consistent changes across all 7 modals.

- [ ] **Step 2: Update modal backdrops (all 7)**

Find each modal's backdrop `<div>`. Pattern typically:
```jsx
className="fixed inset-0 z-50 flex items-center justify-center bg-deepviolet/50 ..."
```
Update to:
```jsx
style={{ background: 'rgba(45,29,81,0.5)', backdropFilter: 'blur(4px)' }}
className="fixed inset-0 z-50 flex items-center justify-center"
```

- [ ] **Step 3: Update modal panels (all 7)**

Find each modal's main `<div>` panel. Add:
```jsx
style={{ borderRadius: '16px', background: 'var(--surface)', boxShadow: '0 20px 40px -8px rgba(45,29,81,0.2), 0 12px 24px -6px rgba(20,20,20,0.08)' }}
```
Remove `bg-white dark:bg-dark-surface rounded-xl shadow-e4 border border-ink-200 dark:border-dark-border` variants.

- [ ] **Step 4: Update modal headers + footers (all 7)**

Header:
```jsx
style={{ borderBottom: '1px solid var(--border)', padding: '20px 24px' }}
```
Footer:
```jsx
style={{ borderTop: '1px solid var(--border)', padding: '16px 24px', background: 'rgba(20,20,20,0.02)' }}
```

- [ ] **Step 5: Update buttons inside modals (all 7)**

Ghost/cancel buttons:
```jsx
style={{ border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--surface)', color: 'var(--ink)' }}
```
Keep `.btn-primary` on primary CTAs.

- [ ] **Step 6: Update inputs inside modals (all 7)**

Same as SetupScreen inputs:
```jsx
style={{ border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--surface)', color: 'var(--ink)' }}
```

- [ ] **Step 7: Validate all 7 modals in browser**

Open each modal. Trigger points:
- NewProgramModal: "+" button on Dashboard
- DayTypesManagerModal: "Zarządzaj typami dni" in MealplanScreen
- AutogenRecipesModal: auto-gen button in RecipesScreen
- MealplanGeneratorModal: generate button in MealplanScreen
- AutogenFromScratchModal: "od zera" option in MealplanScreen
- ExchangeProductsModal: "Wymień produkty" in MealplanScreen

Check for each:
- Backdrop uses deepviolet with blur
- Panel has 16 px radius + e4 shadow
- Header/footer have DS borders
- Dark mode: panel uses `--surface` (#1C1C2E)

- [ ] **Step 8: User validation gate**

Ask user to review all modals. Wait for feedback, apply adjustments.

- [ ] **Step 9: Commit modals**

```bash
git add prototype.html
git commit -m "reskin: all 7 modals — DS backdrop, panel, header/footer, buttons"
```

---

## Task 10: Side Panels — AddRecipesSidePanel + ShoppingListPanel

**Files:**
- Modify: `prototype.html:6829` — AddRecipesSidePanel component
- Modify: `prototype.html:899` — ShoppingListPanel component

### What changes
- Panel slide-in wrapper: `width: 640px; background: var(--surface); border-left: 1px solid var(--border); box-shadow: 0 20px 40px -8px rgba(45,29,81,0.2)` (e4 shadow, left side)
- Panel header: `border-bottom: 1px solid var(--border); padding: 20px 24px`
- Panel title: `font-size: 16px; font-weight: 700; color: var(--ink)`
- Close button: `border-radius: 8px; color: var(--ink-secondary)`
- Search input: `border: 1px solid var(--border); border-radius: 8px`
- Filter chips: same as RecipesScreen
- Recipe/product rows: `border-bottom: 1px solid var(--border)`
- Add button (per row): `background: var(--brand); color: #fff; border-radius: 6px`
- Footer actions: `border-top: 1px solid var(--border); padding: 16px 24px`
- ShoppingList export button: `.btn-primary`
- ShoppingList category headers: `font-size: 11px; font-weight: 700; color: var(--ink-tertiary); text-transform: uppercase`

- [ ] **Step 1: Update AddRecipesSidePanel wrapper + header**

Find panel's outer `<div>` (slide-in container):
```jsx
style={{ width: '640px', background: 'var(--surface)', borderLeft: '1px solid var(--border)', boxShadow: '0 20px 40px -8px rgba(45,29,81,0.2), 0 12px 24px -6px rgba(20,20,20,0.08)' }}
```

Header:
```jsx
style={{ borderBottom: '1px solid var(--border)', padding: '20px 24px' }}
```

- [ ] **Step 2: Update AddRecipesSidePanel recipe rows + chips**

Recipe rows:
```jsx
style={{ borderBottom: '1px solid var(--border)' }}
```
Filter chips: same inline style pattern as Task 5 Step 2.

Search input:
```jsx
style={{ border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--surface)' }}
```

- [ ] **Step 3: Update ShoppingListPanel**

Wrapper and header: same as Step 1 above.

Category headers:
```jsx
style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}
```

Product rows:
```jsx
style={{ borderBottom: '1px solid var(--border)' }}
```

- [ ] **Step 4: Validate side panels in browser**

Open AddRecipesSidePanel (open from MealplanScreen). Open ShoppingListPanel. Check:
- Panels use `--surface` + `--border` + e4 shadow
- Filter chips: DS style
- Rows: `--border` dividers
- Dark mode: panel uses `--surface` (#1C1C2E)

- [ ] **Step 5: User validation gate**

Ask user to review both panels. Wait for feedback, apply adjustments.

- [ ] **Step 6: Final commit**

```bash
git add prototype.html
git commit -m "reskin: AddRecipesSidePanel + ShoppingListPanel — DS panels, rows, chips"
```

---

## Completion checklist

After Task 10, verify the full success criteria from the spec:

- [ ] File opens directly in browser without HTTP server
- [ ] Sidebar is 52 px, icon-only, tooltip on hover, active state uses `--brand-tint`
- [ ] Topbar is 56 px, has search, dark mode toggle button visible
- [ ] All screens navigable: dashboard → intent → setup → recipes → products → mealplan → materials → done
- [ ] All 7 modals open and close correctly
- [ ] Both side panels open and close correctly
- [ ] Dark mode toggle switches theme without visual regression on any screen
- [ ] No hardcoded colors outside the token system (do a quick scan for `#7448D0`, `#FFFFFF`, `#050505` outside `:root`/`.dark` blocks — these should only exist in `token-using` contexts like gradient definitions)
