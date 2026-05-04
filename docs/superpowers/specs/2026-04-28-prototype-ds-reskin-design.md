# Design Spec: prototype.html — alloweat DS Shell Replacement

**Date:** 2026-04-28
**Approach:** Shell Replacement (podejście 2)
**Output file:** `prototype.html` (single file, no HTTP server required)

---

## Cel

Przepisać `prototype.html` tak, aby wyglądał i zachowywał się zgodnie z alloweat Design System — przy zachowaniu wszystkich istniejących przepływów (kreator programu żywieniowego, zarządzanie klientami, jadłospis, modale). Komponenty Sidebar i Topbar zastąpione wersjami z DS. Tokeny kolorów, typografia i spacing ujednolicone. Dark mode zachowany i rozszerzony o ciemne odpowiedniki tokenów DS.

---

## Zakres

### Co się zmienia

| Komponent / warstwa | Zmiana |
|---|---|
| Sidebar | Zastąpiony komponentem z `ui_kits/app/Sidebar.jsx` (52 px, ikony inline SVG, grupy nawigacji dostosowane do ekranów dietetyka) |
| Topbar | Zastąpiony komponentem z `ui_kits/app/Topbar.jsx` (56 px, breadcrumby, wyszukiwarka, przełącznik dark mode, avatar) |
| CSS variables | Pełen zestaw tokenów z `colors_and_type.css` wbudowany jako `:root {}` i `.dark {}` |
| Tailwind config | Zaktualizowany inline — wartości zastąpione tokenami DS |
| Button (primary/ghost/danger) | Border-radius, kolory, font-weight — DS tokens |
| Input / Select / Textarea | Border, focus ring (brand color), border-radius — DS tokens |
| Badge / Chip | Kolory i padding — DS badge system |
| Card shell | `border-radius: 12px`, `border: 1px solid var(--border)`, `background: var(--surface)` |
| Modal backdrop + panel | Backdrop `--color-deepviolet` z opacity, panel `border-radius: 16px`, shadow `e4` |
| Avatar | `border-radius: 9999px`, background `--brand` |
| Tabs | Aktywna zakładka: underline `--brand`, font-weight 600 |

### Co zostaje bez zmian

Cała logika i zawartość następujących komponentów jest zachowana niezmieniona — zmieniają się tylko klasy CSS / inline style:

- `MealRow` — struktura, drag & drop, kliknięcia
- `AddRecipesSidePanel` — wyszukiwanie, filtrowanie, dodawanie przepisów
- `DayTypeEditor` — edycja nazw, kopiowanie dni
- `ShoppingListPanel` — generowanie, eksport
- `NamingContext` — mechanizm A/B copy testingu
- Wszystkie modale (7): `NewProgramModal`, `AutogenRecipesModal`, `MealplanGeneratorModal`, `DayTypesManagerModal`, `AutogenFromScratchModal`, `ExchangeProductsModal`, inne — logika, stan, props
- Wizard steps: `IntentScreen`, `SetupScreen`, `RecipesScreen`, `ProductsScreen`, `MealplanScreen`, `MaterialsScreen`, `DoneScreen`
- Routing między ekranami (stan `activeScreen`)

---

## System tokenów

### Jasny motyw (`:root`)

Tokeny przeniesione bezpośrednio z `alloweat Design System/colors_and_type.css`:

```css
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
```

### Ciemny motyw (`.dark`)

Wyprowadzone z DS, zharmonizowane z istniejącym dark mode prototype.html:

```css
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

---

## Sidebar DS

Nawigacja dostosowana do ekranów prototypu:

| ID | Etykieta | Grupa |
|---|---|---|
| `dashboard` | Pulpit | main |
| `clients` | Klienci | main |
| `programs` | Programy | main |
| `mealplans` | Jadłospisy | main |
| `meals` | Posiłki | main |
| `products` | Produkty | main |
| `reports` | Raporty | secondary |
| `settings` | Ustawienia | bottom |

Szerokość: **52 px, nierozwijany** (zmiana z obecnego 232 px/64 px expandable). DS Sidebar jest icon-only — etykiety widoczne tylko jako tooltip (`title`). To świadoma decyzja zaakceptowana w fazie design.

Styl aktywny: `background: var(--brand-tint); color: var(--brand)`. Hover: `background: rgba(116,72,208,0.07)`.

> **Uwaga implementacyjna:** Ostateczna lista ekranów/ikon w Sidebarze powinna być potwierdzona przez odczytanie aktualnej nawigacji w `prototype.html` i dopasowana 1:1 do istniejących ekranów. Tabela powyżej to propozycja wstępna.

---

## Topbar DS

- Wysokość: 56 px
- Lewa strona: tytuł ekranu (font-size 15px, font-weight 600) + opcjonalny breadcrumb
- Prawa strona: wyszukiwarka (220 px) → opcjonalny przycisk akcji (brand CTA) → przycisk powiadomień → **przełącznik dark mode** (ikona słońca/księżyca) → avatar inicjały
- Przełącznik dark mode: istniejąca logika z prototype.html przeniesiona do przycisku w Topbarze

---

## Typography

Font: Figtree, self-hosted z `fonts/` (już załadowany w prototype.html). Skala bez zmian — tylko wartości zaktualizowane do DS:

| Rola | Size | Weight |
|---|---|---|
| Page title | 22 px | 700 |
| Section header | 15 px | 600 |
| Body | 14 px | 400 |
| Label / meta | 13 px | 400 |
| Micro | 12 px | 400 |

---

## Corner radius

| Kontekst | Wartość |
|---|---|
| Badge, tag | 4–6 px |
| Input, button small | 8 px |
| Card, modal panel | 12 px |
| Modal backdrop panel | 16 px |
| Avatar, pill | 9999 px |

---

## Dark mode — mechanizm

- `darkMode: 'class'` w Tailwind config (bez zmian)
- Klasa `.dark` na `<html>` — przełączana przez przycisk w Topbarze
- Preferencja zapisywana w `localStorage` (istniejąca logika zachowana)

---

## Proces wdrożenia — iteracyjny, ekran po ekranie

Implementacja przebiega w cyklach. Każdy cykl = jeden ekran lub moduł:

1. **Implementuję ekran** — stosuję DS tokens, wymieniam Sidebar/Topbar, restyluję komponenty na tym ekranie
2. **Serwuję podgląd** — uruchamiam lokalny serwer i podaję URL do weryfikacji
3. **Czekam na walidację** — użytkownik przegląda ekran w przeglądarce
4. **Wspólna praca** — omawiamy uwagi, razem dopracowujemy komponenty lub wprowadzamy dodatkowe poprawki do ekranu
5. **Zatwierdzenie** — przechodzimy do następnego ekranu

### Kolejność ekranów

| # | Ekran / moduł | Zakres |
|---|---|---|
| 1 | Shell (Sidebar + Topbar) | Struktura aplikacji, tokeny, dark mode toggle |
| 2 | Dashboard (lista klientów) | Karty, tabela/lista, badges, search |
| 3 | IntentScreen | Wizard krok 1 — karty wyboru |
| 4 | SetupScreen | Wizard krok 2 — formularze, inputs |
| 5 | RecipesScreen | Wizard krok 3 — lista przepisów, filtry, chips |
| 6 | ProductsScreen | Wizard krok 4 — tabela produktów |
| 7 | MealplanScreen | Wizard krok 5 — MealRow, DayTypeEditor |
| 8 | MaterialsScreen + DoneScreen | Wizard krok 6–7 |
| 9 | Modale | Restyling wszystkich 7 modali |
| 10 | AddRecipesSidePanel + ShoppingListPanel | Side panele |

Po każdym kroku: podgląd → walidacja → opcjonalne poprawki → następny ekran.

---

## Co NIE wchodzi w zakres

- Zmiana przepływów UX ani kolejności kroków wizarda
- Zmiana treści (etykiety, kopie, polskie teksty pozostają)
- Rozbicie na wiele plików JSX
- Implementacja nowych ekranów
- Responsywność mobilna (prototype.html jest narzędziem desktopowym)

---

## Kryteria sukcesu

1. Plik otwiera się bezpośrednio w przeglądarce (bez serwera HTTP)
2. Sidebar ma 52 px, ikony inline SVG, aktywny stan `--brand-tint`
3. Topbar ma 56 px, wyszukiwarkę, przełącznik dark mode
4. Wszystkie ekrany i modale działają jak poprzednio
5. Dark mode przełącza się bez regresji
6. Brak hardkodowanych kolorów poza systemem tokenów
