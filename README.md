# @rozlouceni/tokens

Design tokeny značky Rozloučení (paleta Eternal Blue). Jediný zdroj pravdy pro barvy, rodiny písma a stíny ve všech zónách:

| Zóna | Repo |
|---|---|
| rozlouceni.cz | `rozlouceni` |
| moje.rozlouceni.cz | `rozlouceni-moje` |
| app.rozlouceni.cz | `rozlouceni-app` |

Vyžaduje Tailwind CSS v4. Balíček nemá build ani závislosti, jsou to tři CSS soubory.

## Co je uvnitř

| Soubor | Obsah |
|---|---|
| `tokens.css` | hodnoty jako CSS proměnné na `:root` |
| `theme.css` | napojení na Tailwind (`@theme inline`), vzniknou utility `bg-surface`, `text-on-surface-muted`, `shadow-card`, `font-display` … |
| `index.css` | importuje oba |

## Instalace

Verze se připíná na tag, zóna se tedy nezmění sama od sebe.

```bash
pnpm add github:jankyzlink/rozlouceni-design#v1.0.0
# web (npm):
npm install github:jankyzlink/rozlouceni-design#v1.0.0
```

## Použití

V hlavním CSS souboru zóny, hned za importem Tailwindu:

```css
@import "tailwindcss";
@import "@rozlouceni/tokens";
```

### Písma

Soubory písem balíček neobsahuje (Gelica je licencovaná). Zóna je načte sama:

- **Next.js**: `next/font` s proměnnou `--font-inter` (a později `--font-gelica`) na `<html>`.
- **Vite / čisté CSS**: rodiny pojmenované `Inter` a `Gelica` (`@font-face` nebo Google Fonts).

Bez Gelicy se nadpisy vykreslí Georgií.

### Vlastní hodnoty zóny

Zóna smí token přepsat nebo přidat vlastní, vždy **za** importem:

```css
@import "@rozlouceni/tokens";

.dark {
  --color-surface: #0E0E30;
}

:root { --color-surface-family: #F0E8D8; }
@theme inline { --color-surface-family: var(--color-surface-family); }
```

Co se týká jen jedné zóny (tmavý režim a provozní barvy app, barvy hodnocení na webu), do balíčku nepatří.

## Změna tokenu

1. Uprav hodnotu v `tokens.css`. Nový token přidej i do `theme.css`.
2. `npm run check` — kontrast textových tokenů vůči plochám musí projít (WCAG AA, 4,5:1).
3. Zvedni `version` v `package.json`, commitni, vytvoř tag `vX.Y.Z` a pushni i s tagem.
4. V každé zóně zvedni verzi v `package.json` a projdi ji vizuálně.

Verzování: nový token = minor, změna hodnoty = minor, přejmenování nebo odebrání = major.

## Odchylka od původního webu

`--color-on-surface-muted` je `#5E5E8C`, ne původních `#6C6C9C`. Původní hodnota měla na bílé kontrast 4,41:1 a neprošla WCAG AA.
