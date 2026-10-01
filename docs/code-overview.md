# Code Overview

What each important file does, described **without changing it**. Line counts are approximate.

## Repository map

| Path | Kind | Notes |
|---|---|---|
| `public/index.html` (~290) | Frontend markup | Hero, controls, board, side panels, extended guide, two `<dialog>`s. Spanish UI (`lang="es"`). |
| `public/assets/app.js` (~870) | Frontend logic | All game rules, rendering, analytics and the API client. |
| `public/assets/styles.css` (~670) | Frontend styles | Dark theme, CSS custom properties, theme tints per section, breakpoints at 1100 px and 760 px. |
| `public/assets/images/*.svg` (6) | Illustrations | Mini boards for attachment styles (`apego-*.svg`) and relationship types (`relacion-*.svg`), used in the in-app guide. |
| `server.js` | Entry point | `require("./src/server/index")`. |
| `src/server/**` | Backend | See [architecture.md](architecture.md#backend-modules). |
| `tests/map-store.test.js` | Unit tests | 4 tests for `mapStore` using `node:test`. |
| `scripts/smoke.js` | Ops script | Checks `/api/health` and `/api/maps` against a running server (`BASE_URL` or `APP_PORT`). |
| `scripts/local-check.js` | Ops script | Sends `Host: mapa.localhost` to `127.0.0.1:<port>`; checks health and that the home page contains "Mapa Relacional Interactivo". `--port` overrides the port. |
| `scripts/security-scan.js` | Ops script | A regex-based secret scanner for the working tree (and git history with `--history`). Exits 1 if it finds anything. |
| `Dockerfile`, `docker-compose.local.yml`, `ops/nginx/local.conf` | Infra | Local VPS-like stack. |
| `.env.example` | Config | `HOST=0.0.0.0`, `PORT=8080`. |
| `AGENTS.md` | Contributor/agent guidelines | Original; partly outdated (see [project-context.md](project-context.md#evolution-of-the-game-mechanics)). |
| `archive/prototype/start.html` | Historical | First prototype, restored from git history. |

## Frontend: `public/assets/app.js`

### Board construction

- `SIZE = 11` and `CENTER = 5`. Column 5 is the shared centre.
- `SITUATION_LIBRARY[section][row]` → `ZONES` entries `{ r, d, key, label, section, text }`. `d` is the distance from the centre (1 = `confianza` … 5 = `limites`).
- `buildInitialBoard()` creates 121 cells with `createCell` and writes each zone into columns `CENTER - d` and `CENTER + d`.
- Initial state: the centre column is `unlocked` and `completed`, and the columns next to it (4 and 6) are `unlocked`.

### Players and turns

- `appState.players.male` starts at `(5, 4)` and `female` at `(5, 6)`.
- `appState.turn` alternates `"male"` → `"female"` after every unlock or skip (`nextTurn`).
- The left half belongs to *Hombre* and the right half to *Mujer* (`ownerForCell`, `isOwnSide`).

### Interaction by mode (`#toolMode`)

| Mode | Value | What a click does |
|---|---|---|
| Desbloquear por turnos | `explore` | Opens `#blockModal` with the situation text. **Desbloquear** → `unlockCellForCurrentTurn`. **No realizar** → `skipCellForCurrentTurn`. |
| Marcar no negociable (mina) | `mine` | Toggles a mine on a cell on the current player's side, mirrored. Placing a mine clears completion and unlock provenance on both cells. Does **not** pass the turn. |
| Solo revisar bloques | `reflect` | Toggles `reflected` on the cell and its mirror. Does not pass the turn. |

Clicking the centre only selects it. Hovering selects a cell and shows its explanation (`explain`) in **Detalle del bloque**.

### Unlock rule (`unlockCellForCurrentTurn`)

It rejects the move, with a status message, unless:

1. the cell is on the current player's side,
2. it is orthogonally adjacent (Manhattan distance 1) to that player's token, and
3. it is not an active mine.

If the move is valid, the cell becomes `completed`, `unlocked` and `directUnlocked`. Its mirror becomes `completed` and `unlocked`, and is marked `mirroredUnlocked` / `mirroredBy` unless it was already unlocked directly. The token moves onto the cell and the turn passes.

### Skip rule (`skipCellForCurrentTurn`)

Marks the cell and its mirror as `reflected`, and passes the turn. The token does not move. Adjacency and side are **not** checked in this path.

### Mirroring

All mirror updates go through `applyMirror(cell, updater)` using `mirrorCol(c) = SIZE - 1 - c`. This is the "single-source mirror rule" that `AGENTS.md` asks for.

### Counters and exploration radar

- `updateStats`: **Explorados** (completed non-centre cells, *both* sides, so one unlock counts as 2), **Minas activas** (also counted on both sides), **Reflexionados**.
- `computeExplorationStats(player)` on the player's own half: `actions` (direct unlocks), `mirrored`, `maxDepth`, `avgDepth`; `score = actions·2 + avgDepth·2.5 + maxDepth·1.5`.
- `classifyExploration`: no actions → "Conservador/a (sin explorar aún)"; `maxDepth ≥ 4` or `score ≥ 16` → "Aventurero/a"; `maxDepth ≤ 2` and `actions ≤ 2` → "Conservador/a"; anything else → "Intermedio/a".
- Leader text: "equilibrio" if the score difference is under 0.85, otherwise whoever scores higher.

### Rendering classes

`render()` gives each cell `<button>` its classes: `cell`, `section-<theme>`, and then `center`, `unlocked`, `blocked`, `mine`, `disarmed`, `reflected`, `selected`, `direct-male|female` (solid colour), `mirrored-soft` + `mirror-from-*` (faint colour), or `completed`. Cell text is a player emoji, 💣, or the first 3 letters of the label (when hints are on or the cell is completed).

### Persistence (client side)

- `currentMapPayload()` sends `title`, hard-coded `people` (`Hombre` / `Mujer`), `mode`, `boardState` (`boardPayload()`, which includes turn, players and every cell field) and `notes`.
- `saveMap()` sends a `POST` the first time, then a `PUT` to `/api/maps/:id`.
- `loadMap(id)` rebuilds the board (`restoreBoard`) by merging the saved cells over a fresh board.
- Notes are saved locally with **Guardar nota local** and are only persisted when the map is saved.

### Responsive behaviour

`updateResponsiveBoardSize()` sets `--cell-size` (28–48 px) from the container width. On viewports ≤ 760 px the extended guide starts collapsed (`setKnowledgeVisible`), unless the user has toggled it.

## Backend: `src/server/storage/mapStore.js`

- `MODES = { explore, mine, complete, transform, reflect }`.
- `truncateText`, `normalizePeople`, `normalizeNotes` (keys must match `^\d{1,2},\d{1,2}$`), `normalizeCell`, `normalizeBoardState` and `normalizeMapInput` together form the whitelist and limits described in [architecture.md](architecture.md#data-model-as-stored).
- `createMapStore({ filePath })` is a closure-based store with read-all / write-all JSON semantics and an atomic rename.

## Tests: `tests/map-store.test.js`

| Test | Checks |
|---|---|
| create map applies defaults and stores record | id generated; title and people kept; `mode` defaults to `explore` |
| update map modifies title and keeps identity fields | `id` and `createdAt` preserved; title and mode updated |
| list summaries returns records sorted by updatedAt desc | sort order after an update |
| notes are sanitized and empty values are removed | invalid keys and blank notes dropped |

There are no tests for the HTTP layer, static serving or frontend logic.

## Observed dependencies

- **Runtime:** Node.js ≥ 18 (`engines`), built-in modules only (`http`, `fs`, `path`, `crypto`, `child_process`). `package-lock.json` lists no third-party packages.
- **Browser:** `fetch`, `<dialog>`, `matchMedia`, optional chaining.
- **Infra (optional):** Docker, `node:20-alpine`, `nginx:1.27-alpine`. Traefik in production.
