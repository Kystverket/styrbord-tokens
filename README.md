# styrbord-tokens

`@kystverket/styrbord-tokens` is the CSS design token package for Kystverket's design system, Styrbord. It provides color, typography, spacing, and other design tokens as CSS custom properties, plus a typed JavaScript module for use in TypeScript/Node.js projects.

## Installation

```bash
npm install @kystverket/styrbord-tokens
```

## Usage

### CSS (browser / SSR)

Import the stylesheet to get all tokens as CSS custom properties:

```css
@import '@kystverket/styrbord-tokens';
```

Or in JavaScript/TypeScript:

```ts
import '@kystverket/styrbord-tokens';
```

Tokens are then available as CSS variables:

```css
.my-element {
  background-color: var(--ds-color-primary-background-default);
  color: var(--ds-color-primary-text-default);
  border: 1px solid var(--ds-color-primary-border-default);
}
```

### TypeScript / JavaScript (hex values)

For contexts where CSS variables aren't available — Node.js tooling, chart libraries, image generation, etc. — import the `colors` module to get static hex values for both light and dark modes:

```ts
import { colors } from '@kystverket/styrbord-tokens/colors';

colors.light.primary.baseDefault       // "#001955"
colors.dark.primary.baseDefault        // "#a9e5fb"
colors.light.accent.backgroundDefault  // "#ffffff"
colors.light.accent.brand              // "#ff451f" (profile colour)
```

#### Available color roles

| Role | Description |
|------|-------------|
| `primary` | Main brand color (dark blue #001955) |
| `accent` | Accent color (coral/red) |
| `neutral` | Blue-greys |
| `extra1` | Category scale (green) |
| `extra2` | Category scale (mid blue) |
| `success` | Positive feedback |
| `danger` | Destructive / error |
| `warning` | Caution |
| `info` | Informational |
| `sol`, `lyng` | Category scales (yellow, heather) |

Each role exposes 16 slots: `backgroundDefault`, `backgroundTinted`, `surfaceDefault`, `surfaceTinted`, `surfaceHover`, `surfaceActive`, `borderSubtle`, `borderDefault`, `borderStrong`, `textSubtle`, `textDefault`, `baseDefault`, `baseHover`, `baseActive`, `baseContrastSubtle`, `baseContrastDefault`.

In light mode `borderSubtle` and `backgroundTinted` are 8-digit hex (`#rrggbbaa`) with opacity.

Some roles also expose profile colours from the brand guidelines, each with a `-contrast` text colour: `brand` (`primary`, `accent`, `neutral`, `extra1`, `extra2`, `sol`, `lyng`), `brandSecondary` (`primary`, `extra1`) and `brandBackground` (`primary`). These are for single elements and do not build the scales. In CSS they are `--ds-color-<role>-brand`, `--ds-color-<role>-brand-contrast` etc., and `--ds-color-brand` inside `[data-color]`.

> **Note:** Hex values are static snapshots. For runtime theme switching (light/dark), use the CSS custom properties instead.