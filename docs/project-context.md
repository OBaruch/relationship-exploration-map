# Project Context

> Evidence labels used in this document:
> **Confirmed**: backed directly by files, code or git history in this repository.
> **Inferred**: a reasonable deduction from the available material.
> **Unknown**: the repository does not provide enough information to determine it.

## Classification

**Project origin: Personal Project** (with Proof of Concept / MVP characteristics)

Evidence:

- **Confirmed:** the product vision document ([`original/objetivo.md`](original/objetivo.md), §10) says the tool "nace desde una intuición muy personal y emocional" ("comes from a very personal and emotional intuition").
- **Confirmed:** the production deployment notes ([`original/DEPLOYMENT_ARCHITECTURE_PROD.md`](original/DEPLOYMENT_ARCHITECTURE_PROD.md)) name the author's personal domain `relaciones.baruchlopez.com`.
- **Confirmed:** the roadmap ([`original/ROADMAP_MVP.md`](original/ROADMAP_MVP.md)) frames the work as an **MVP** meant to be published on a VPS.
- **Confirmed:** nothing in the repository mentions a university, a course, an assignment, a grade or a deadline. There is no evidence that this is academic work.

## What the project is

**Mapa Relacional Interactivo** ("Interactive Relationship Map") is a web app that represents a romantic relationship as a **mirrored game board**, loosely inspired by *Minesweeper* (the Windows XP game is named in the vision document). It is meant as a conversation and self-reflection tool for couples. It is **not** a clinical or diagnostic instrument, and the app and its docs say so explicitly.

Core metaphor (Confirmed, from `objetivo.md`):

- **The centre column** is the relationship's secure base (attachment, belonging, the "us").
- **Left side** is Person A and **right side** is Person B. In the current UI they are labelled *Hombre* (man) and *Mujer* (woman).
- **Distance from the centre** stands for autonomy, novelty, complexity and perceived risk.
- **Mirroring** stands for reciprocity: *"if something applies to one, it applies to both."* Placing a mine, or unlocking or reflecting on a block, on one side affects the mirror block on the other side.
- **Mines** are non-negotiables, triggers or wounds. **Transformed mines** are former limits that the couple worked through by mutual agreement.
- **Attachment styles** (secure, anxious, avoidant, disorganized) are shown as characteristic exploration patterns on the board.

## Problem statement

**Confirmed** (from `objetivo.md` §3): people often rely on simplistic verbal or moral models of relationships (for example "if they loved me they wouldn't want space"). They lack clear "maps" for telling apart:

- healthy exploration vs. real threat,
- autonomy vs. abandonment,
- intimacy vs. fusion,
- real non-negotiables vs. unprocessed fears,
- conscious agreements vs. inherited, unexamined limits.

The project tries to turn these dynamics into a **visual cartography** that a couple can point at and talk about ("I feel you've opened that block and I haven't").

## Objective

**Confirmed** (from `objetivo.md` and `ROADMAP_MVP.md`):

1. Make attachment, reciprocity, non-negotiables, relational exploration and maturity **visible, understandable and playable**.
2. Ship a public MVP on a VPS where a couple can create a map, play on the board (explore / mines / reflect), add notes per block, and save and reload sessions.

## Timeline (from git history)

| Date | Author (as recorded in git) | Change |
|---|---|---|
| 2026-03-04 | Baruch López | `init`: `objetivo.md` (vision) and `start.html` (single-file prototype, now in [`archive/prototype/`](../archive/README.md)). |
| 2026-03-05 | Baruch López | Restructured into a Node.js backend and static frontend; added README, AGENTS.md, architecture/deploy/roadmap docs, tests. |
| 2026-03-05 | Baruch López | Local VPS-like stack (Docker + Nginx), local subdomain check, Wix subdomain manual. |
| 2026-03-06 | Baruch Lopez | PR #1: stabilised port handling (`APP_PORT`), added the security scan script, reworked the game into alternating turns. |
| 2026-03-06 | Alpha (OpenClaw) | Onboarding pop-up, in-app game manual, SVG galleries of relationship and attachment types; mobile layout. |
| 2026-03-07 | Alpha (OpenClaw) | 55 specific relationship situations across 5 themes; exploration "radar" analytics; centre-column styling. |
| 2026-03-17 | root (VPS host) | Production deployment notes and architecture comic. |

**Inferred:** the git identities *Alpha (OpenClaw)* and *root* (on a Hostinger VPS host name) look like automation or server-side identities used during development and deployment, not separate human contributors. The repository does not say who operated them.

## Evolution of the game mechanics

The repository has **two generations** of game rules. This explains some inconsistencies in the current files.

| Aspect | Prototype (`archive/prototype/start.html`) | Current app (`public/assets/app.js`) |
|---|---|---|
| Modes | Explorar, Editar minas, Marcar completado, Transformar mina | Desbloquear por turnos (`explore`), Marcar no negociable (`mine`), Solo revisar bloques (`reflect`) |
| Players | None (free clicking) | Two tokens (👨 / 👩) that alternate turns and move one orthogonal step at a time on their own side |
| Unlocking | Proximity-based cascade | The player's move plus a mirror unlock ("solid" vs. "soft" colour) |
| Block content | 15 themed zones | 55 situations × 2 mirrored sides = 110 blocks, grouped into 5 themes |
| Mine transformation | Implemented | **Not reachable** from the current UI (the `disarmed` flag exists but nothing sets it to `true`) |
| Persistence | None | JSON file through a REST API |

**Confirmed inconsistencies that were left unchanged:**

- `AGENTS.md` still lists the prototype's modes (`Explorar`, `Editar minas`, `Marcar completado`, `Transformar mina`) and a `Bloques explorados` counter. The current UI shows `Explorados`, `Minas activas`, `Reflexionados`.
- The backend accepts `mode` values `explore`, `mine`, `complete`, `transform` and `reflect`. The frontend uses only `explore`, `mine` and `reflect`.
- The vision document uses neutral "Persona A / Persona B". The current UI hard-codes "Hombre" / "Mujer" (read-only fields). The backend still defaults to "Persona A" / "Persona B".
- Port: the project files default to `8080`. Production was observed running on `3000` (noted in `DEPLOYMENT_ARCHITECTURE_PROD.md`).

## Scope

- **In scope (implemented):** the mirrored board, turns, mines, reflect/skip, notes per block, exploration radar, save/load of maps, health endpoint, local and production deployment notes, a few storage unit tests, a secret scanner.
- **Out of scope / not implemented:** authentication, a database, PDF export, session comparison, guided therapeutic flows (all listed as future phases in the roadmap).

## Unknowns

- Whether the app is still deployed at `relaciones.baruchlopez.com`: **Unknown**.
- Whether real couples or therapists used it: **Unknown**.
- The Python script that apparently wrapped the original `start.html`: **Unknown**, not in the repository.
