# Repository Guidelines

## Project Structure & Module Organization
- `public/`: Frontend app (`index.html`, `assets/styles.css`, `assets/app.js`).
- `src/server/`: Backend Node modular (`config.js`, `app.js`, `routes/`, `storage/`, `http/`, `static/`).
- `docs/`: Product, architecture, local testing, deploy, and roadmap documentation.
- `tests/`: Backend tests (`*.test.js`) using Node test runner.
- `scripts/`: Smoke/local validation scripts.
- `ops/nginx/`: Local reverse-proxy config.
- `data/`: Runtime persistence (`maps.json` is generated runtime and ignored in git).

## Build, Test, and Development Commands
- `npm install`: Install project dependencies.
- `npm run dev`: Start app locally on `http://localhost:8080`.
- `npm run local:check`: Validate local host routing against `mapa.localhost:8080`.
- `npm run local:stack:up`: Start Docker local stack (`app + nginx`) on port `80`.
- `npm run local:stack:check`: Validate reverse proxy via `http://mapa.localhost`.
- `npm run local:stack:down`: Stop Docker local stack.
- `npm test`: Run unit tests.
- `npm run smoke`: API smoke check (`/api/health`, `/api/maps`) with app running.
- `git status` / `git diff`: Review local changes before committing.

## Coding Style & Naming Conventions
- UTF-8 + 2-space indentation (`.editorconfig`).
- JavaScript naming: `camelCase` for variables/functions, `UPPER_SNAKE_CASE` for constants.
- CSS naming: `kebab-case`.
- Keep domain logic out of route handlers; place persistence rules in `mapStore`.
- Preserve reciprocal/mirror behavior as a single-source rule (no duplicated mirror logic).

## Testing Guidelines
Use both automated and manual checks:
- Automated: maintain tests in `tests/` for storage and API behavior.
- Run `npm test` before every commit.
- Run `npm run smoke` after backend changes.
- Verify all modes: `Explorar`, `Editar minas`, `Marcar completado`, `Transformar mina`.
- Verify `Reflexionar bloque` and notes persistence.
- Confirm mirrored behavior: left/right cells update symmetrically when expected.
- Confirm counters update correctly (`Bloques explorados`, `Minas activas`).
- Test responsive layout around desktop and mobile breakpoints.

## Commit & Pull Request Guidelines
- Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`).
- PRs should include:
  - A clear summary of behavior changes.
  - Test evidence (`npm test`, manual checks).
  - Before/after screenshots or screen recordings for UI-impacting changes.
  - Linked issue or task reference when available.
