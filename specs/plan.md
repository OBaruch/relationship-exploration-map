# Plan: Relationship Exploration Map

> **Part A** reconstructs the implementation plan **as it was executed**, from git history. **Part B** lists the **pending** work from the original roadmap. Nothing in Part B has been implemented. Requirement IDs refer to [spec.md](spec.md).

## Technical approach (as chosen)

- **Stack:** vanilla HTML/CSS/JS frontend and a Node.js built-in `http` server (CommonJS), with no dependencies.
- **Rules live in the client.** All gameplay runs in `public/assets/app.js`. The server is a thin, validating persistence API.
- **One mirror rule.** Every reciprocal update goes through `applyMirror` (an `AGENTS.md` convention).
- **File persistence.** A single JSON array in `data/maps.json` with atomic writes. The store is a separate module (`mapStore`), so a database could replace it later without changing the API.
- **Deployment.** A single container or process behind a reverse proxy (Nginx locally, Traefik in production).

## Part A: Phases as executed

| Phase | Date | Commit(s) | Deliverables | Requirements |
|---|---|---|---|---|
| 0. Concept and prototype | 2026-03-04 | `279b53a` | `objetivo.md` vision; single-file `start.html` prototype with four modes, proximity unlocking and mine transformation | Vision; REQ-MIN-02 (prototype only) |
| 1. MVP architecture | 2026-03-05 | `d0201d1` | Split into `public/` + `src/server/` (config, app, routes, http, static, storage); REST API; JSON store with normalisation and atomic writes; 4 unit tests; README, AGENTS.md, ARCHITECTURE, DEPLOY_VPS, QUALITY_CHECKLIST, ROADMAP_MVP | REQ-API-01…06, REQ-PER-01…03, NFR-01…04 |
| 2. Local VPS-like environment | 2026-03-05 | `2cf5ee6`, `a8d8fb6`, `bd278e1` | Dockerfile, Compose (app + Nginx), `ops/nginx/local.conf`, `scripts/local-check.js`, LOCAL_TESTING, Wix subdomain manual; vision text update | Operations |
| 3. Stabilisation and turn-based play | 2026-03-06 | `503145b` (PR #1) | `APP_PORT` priority; `scripts/security-scan.js`; gameplay changed to alternating turns, adjacency moves, unlock modal, skip, mine and reflect modes | NFR-05, NFR-08, REQ-GAM-01…06, REQ-MIN-01, REQ-REF-01 |
| 4. Onboarding and content | 2026-03-06 | `ee1beaf` | Intro modal, game manual, docs cards, SVG galleries (relationship types, attachment styles) | REQ-UI-05 |
| 5. Mobile UX | 2026-03-06 | `3f3e1ab` | Responsive cell size, collapsible guide, layout breakpoints | NFR-06 |
| 6. Situations library | 2026-03-07 | `d73a568` | 55 situations across 5 themes, theme tints, COUPLE_SITUATIONS_RESEARCH | REQ-BRD-02 |
| 7. Exploration analytics | 2026-03-07 | `dd59057`, `a63adcc` | Direct vs mirrored unlock provenance, exploration radar, centre-column styling | REQ-GAM-04, REQ-UI-03 |
| 8. Production deployment | 2026-03-17 | `34a6418` | Running on `relaciones.baruchlopez.com` behind Traefik + Let's Encrypt; deployment docs and comic | NFR-07 |
| 9. Repository reorganization | 2026-10 | this change | English README and docs, retrospective intent/spec/plan, original docs moved to `docs/original/`, prototype restored in `archive/`. **No source code changes.** | n/a |

### Gaps the executed plan left open

- REQ-PER-04: the server whitelist was written in Phase 1, **before** Phase 3 and Phase 7 added `turn`, `players` and the unlock-provenance fields, and it was never updated.
- REQ-MIN-02: mine transformation was dropped in Phase 3.
- REQ-UI-07: neutral player names were replaced by *Hombre* / *Mujer* in Phase 3.
- `AGENTS.md` still describes the Phase 0 modes.

## Part B: Pending roadmap (from `ROADMAP_MVP.md`, not implemented)

Each item below needs a spec entry and acceptance criteria before any implementation, following [specs/README.md](README.md).

### Phase 1: initial production (original estimate: 1 week)

Done in practice (Part A, Phase 8), but on Traefik + Docker instead of the planned systemd/pm2 + Nginx + Certbot.

### Phase 2: stability and basic security (original estimate: 1–2 weeks)

| Task | Related |
|---|---|
| Rate limiting per IP | NFR-09 |
| Structured logs with rotation | NFR-09 |
| Daily backups of `data/maps.json`, with a tested restore | NFR-09, intent success criteria |
| Stronger validation and sanitisation (including safe rendering of notes) | NFR-11 |
| Uptime monitoring that polls `/api/health` | NFR-09 |

### Phase 3: product evolution (original estimate: 2–4 weeks)

| Task | Related |
|---|---|
| Move persistence to SQLite or PostgreSQL behind the `mapStore` interface | Technical approach |
| Authentication or private per-session links | NFR-10 |
| Export a map as JSON or PDF | REQ-PER-05 |
| Session history and version comparison | REQ-PER-06 |
| Guided module with per-block questions for therapeutic use | Vision §13.3 |

### Candidate fixes from the documentation review

These come from [`docs/possible-improvements.md`](../docs/possible-improvements.md) and are only proposals. Each needs a decision before it is scheduled, because it changes the original implementation.

1. Persist the full game state (REQ-PER-04).
2. Decide whether mine transformation and neutral player names come back (REQ-MIN-02, REQ-UI-07).
3. Escape note text before rendering it (NFR-11).
4. Add API and gameplay tests.
5. Update `AGENTS.md` to match the current modes.
