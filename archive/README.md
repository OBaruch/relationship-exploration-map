# Archive

Earlier versions of the project, kept for historical context. Nothing in this folder is used by the running application.

## `prototype/start.html`

- **Source:** the file `start.html` from the repository's first commit (`279b53a`, "init", 2026-03-04).
- **Status:** removed from the working tree in commit `d0201d1` ("refactor: restructure project architecture for MVP quality"), when the project became the Node.js app under `src/` and `public/`. It was restored here, **byte-for-byte**, from git history during the repository reorganization.
- **What it is:** a single-file, client-only prototype of the "Mapa Relacional Interactivo" board (inline CSS and JavaScript, no backend, no persistence).

### Observations (confirmed by reading the file)

- The file starts with `html = r'''` and ends with `</html>` (the closing `'''` is missing), so it is not a valid HTML file as stored. The content was most likely copied out of a Python string literal. *Inferred:* the prototype was generated or embedded from a Python script. That script is not in the repository.
- It has four interaction modes: **Explorar**, **Editar minas**, **Marcar completado** and **Transformar mina**. These names still appear in [`AGENTS.md`](../AGENTS.md), and the backend still accepts `complete` and `transform` as valid `mode` values (`src/server/storage/mapStore.js`). The current UI, however, has only `explore`, `mine` and `reflect`. See [docs/project-context.md](../docs/project-context.md#evolution-of-the-game-mechanics).
- Board: 11×11 with a shared centre column. 15 themed zones (for example *Confianza*, *Rutina*, *Vulnerabilidad*, *Celos*, *Secretos*, *Control*, *Traición*, *Reparación*) are placed at a given row and distance from the centre, and mirrored left/right. The remaining blocks have no label.
- Unlocking is by proximity: completing a block unlocks its neighbours that are at most one step farther from the centre, together with their mirror blocks.
- It includes animated 7×7 "mini boards" for the four attachment styles (secure, anxious, avoidant, disorganized). It also has static 9×9 example maps of "mature" relationships (stable, in repair, highly explorative).

### Viewing it

To open the prototype in a browser, make a local copy and delete the leading `html = r'''` line. The archived file itself is left unchanged on purpose.
