# Original Documentation (Spanish)

This folder keeps the documentation written during the original development of the project, **unchanged**. The files are in Spanish. They were moved here from the repository root and from `docs/` when the repository was reorganized; their content was not edited.

English summaries of these documents live one level up, in [`docs/`](../README.md).

| File | Original location | What it contains | English summary |
|---|---|---|---|
| [`README.original.md`](README.original.md) | `/README.md` | The original project README: tech stack, commands, API list, VPS deploy summary. | [README](../../README.md) |
| [`objetivo.md`](objetivo.md) | `/objetivo.md` (first commit), later `docs/objetivo.md` | Product purpose, conceptual vision and narrative specification ("Mapa Relacional Interactivo"). The most important source of project context. | [product-vision.md](../product-vision.md) |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | `docs/` | Three-layer technical architecture and data contract. | [architecture.md](../architecture.md) |
| [`COUPLE_SITUATIONS_RESEARCH.md`](COUPLE_SITUATIONS_RESEARCH.md) | `docs/` | Sources and reasoning behind the 55 relationship situations on the board. | [research-basis.md](../research-basis.md) |
| [`ROADMAP_MVP.md`](ROADMAP_MVP.md) | `docs/` | MVP scope and a three-phase roadmap. | [../specs/plan.md](../../specs/plan.md) |
| [`QUALITY_CHECKLIST.md`](QUALITY_CHECKLIST.md) | `docs/` | Code, frontend, backend and operations quality checklist. | [../specs/spec.md](../../specs/spec.md) |
| [`LOCAL_TESTING.md`](LOCAL_TESTING.md) | `docs/` | Running locally with Node only, or with Docker + Nginx and a local subdomain. | [operations.md](../operations.md) |
| [`DEPLOY_VPS.md`](DEPLOY_VPS.md) | `docs/` | Generic VPS deployment with systemd, Nginx and Certbot. | [operations.md](../operations.md) |
| [`DEPLOYMENT_ARCHITECTURE_PROD.md`](DEPLOYMENT_ARCHITECTURE_PROD.md) | `docs/` | The production deployment that was actually observed (Docker + Traefik). | [operations.md](../operations.md) |
| [`ARCHITECTURE_COMIC.md`](ARCHITECTURE_COMIC.md) | `docs/` | A short "comic" and Mermaid diagram of a request's path through production. | [operations.md](../operations.md) |
| [`WIX_SUBDOMINIO_MANUAL.md`](WIX_SUBDOMINIO_MANUAL.md) | `docs/` | A form listing the details needed to point a Wix-managed subdomain at the VPS. | [operations.md](../operations.md) |

## Notes

- The relative links inside `README.original.md` (for example `docs/objetivo.md`) point to the **pre-reorganization** layout, so they no longer resolve. They were left as-is on purpose to keep the file unchanged.
- `objetivo.md` starts with a heading that has no `#` marker (` Mapa Relacional Interactivo`). This is how the original file was written.
