# Draft issues — flixflox-ui

Ready to paste into GitHub. Bugs follow `.github/ISSUE_TEMPLATE/bug_report.yml`, features follow `feature_request.yml`.
Line references are against `f360920`.

---

## 1. [Bug]: Playing an episode shows "Video not available"

**Area:** Web client / player

**What happened?**
Opening a TV show episode (`/web/play/:id/season/:season/episode/:episode`) always renders the "Video not available" empty state instead of the player, even though the episode request succeeds.

**Steps to reproduce**
1. Log in and pick a viewer profile
2. Go to TV Shows → open a series
3. Click any episode card
4. The page shows "Video not available"

**Expected behavior**
The player loads with the season's episodes as the playlist, starting at the selected episode.

**Notes**
`src/pages/web/player/index.tsx:65-94` — when the `season` param is present the effect calls `getEpisode()` and only fills `sources`; `video` is never set. The guard at `src/pages/web/player/index.tsx:104` (`if (error || !video)`) then short-circuits before the player renders. The show details need to be fetched alongside the episode list (or the guard relaxed to `!video && sources.length === 0`).

---

## 2. [Bug]: Cast page is always empty and "Add" leads nowhere

**Area:** Admin dashboard

**What happened?**
Dashboard → Cast always shows an empty table, regardless of how much cast data the API holds. Clicking "Add" navigates to a blank page.

**Steps to reproduce**
1. Create cast entries via the API
2. Log in to the dashboard → Cast
3. Table is empty
4. Click "Add" → blank page

**Expected behavior**
The table lists cast from `GET /cast`, and "Add" opens a create form.

**Notes**
- `src/pages/admin/cast/list.tsx:8` initialises `dataSource` and never calls `CastController.listCast()` — the setter is even parked as `_setDataSource`. `CastController` (`src/controllers/castController.ts`) has full CRUD available and unused.
- The "Add" button links to `/dashboard/cast/add` (`src/pages/admin/cast/list.tsx:62`), but `menuItems` has no child route for it (`src/constants.tsx:70-76`), so the router falls through to `BlankPage`.

---

## 3. [Bug]: Edit and Delete buttons do nothing in Catalog, Episodes, Genres and Cast tables

**Area:** Admin dashboard

**What happened?**
The row action buttons render with tooltips but have no click handler, so nothing happens. Only Users → Delete is wired up.

**Steps to reproduce**
1. Dashboard → Catalog → Movies
2. Click Edit or Delete on any row
3. Nothing happens; no request, no confirmation

**Expected behavior**
Edit opens the corresponding form pre-filled; Delete asks for confirmation (like `UsersList` does with `Modal.confirm`) and removes the item.

**Notes**
Inert buttons: `src/pages/admin/catalog/list.tsx:118-134` (Edit for movies, Delete), `src/pages/admin/catalog/view.tsx:108-115` (episode Delete), `src/pages/admin/genres/list.tsx:66-80`, `src/pages/admin/cast/list.tsx:40-54`.
`CatalogController` (`src/controllers/catalogController.ts`) has no `deleteVideo` / `deleteEpisode` / `updateVideo` method yet, so catalog deletion needs API methods added too. `UsersList.handleDelete` (`src/pages/admin/users/list.tsx:24-42`) is the pattern to copy.

---

## 4. [Bug]: Controllers capture the auth token at construction, so requests can go out with `Bearer null`

**Area:** Login / authentication

**What happened?**
Every controller builds its axios instance once, reading `localStorage.getItem('authToken')` at construction time. Most controllers are instantiated at module scope, which happens at import time — before login on a cold load. Those instances keep sending the token that existed then (often `Bearer null`), and never pick up a refreshed token.

**Steps to reproduce**
1. Open the app in a fresh browser session (no stored token)
2. Log in
3. Navigate to Catalog — the request carries the header built at import time, not the new token
4. Same after `POST /auth/token/refresh` issues a new token

**Expected behavior**
Each request sends the current token.

**Notes**
`src/controllers/catalogController.ts:8-13`, and the same pattern in `usersController.ts`, `viewersController.ts`, `genresController.ts`, `castController.ts`. Module-scope instances: `src/pages/admin/catalog/list.tsx:9`, `src/pages/web/movies/index.tsx:7`, `src/pages/web/player/index.tsx:31`, `src/pages/admin/genres/list.tsx:9`.
Fix shape: one shared axios instance with a request interceptor that reads the token per request (and a 401 response interceptor that triggers refresh). Worth deciding at the same time whether the token belongs in `localStorage` at all — the README advertises "JWT cookie authentication", and a cookie-based flow would remove the XSS exposure.

---

## 5. [Bug]: AuthProvider fires two authentication checks on every mount

**Area:** Login / authentication

**What happened?**
`AuthProvider` has two effects that both run `checkAuth()` on mount, so every page load sends at least two `GET /auth/check` requests — and two `POST /auth/token/refresh` requests when the first check fails.

**Steps to reproduce**
1. Open dev tools → Network
2. Load any page of the app
3. Two `/auth/check` calls; with an expired token, two `/auth/token/refresh` calls

**Expected behavior**
One check per mount, one refresh attempt on failure.

**Notes**
`src/components/authentication/authProvider.tsx:78-116` (mount effect) and `:118-120` (effect on `checkAuthentication`, which is a `useCallback` keyed on `navigate`). The two branches also duplicate the same ~20 lines of state-setting three times over; collapsing them into one helper would make the retry path much easier to follow. Double refresh calls are a real hazard if the API rotates refresh tokens.

---

## 6. [Bug]: "Next episode" prompt often never appears, and can't come back once hidden

**Area:** Web client / player

**What happened?**
The next-episode button is created only when `Math.floor(currentTime)` is exactly equal to the trigger second. `timeupdate` fires roughly 4x/second but is not guaranteed to land on every whole second — after a seek, in a throttled background tab, or on a dropped frame the second is skipped and the prompt never shows. Once auto-hidden after 10s it also can't reappear, because the `useractive`/`userinactive` handlers test the *intro* window rather than the next-episode window.

**Steps to reproduce**
1. Play an episode that has `next_episode_time` set
2. Seek to just before the end of the episode
3. The "Next Episode" button usually never appears
4. When it does appear, wait 10s for it to hide, then move the mouse — it does not come back

**Expected behavior**
The prompt appears once playback passes the trigger point and stays available (or reappears on user activity) until the episode ends.

**Notes**
`src/components/video/videoPlayer.tsx:113` uses `===` where a `>=` plus an "already shown" flag is needed. `src/components/video/videoPlayer.tsx:138-156`: both handlers compare against `introStartTimeSeconds`/`introEndTimeSeconds` while operating on `nextButtonRef`. Also `src/components/video/videoPlayer.tsx:132` removes the button whenever `currentTime <= nextEpisodeDelay`, which fights the show logic on any rewind.

---

## 7. [Bug]: `VITE_DEFAULT_NEXT_EPISODE_OFFSET` is documented and shipped but never used

**Area:** Web client / player

**What happened?**
The README advertises a configurable next-episode offset, and the variable is present in `.env.example`, `.env.local`, `.env.production`, `src/env.ts` and `src/vite-env.d.ts` — but nothing reads it. The player only uses the per-episode `next_episode_time` returned by the API, so episodes without that field get an offset of `0` instead of the configured default.

**Steps to reproduce**
1. Set `VITE_DEFAULT_NEXT_EPISODE_OFFSET=15`
2. Play an episode whose API record has no `next_episode_time`
3. No next-episode prompt appears at 15s from the end

**Expected behavior**
`env.VITE_DEFAULT_NEXT_EPISODE_OFFSET` is used as the fallback when the episode has no explicit offset.

**Notes**
`src/env.ts:19` defines it; `src/pages/web/player/index.tsx:78` defaults `next_episode_time` to `""`, which `timeToSeconds` turns into `0` (`src/components/video/videoPlayer.tsx:13-19`). Either wire the fallback in or drop the variable from the docs and env files. Best fixed together with #6.

---

## 8. [Feature]: Add a CI workflow for lint, typecheck and build

**Area:** Docker / deployment

**What problem does this solve?**
There is no `.github/workflows/` at all, so nothing verifies a pull request. `CONTRIBUTING.md` asks contributors to run `npm run lint` and `npm run build`, but a PR that breaks either can still be merged.

**Proposed solution**
A workflow on `push` and `pull_request` that runs `npm ci`, `npm run lint`, `tsc --noEmit` and `npm run build` on Node 22 (matching the Dockerfile). A second job building the Docker image on pushes to `main` would catch Dockerfile drift too.

**Alternatives considered**
Relying on reviewers to run the commands locally, which is what happens today.

---

## 9. [Feature]: Self-host the placeholder images instead of hotlinking third-party services

**Area:** Web client / player

**What problem does this solve?**
A self-hosted install reaches out to the public internet to render its own UI. Missing artwork falls back to `placehold.co`, and the player's default poster points at `peach.blender.org`. On an air-gapped or LAN-only deployment those requests just hang and show broken images, and on a normal deployment they leak viewing activity to third parties.

**Proposed solution**
Ship a local placeholder poster/thumbnail in `src/assets/` and use it for all fallbacks.

**Notes**
`src/components/video/videoPlayer.tsx:66`, `src/components/video/videoCard.tsx:31,53`, `src/pages/web/player/index.tsx:42,118`.

---

## 10. [Feature]: Accessibility pass on the web client

**Area:** Web client / player

**What problem does this solve?**
The viewer-facing UI is hard to use with a keyboard or a screen reader. The whole `src/` tree has only 6 `alt`/`aria-*` attributes.

**Proposed solution**
- Give the dynamically created skip-intro and next-episode buttons `type="button"` and an `aria-label` (`src/components/video/videoPlayer.tsx:86-92`), and append them to the player's control bar so they are in the tab order.
- Give the carousel arrows an accessible name — they currently contain only the `‹` / `›` glyphs (`src/components/video/videoCard.tsx:91-99`).
- Make the season tabs a real tablist with arrow-key navigation (`src/pages/web/player/index.tsx:129-139`).
- Add visible focus styles in `src/index.css` for `.stream-card`, `.stream-season-tab` and the row arrows.

---

## 11. [Feature]: Remove dead code and leftover scaffolding

**Area:** Other

**What problem does this solve?**
Several files are placeholders or copy-paste leftovers, which makes the codebase harder to read for new contributors.

**Proposed solution**
- `src/pages/web/series/index.tsx` renders the literal string `hello` and is not exported from `src/pages/web/index.tsx` — delete it or implement it.
- `src/pages/admin/forms/demoForm.tsx` and `modalForm.tsx` are Ant Design demos with hardcoded "Demo" options.
- `console.log(playerRef.current)` at `src/components/video/videoPlayer.tsx:33`.
- `record.type === "tvshow"` branches copy-pasted into the Genres and Users tables, where rows have no `type` field and the branch can never render (`src/pages/admin/genres/list.tsx:55`, `src/pages/admin/users/list.tsx:87`).
- The commented-out role redirect in `src/components/authentication/protectedRoutes.tsx:18-21`.
- `/logout` is routed to `<ErrorPage />` (`src/main.tsx:51`).
- Missing `key` on the privilege tags at `src/pages/admin/users/list.tsx:69-71` (React console warning).

---

## 12. [Feature]: Keep the catalog hero and "Trending Now" row stable between renders

**Area:** Web client / player

**What problem does this solve?**
The hero title and the contents of the "Trending Now" row are picked with `Math.random()` during render, so they change on every re-render — including when the user just navigates back to the page. It reads like a glitch rather than a curated row.

**Proposed solution**
Memoise the selection per fetch (`useMemo` keyed on the video list), or better, drive "Trending" from real data. Sorting a copy with `() => Math.random() - 0.5` is also a biased shuffle; a Fisher–Yates helper would be more honest if randomness is kept.

**Notes**
`src/pages/web/movies/index.tsx:44-48`. The same fetch also swallows failures — `.then().finally()` with no `.catch()`, so an API error shows the "Nothing here yet" empty state instead of an error (`src/pages/web/movies/index.tsx:16-22`).
