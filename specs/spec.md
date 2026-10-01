# Specification: Relationship Exploration Map (as built)

> A retrospective specification derived from the code at commit `34a6418` and the original documents. Status values: **Implemented**, **Partial**, **Not implemented**, **Divergent** (the code differs from the vision). See [intent.md](intent.md) for the "why" and [plan.md](plan.md) for the "how".

## 1. Glossary

| Term | Definition |
|---|---|
| Board | 11×11 grid. Column 5 is the **centre**; columns 0–4 belong to *Hombre* (left) and 6–10 to *Mujer* (right). |
| Mirror cell | For cell `(r, c)`, the cell `(r, 10 − c)`. |
| Theme / section | One of `confianza`, `comunicacion`, `intimidad`, `proyecto`, `limites`, at distance 1–5 from the centre respectively. |
| Situation | `{ label, text }` assigned to a mirrored pair. There are 55 in total. |
| Mine | A non-negotiable marked on a cell (`mine = true`, `disarmed = false`). |
| Direct / mirrored unlock | Unlocked by the cell owner's own move (solid colour) / unlocked because the opposite player unlocked the mirror cell (faint colour). |

## 2. Functional requirements: board and gameplay

| ID | Requirement | Acceptance criteria | Status | Evidence |
|---|---|---|---|---|
| REQ-BRD-01 | The board is a mirrored 11×11 grid with a shared centre column. | 121 cells are rendered; column 5 is styled as centre and starts unlocked and completed; columns 4 and 6 start unlocked. | Implemented | `app.js` `createCell`, `buildInitialBoard` |
| REQ-BRD-02 | Each side block shows a specific relationship situation, grouped by theme and distance. | 5 themes × 11 rows; both mirror cells share `label`, `text` and `section`; cells are tinted per theme. | Implemented | `SITUATION_LIBRARY`, `ZONES`, `.section-*` in `styles.css` |
| REQ-GAM-01 | Two players take alternating turns, starting with *Hombre*. | After a successful unlock or a skip, the turn indicator switches. Mine and reflect actions do not switch it. | Implemented | `nextTurn`, `describeTurn` |
| REQ-GAM-02 | A player may unlock only an orthogonally adjacent cell on their own side. | Clicking another side's cell, a non-adjacent cell or an active mine shows an error and changes nothing. | Implemented | `unlockCellForCurrentTurn`, `isOwnSide`, `isAdjacent` |
| REQ-GAM-03 | Unlocking asks for confirmation and explains the situation. | Clicking in `explore` mode opens a modal with the situation text and **Desbloquear / No realizar / Cerrar**; *Desbloquear* is disabled on active mines. | Implemented | `openModalForCell` |
| REQ-GAM-04 | **Mirror on unlock:** unlocking a cell also unlocks and completes its mirror, recorded as a mirrored unlock by the acting player (unless it was already unlocked directly). | Mirror cell becomes faint-coloured with `mirroredBy = <player>`. | Implemented | `applyMirror` in `unlockCellForCurrentTurn` |
| REQ-GAM-05 | The player token moves to the unlocked cell. | The 👨/👩 emoji renders on the new cell. | Implemented | `player.r/c` assignment |
| REQ-GAM-06 | "No realizar" (skip) records the block as reflected on both sides and passes the turn. | The cell and its mirror get the `reflected` class; the turn switches. | Implemented (no side/adjacency check) | `skipCellForCurrentTurn` |
| REQ-MIN-01 | In `mine` mode the current player toggles a mine on their own side; it is mirrored. | Both cells show 💣; placing a mine clears `completed` and unlock provenance on both. Toggling removes both. | Implemented | `handleCellClick` (mine branch) |
| REQ-MIN-02 | Mines can be **transformed** (reframed) by mutual agreement. | A transformed mine shows as `disarmed`, completed and unlocked on both sides. | **Not implemented** in the current UI (it exists in the prototype) | `archive/prototype/start.html`; `disarmed` is never set in `app.js` |
| REQ-REF-01 | In `reflect` mode any non-centre cell can be toggled as "reviewed", mirrored. | Both cells toggle `reflected`. | Implemented | `handleCellClick` (reflect branch) |
| REQ-UI-01 | Hovering or selecting a cell shows its reading: label, theme, situation, side, mine status, unlock provenance and note. | The **Detalle del bloque** panel updates on `mouseenter`. | Implemented | `explain`, `updateDetail` |
| REQ-UI-02 | Counters show explored blocks, active mines and reflected blocks. | Values update after every action (counted across both sides). | Implemented | `updateStats` |
| REQ-UI-03 | The exploration radar classifies each player's exploration style. | Shows actions, mirrored count, max depth, a relative bar, a style (Conservador/a, Intermedio/a, Aventurero/a) and a leader / balance message. | Implemented (heuristic) | `computeExplorationStats`, `classifyExploration` |
| REQ-UI-04 | Labels can be shown on all cells on demand. | **Mostrar etiquetas** toggles 3-letter labels. | Implemented | `hintsBtn` handler |
| REQ-UI-05 | Onboarding and in-app guide. | An intro modal opens on load; an extended guide (manual, docs cards, research note, SVG galleries) can be shown or hidden and is collapsed by default on mobile. | Implemented | `index.html`, `setKnowledgeVisible` |
| REQ-UI-06 | Responsible-use disclaimer is always visible. | The "Uso responsable" panel states it neither diagnoses nor replaces therapy. | Implemented | `index.html` |
| REQ-UI-07 | Players are named Person A / Person B (neutral), as in the vision. | n/a | **Divergent**: the UI hard-codes *Hombre* / *Mujer* | `index.html`, `currentMapPayload` |
| REQ-NOT-01 | A free-text note can be attached to any cell. | **Guardar nota local** stores it in memory; **Limpiar nota** removes it; the note shows in the detail panel; it persists only when the map is saved. | Implemented | `saveCurrentNote`, `clearCurrentNote` |

## 3. Functional requirements: persistence and API

| ID | Requirement | Acceptance criteria | Status | Evidence |
|---|---|---|---|---|
| REQ-API-01 | Health endpoint. | `GET /api/health` → 200 `{status:"ok", service, now}`; the UI shows "OK <timestamp>" or "Sin conexion". | Implemented | `routes/api.js`, `checkHealth` |
| REQ-API-02 | List saved maps. | `GET /api/maps` → `{items:[{id,title,people,createdAt,updatedAt}]}` newest first; the UI fills **Mapas guardados**. | Implemented | `listSummaries`, `refreshMaps`; test `list summaries…` |
| REQ-API-03 | Create a map. | `POST /api/maps` → 201 with a UUID and timestamps; the UI stores the ID and shows it. | Implemented | `create`, `saveMap`; test `create map…` |
| REQ-API-04 | Load a map by ID. | `GET /api/maps/:id` → 200 or 404; the UI loads by typed ID or from the list. | Implemented | `getById`, `loadMap` |
| REQ-API-05 | Update a map. | `PUT /api/maps/:id` keeps `id` and `createdAt`, refreshes `updatedAt`; 404 if missing. | Implemented | `update`; test `update map…` |
| REQ-API-06 | Unknown API routes and methods are rejected with JSON errors. | 404 for unknown `/api/*`, 405 for unsupported methods on a map, 405 for non-GET static requests. | Implemented | `routes/api.js`, `app.js` |
| REQ-PER-01 | Input is normalised and bounded on the server. | Title ≤ 120, people ≤ 80, notes ≤ 1200 with `r,c` keys, size clamped to 3–31, cells ≤ size², mode whitelisted with fallback `explore`. | Implemented | `normalizeMapInput`; test `notes are sanitized…` |
| REQ-PER-02 | Writes are atomic. | Data is written to `maps.json.tmp` and then renamed. | Implemented | `writeAll` |
| REQ-PER-03 | The data file is created automatically and excluded from git. | `ensureStore` creates `[]`; `.gitignore` has `data/maps.json`. | Implemented | `mapStore.js`, `.gitignore` |
| REQ-PER-04 | A saved map restores the **full** game state. | After reload: same turn, token positions, direct/mirrored unlock provenance and radar values. | **Partial**: the server drops `turn`, `players`, `directUnlocked`, `mirroredUnlocked`, `mirroredBy`, `section` | `normalizeCell` / `normalizeBoardState` vs `boardPayload` |
| REQ-PER-05 | Export a map as JSON or PDF. | n/a | Not implemented | Vision §13.2, roadmap Phase 3 |
| REQ-PER-06 | Compare sessions over time. | n/a | Not implemented | Vision §9.5, roadmap Phase 3 |

## 4. Non-functional requirements

| ID | Requirement | Status | Evidence |
|---|---|---|---|
| NFR-01 | No third-party runtime dependencies; Node ≥ 18. | Implemented | `package.json`, `package-lock.json` |
| NFR-02 | Request bodies are limited to 1 MB (413 above that). | Implemented | `config.maxBodySize`, `readJsonBody` |
| NFR-03 | Static serving is protected against path traversal. | Implemented | `serveStatic.resolvePath` |
| NFR-04 | API responses are not cached (`Cache-Control: no-store`). | Implemented | `send.js`, `serveStatic.js` |
| NFR-05 | Configurable host and port; `APP_PORT` takes priority over `PORT`. | Implemented | `config.js` |
| NFR-06 | Responsive layout for desktop and mobile (breakpoints 1100 px and 760 px; cell size 28–48 px). | Implemented | `styles.css`, `updateResponsiveBoardSize` |
| NFR-07 | HTTPS and security headers in production. | Implemented at the edge (Traefik) | `docs/original/DEPLOYMENT_ARCHITECTURE_PROD.md` |
| NFR-08 | Secret scanning of the working tree and history. | Implemented | `scripts/security-scan.js` |
| NFR-09 | Rate limiting, structured logs, backups, uptime monitoring. | Not implemented | Roadmap Phase 2 |
| NFR-10 | Authentication or private links. | Not implemented | Roadmap Phase 3 |
| NFR-11 | User-provided text is rendered safely. | **Partial**: notes are inserted into `innerHTML` in `explain()` | `app.js` |

## 5. Verification

| Check | Command or procedure | Covers |
|---|---|---|
| Unit tests | `npm test` (4 tests) | REQ-API-02/03/05, REQ-PER-01 |
| Smoke | `npm run smoke` with the server running | REQ-API-01/02 |
| Host routing | `npm run local:check` / `npm run local:stack:check` | REQ-API-01, static home page |
| Secrets | `npm run security:scan` | NFR-08 |
| Manual | The checklist in `AGENTS.md` and [`docs/original/QUALITY_CHECKLIST.md`](../docs/original/QUALITY_CHECKLIST.md): every mode, mirror symmetry, counters, notes persistence, responsive layout | REQ-GAM-*, REQ-MIN-01, REQ-REF-01, REQ-UI-*, REQ-NOT-01 |

The automated tests cover none of the gameplay requirements (REQ-GAM-*). They are verified manually only.
