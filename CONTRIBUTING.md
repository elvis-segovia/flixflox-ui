# Contributing to flixflox-ui

Thanks for your interest in contributing! This repository contains the admin dashboard and web client for [FlixFlox](https://github.com/elvis-segovia/flixflox), the self-hosted video streaming API. Contributions of all kinds are welcome: bug reports, feature ideas, documentation fixes, translations and code.

## Ways to contribute

- **Report a bug** — open a [bug report](../../issues/new?template=bug_report.yml) with steps to reproduce.
- **Suggest a feature** — open a [feature request](../../issues/new?template=feature_request.yml). For bigger ideas, start a discussion first so we can align before you write code.
- **Improve the docs** — README fixes, setup guides and screenshots are always appreciated.
- **Pick up an issue** — issues labeled [`good first issue`](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) or [`help wanted`](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) are a great place to start. Comment on the issue so we don't duplicate work.

If your change affects the API (endpoints, auth, streaming), it probably belongs in the [FlixFlox backend repo](https://github.com/elvis-segovia/flixflox) instead — feel free to open an issue there.

## Development setup

### Prerequisites

- Node.js 22+
- A running [FlixFlox API](https://github.com/elvis-segovia/flixflox) instance (this UI is a thin client and does not work without it). Make sure the API's CORS origin includes `http://localhost:5173`.

### Getting started

```bash
git clone https://github.com/elvis-segovia/flixflox-ui.git
cd flixflox-ui
cp .env.example .env.local   # point VITE_STREAMAPI_URL at your API
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` with hot reload.

### Useful scripts

| Script            | Purpose                                            |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Vite dev server with HMR                           |
| `npm run lint`    | ESLint over `ts`/`tsx` sources (zero warnings)     |
| `npm run build`   | Type-check (`tsc`) and produce a production build  |
| `npm run preview` | Serve the built `dist/` locally                    |

### Project layout

```
src/
  components/   Shared UI: auth, crud, menu, navbar, video player, theme
  pages/admin/  Dashboard pages (home, catalog, categories, cast, users, login)
  pages/web/    Viewer-facing pages (home, movies, series, player, profiles)
  controllers/  API clients
  constants.tsx Menu definitions and route metadata
  strings.ts    Localized labels
```

## Making changes

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b fix/short-description
   ```
2. Make your changes. Keep the diff focused — one fix or feature per pull request.
3. Match the existing code style (TypeScript, functional React components, Ant Design components for UI). User-facing labels go in `src/strings.ts`, not hardcoded in components.
4. Verify before pushing:
   ```bash
   npm run lint
   npm run build
   ```
   Both must pass with no errors. Please also exercise the affected screens manually against a running API.
5. Push your branch and open a **pull request** against `main`. In the description, explain **what** changed and **why**, link the related issue (`Fixes #123`), and include screenshots or a short clip for any visual change.

### Commit messages

Use short, imperative messages with a type prefix, matching the existing history:

```
fix: correct next-episode offset in player
feat: add bulk delete to catalog
docs: document VITE_STREAMAPI_PREFIX
```

## Reporting security issues

Please do **not** open a public issue for security vulnerabilities. Report them privately via [GitHub security advisories](../../security/advisories/new).

## Code of conduct

Be respectful and constructive. We want this to be a welcoming project for contributors of all experience levels.

## Questions?

Open a [discussion](../../discussions) — happy to help you get set up.
