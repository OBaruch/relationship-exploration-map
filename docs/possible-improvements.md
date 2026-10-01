# Possible Improvements

> **These improvements have NOT been applied.** The repository keeps the original implementation unchanged on purpose, to preserve its historical context. This file only records observations made while documenting the project. Each item says whether it was **Confirmed** (reproduced or read directly in the code) or **Inferred**.

## Functional gaps and bugs

| # | Observation | Evidence | Status |
|---|---|---|---|
| 1 | **Saving and reloading loses game state.** `normalizeBoardState` / `normalizeCell` drop `turn`, `players`, `directUnlocked`, `mirroredUnlocked` and `mirroredBy`. After a reload, both tokens return to the start, the turn resets to *Hombre*, and the exploration radar shows zero actions. | `src/server/storage/mapStore.js` vs `boardPayload()` in `app.js`; reproduced with a `POST` to a running server | Confirmed |
| 2 | **Mine transformation is unreachable.** The vision and the prototype support "Transformar mina", but the current UI never sets `disarmed = true`. | `app.js`, `archive/prototype/start.html` | Confirmed |
| 3 | **Mode lists disagree.** Backend modes `complete` and `transform` are no longer offered by the UI. `AGENTS.md` still describes the prototype's modes and counters. | `mapStore.js`, `index.html`, `AGENTS.md` | Confirmed |
| 4 | **Skipping ignores movement rules.** "No realizar" marks any clicked cell (either side, any distance) as reflected and passes the turn. | `skipCellForCurrentTurn` | Confirmed |
| 5 | **Counters double-count mirrored pairs.** Each unlock or mine increases *Explorados* or *Minas activas* by 2. | `updateStats` | Confirmed (it may be intentional) |
| 6 | **Hard-coded gendered players.** The vision uses neutral Person A / Person B, and the backend defaults to them, but the UI hard-codes *Hombre* / *Mujer* in read-only fields and in the save payload. | `index.html`, `currentMapPayload()` | Confirmed |
| 7 | Port default drift: `8080` in the repository vs `3000` in production. | `DEPLOYMENT_ARCHITECTURE_PROD.md` | Confirmed (documented in the original) |
| 8 | The archived prototype starts with `html = r'''`, so it does not render correctly as stored. | `archive/prototype/start.html` | Confirmed |

## Security

| # | Observation | Status |
|---|---|---|
| 9 | **Stored XSS risk.** `explain()` inserts the note text into `innerHTML`. A saved note that contains HTML runs in the browser of anyone who loads that map ID. | Confirmed in code (not exploited) |
| 10 | **No authentication or authorisation.** Anyone who can reach the server can list every map (`GET /api/maps`) and overwrite any map by ID (`PUT`). For relationship notes, this is sensitive personal data. | Confirmed |
| 11 | The `500` handler in `app.js` returns `error.message` as `detail` to the client. | Confirmed |
| 12 | There is no rate limiting. The roadmap already lists it for Phase 2. | Confirmed |

## Robustness and scalability

| # | Observation | Status |
|---|---|---|
| 13 | Synchronous read-all/write-all on every request, with no locking. Concurrent saves are last-write-wins, and the event loop blocks while the file grows. | Confirmed |
| 14 | A corrupt `maps.json` is silently treated as empty, and the next write overwrites it, losing the data. | Confirmed |
| 15 | `restoreBoard` replaces `appState.players` with the saved object without validating it. | Confirmed |
| 16 | `render()` rebuilds 121 buttons and their listeners on every change. This is fine at this size, but wasteful. | Confirmed |

## Testing and tooling

| # | Suggestion |
|---|---|
| 17 | Add API-level tests (status codes, 413/400/404/405) and tests for the frontend rules (turn, adjacency, mirror). Today only `mapStore` is tested. |
| 18 | Move the game rules into a pure module that the browser and tests can both use, keeping the single-source mirror rule. |
| 19 | Bring `AGENTS.md` up to date with the current modes and counters. |

## Product roadmap items (from the original `ROADMAP_MVP.md`, not implemented)

- Phase 2: rate limiting, structured logs and rotation, daily backups of `data/maps.json`, stronger validation, uptime monitoring.
- Phase 3: SQLite/PostgreSQL, authentication or private links, JSON/PDF export, session history and comparison, a guided therapeutic module.
