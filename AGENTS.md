# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Build design tokens → dist/
npm run build

# Build tokens AND build the HTML demo → static/
npm run html

# Run the demo app in dev mode (from ds-demo-builder/)
cd ds-demo-builder && npm install && npm run dev
```

There are no lint or test scripts — this repo has no test suite.

## Architecture

This is `@kystverket/styrbord-tokens`, a CSS design token package for Kystverket built on top of [Digdir's designsystemet](https://github.com/digdir/designsystemet) tooling.

### How it works

The `@digdir/designsystemet` CLI reads the JSON token files in `design-tokens/` and compiles them into CSS custom properties in `dist/`. The package exports only CSS — consumers import `@kystverket/styrbord-tokens` and get CSS files.

The token build is controlled entirely by three special files at the root of `design-tokens/`:
- `$designsystemet.json` — declares the designsystemet version
- `$metadata.json` — defines the load order of token sets
- `$themes.json` — defines all themes and which token sets they activate (this is the largest and most important config file)

### Token layer hierarchy

Tokens are organized in three layers that build on each other:

1. **`primitives/`** — Raw values. Split into modes:
   - `size/` — spacing/sizing scales (small, medium, large, global)
   - `typography/` — font sizes per scale, plus font families (primary/secondary kystverket fonts)
   - `color-scheme/` — raw color palettes for light and dark, both `global` (generic blues/greens/etc.) and `kystverket` (brand palette with named colors like `dyphav`, `hav`, `himmel`, `stein`, `sand`, `sol`, `fyr`, `gress`, `skog`, `lyng`)

2. **`semantic/`** — Semantic tokens that reference primitives via aliases. Colors here use role names (`primary`, `accent`, `extra1`, `extra2`, `neutral`) with variants like `background-default`, `surface-hover`, `border-strong`, `text-default`, `base-contrast-default` etc.

3. **`themes/kystverket.json`** — The theme-level overrides that map semantic slots to specific primitive palette values.

### Demo builder

`ds-demo-builder/` is a standalone React + Vite app that visualises all token values. It reads the compiled CSS from `dist/` at runtime and renders sections for colors, typography, spacing, shadows, and border radii. Its build output goes to `static/`, which is deployed to GitHub Pages via the `make-gh-pages.yml` workflow whenever `design-tokens/` or `ds-demo-builder/` changes on `main`.

### Release process

Releases are managed by Release Please (`release-please.yml`). When a release is created on GitHub, `publish.yml` runs `npm run build` and publishes the package to both GitHub Packages and npmjs.org using OIDC (no token needed for npmjs).
