# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm i          # install dependencies
npm run dev    # start dev server (Vite, localhost:5173)
npm run build  # production build → dist/
```

Deploying: push to `main` — GitHub Actions builds and deploys to GitHub Pages at `https://10pbackpacker.github.io/Currencyconverterapp/` automatically.

## Architecture

The entire app lives in one file: `src/app/App.tsx`. There are no other custom components.

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS v4. The `src/app/components/ui/` directory contains scaffolded shadcn/Radix components that are **not used** by the app — ignore them.

**State in App.tsx:**
- `topValue` / `bottomValue` — raw numeric strings (no commas) for each input field. Displayed with `addCommas()`.
- `lastEdited: 'top' | 'bottom'` — tracks which field the user last typed in, used by the swap button.
- `mode: ConversionMode` — `'currency' | 'hectares' | 'sqmeters'`, controls which `configs` entry is active.
- `liveRate` / `rateStatus` / `lastUpdated` — live PHP/USD rate fetched from `open.er-api.com` on mount; falls back to hardcoded `0.018`.
- `phTime` — Philippines time string (Asia/Manila), updated every second via `setInterval`.

**Conversion logic:**
- Each mode has a `ConversionConfig` entry in `configs` with `rate`, `decimals`, unit labels, and `rateText`.
- Currency mode: top=USD, bottom=PHP. Rate is `1 / effectiveCurrencyRate` (USD→PHP).
- Top→bottom: `value * rate`. Bottom→top: `value / rate`.
- Swap button moves the last-typed value to the other field and recomputes; it does **not** flip unit positions.

**Vite base path:** `/Currencyconverterapp/` — required for GitHub Pages. All public asset paths (manifest, icons) must include this prefix.

**PWA:** `public/manifest.json` + apple-touch-icon in `index.html`. No service worker.

## Key files

| File | Purpose |
|---|---|
| `src/app/App.tsx` | Entire application |
| `src/styles/index.css` | Global styles — sets `html, body, #root { height: 100%; overflow: hidden }` for PWA feel |
| `public/manifest.json` | PWA manifest (name, icons, theme color) |
| `index.html` | Viewport meta (zoom disabled), manifest link, theme-color |
| `vite.config.ts` | Base path + React + Tailwind plugins |
| `.github/workflows/deploy.yml` | CI: `npm install` → `npm run build` → deploy to GitHub Pages |
