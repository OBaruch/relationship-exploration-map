# Repository Guidelines

## Project Structure & Module Organization
- `public/`: Frontend static app served by Node (`index.html`, `assets/styles.css`, `assets/app.js`).
- `src/server/`: Backend HTTP modular:
  - `config.js` for runtime settings.
  - `routes/api.js` for API routing.
  - `storage/mapStore.js` for map persistence.
  - `static/serveStatic.js` for static file serving.
- `docs/`: Product and planning docs (`objetivo.md`, `ROADMAP_MVP.md`).
- `tests/`: Node test runner specs (`*.test.js`).
- `data/`: Runtime persistence (`maps.json`, ignored in git except folder marker).

## Build, Test, and Development Commands
- `npm install`: Install dependencies (none external now, keeps workflow standard).
- `npm run dev`: Start local server on `http://localhost:8080`.
- `npm start`: Start production server.
- `npm test`: Run backend unit tests (`node --test`).
- `npm run smoke`: Basic API smoke check (`/api/health`, `/api/maps`) with server running.
- `git status` / `git diff`: Review local changes before committing.

## Coding Style & Naming Conventions
- UTF-8 + 2-space indentation (`.editorconfig`).
- JavaScript naming: `camelCase` for variables/functions, `UPPER_SNAKE_CASE` for constants.
- CSS naming: `kebab-case`.
- Keep domain logic out of route handlers; place persistence rules in `mapStore`.
- Preserve reciprocal/mirror behavior as a single-source rule (no duplicated mirror logic).

## Testing Guidelines
Use both automated and manual checks:
- Automated: add/maintain tests in `tests/` for storage and API behavior.
- Verify all modes: `Explorar`, `Editar minas`, `Marcar completado`, `Transformar mina`.
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
