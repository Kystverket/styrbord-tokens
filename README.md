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

colors.light.primary.baseDefault       // "#000667"
colors.dark.primary.baseDefault        // "#a7a9ca"
colors.light.accent.backgroundDefault  // "#ffffff"
colors.light.hav.baseDefault           // Kystverket brand palette
```

#### Available color roles

| Role | Description |
|------|-------------|
| `primary` | Main brand color (navy) |
| `accent` | Accent color (coral/red) |
| `neutral` | Greys |
| `extra1` | Extra semantic role 1 |
| `extra2` | Extra semantic role 2 |
| `success` | Positive feedback |
| `danger` | Destructive / error |
| `warning` | Caution |
| `info` | Informational |
| `hav`, `stein`, `gress`, `sol`, `lyng`, `himmel`, `sand`, `fyr`, `dyphav`, `skog` | Kystverket brand palette |

Each role exposes 16 slots: `backgroundDefault`, `backgroundTinted`, `surfaceDefault`, `surfaceTinted`, `surfaceHover`, `surfaceActive`, `borderSubtle`, `borderDefault`, `borderStrong`, `textSubtle`, `textDefault`, `baseDefault`, `baseHover`, `baseActive`, `baseContrastSubtle`, `baseContrastDefault`.

> **Note:** Hex values are static snapshots. For runtime theme switching (light/dark), use the CSS custom properties instead.