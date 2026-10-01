# Intent: Relationship Exploration Map

> Retrospective intent, reconstructed from [`docs/original/objetivo.md`](../docs/original/objetivo.md), [`docs/original/ROADMAP_MVP.md`](../docs/original/ROADMAP_MVP.md) and the code. See [specs/README.md](README.md).

## Problem

People in relationships tend to think in simple verbal or moral rules ("if they loved me they wouldn't want space"). They have no shared, concrete way to tell apart healthy exploration from threat, autonomy from abandonment, real non-negotiables from unprocessed fear, or conscious agreements from inherited limits. Conversations about these topics easily turn into fights.

## Intent

Build an **interactive, mirrored game board** that turns a relationship into a visual map of **attachment, boundaries, exploration, reciprocity and repair**. A couple can point at the map and talk ("I feel you opened that block and I didn't") instead of trading accusations.

## Target users

| User | Need |
|---|---|
| Couples (primary) | Define limits, map what they have lived, see asymmetries, come back to the map over time |
| Therapists and coaches (secondary) | A visual aid to explain attachment, limits, avoidance and repair |
| Educators and content creators (secondary) | A teaching piece about emotional and relational dynamics |

## Core principles (non-negotiable for the product)

1. **Reciprocity by construction.** Anything that applies to one side applies to the mirror side ("if it applies to one, it applies to both"). It is implemented as one mirror rule.
2. **Centre as secure base.** The relationship starts from a shared centre; distance means autonomy and novelty, not betrayal.
3. **Limits tell stories.** Mines are non-negotiables that open conversation, not only prohibitions. Not every mine should be transformed.
4. **Conversation, not verdict.** The tool does not diagnose, does not replace therapy, and must not be used to manipulate a partner. The UI must say this.
5. **Tone.** Deep, sober, emotionally intelligent, non-moralistic, not childish.

## Success criteria (MVP, from the original roadmap)

- The app is public over HTTPS and stable 24/7.
- A couple can create, save and reload a map **without losing data**.
- The main flow is usable on desktop and mobile.
- Backups work and can be restored.

**Current assessment (as built):** HTTPS deployment was achieved (2026-03-17). Saving and loading works for board cells, title and notes, **but turn, player position and unlock provenance are lost** (see [spec.md](spec.md) REQ-PER-04). Backups are **not implemented**. Mobile layout is implemented.

## Non-goals

- Clinical diagnosis or psychometric assessment.
- Replacing therapy.
- User accounts, multi-tenant privacy, analytics tracking (not in MVP scope).
- A framework-based frontend or a database (the MVP is intentionally dependency-free and file-backed).

## Constraints

- Node.js ≥ 18, no third-party runtime dependencies.
- A single process serving the static UI and the JSON API.
- File-based persistence (`data/maps.json`).
- Deployable on a single VPS (Nginx or Traefik in front).
- Spanish-language UI.

## Open questions (Unknown in the repository)

- Should players stay labelled *Hombre* / *Mujer*, or go back to the neutral *Persona A / Persona B* from the vision?
- Should "Transformar mina" come back (it exists in the prototype and in backend modes, but not in the current UI)?
- Who may read or overwrite a map (privacy model)?
