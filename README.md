# flixflox-ui

Admin dashboard and web client for [FlixFlox](https://github.com/elvis-segovia/flixflox), the self-hosted video streaming API. The dashboard lets you manage the catalog (movies and TV shows), categories, cast and users; the web client exposes a viewer-facing player backed by HLS.

## Tech stack

- React 18 + TypeScript
- [Vite](https://vitejs.dev/) for dev server and build
- [Ant Design 5](https://ant.design/) for UI components and theming
- [React Router 6](https://reactrouter.com/) for routing
- [video.js](https://videojs.com/) + `videojs-playlist` for HLS playback
- [axios](https://axios-http.com/) for API calls
- nginx (Alpine) for production serving

## Project layout

```
src/
  components/        Shared UI: auth, crud, menu, navbar, video player, theme
  pages/
    admin/           Dashboard pages (home, catalog, categories, cast, users, login)
    web/             Viewer-facing pages (home, movies, series, player, users)
  controllers/       API clients
  constants.tsx      Menu definitions and route metadata
  strings.ts         Localized labels
  App.tsx            Root: theme + menu wiring
  main.tsx           Entry point
config/default.conf  nginx config used in the production image
dockerfile           Multi-stage build (node build → nginx serve)
```

## Configuration

Environment variables are read at build time via Vite. Copy `.env.example` to `.env.local` and adjust:

| Variable                            | Default                  | Description                                         |
| ----------------------------------- | ------------------------ | --------------------------------------------------- |
| `VITE_STREAMAPI_URL`                | `http://localhost:5000`  | Base URL of the FlixFlox API                        |
| `VITE_STREAMAPI_PREFIX`             | `/v1/api`                | Public API prefix (matches FlixFlox routing)        |
| `VITE_STREAMAPI_PREFIX_ADMIN`       | `/dashboard`             | Path prefix for the admin dashboard routes          |
| `VITE_DEFAULT_NEXT_EPISODE_OFFSET`  | `15`                     | Seconds before episode end to surface "next episode"|

`.env.production` is baked into the Docker image during build.

## Running locally

Prerequisites: Node.js 22+, a running FlixFlox API instance.

```bash
cp .env.example .env.local
npm install
npm run dev
```

The dev server listens on `http://localhost:5173` and binds to `0.0.0.0` so it is reachable from other devices on the network.

### Available scripts

| Script          | Purpose                                          |
| --------------- | ------------------------------------------------ |
| `npm run dev`   | Vite dev server with HMR                         |
| `npm run build` | Type-check (`tsc`) and produce a production build|
| `npm run lint`  | ESLint over `ts`/`tsx` sources                   |
| `npm run preview`| Serve the built `dist/` locally for verification|
| `npm run debug` | Vite dev server with `--debug` logging           |

## Running with Docker

```bash
docker compose up --build
```

The image runs a multi-stage build: dependencies and the Vite bundle are produced on `node:22-alpine`, then the static output is copied into `nginx:alpine` and served on port `80` (mapped to `5173` by Compose). The nginx config falls back to `index.html` so client-side routes work on refresh.

Make sure `.env.production` points at a reachable FlixFlox API before building — values are inlined into the bundle.

## Backend dependency

This UI is a thin client — it does not work without a FlixFlox API. See the [FlixFlox README](https://github.com/elvis-segovia/flixflox) for instructions on running the API, MongoDB and FFmpeg-backed conversion worker. The CORS origin on the API must include the URL where this UI is served (defaults to `http://localhost:5173`).

## Routing

- `/dashboard/*` — admin: home, catalog (list/add/edit), categories, cast, users
- `/`            — web client: home, movies, series, player, viewer profiles
- `/login`       — authentication (JWT cookies set by the API)
