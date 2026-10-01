# Specs

Spec-driven development artifacts for **Relationship Exploration Map**. The flow is **intent → spec → plan → implementation**, with traceability between the layers.

| File | Question it answers | Audience |
|---|---|---|
| [intent.md](intent.md) | *Why* does this exist and what does success look like? | Anyone, including contributors and coding assistants starting work |
| [spec.md](spec.md) | *What* does the system do, as testable requirements with IDs and acceptance criteria? | Implementers, reviewers, test authors |
| [plan.md](plan.md) | *How* was it built, and what comes next? | Implementers planning changes |

## Important: these are retrospective (reverse-engineered) specs

These documents were written **after** the code, during the repository reorganization. They describe the system **as built**, using only the existing code, git history and the original documents in [`docs/original/`](../docs/original/README.md). They do not propose new behaviour.

- Every requirement has a **Status**: `Implemented`, `Partial`, `Not implemented` or `Divergent` (the code differs from the original vision).
- Every requirement cites its **Evidence** (a file or commit).
- Anything not backed by evidence is marked **Inferred** or **Unknown**.

## How to use them for future changes

1. Start from [intent.md](intent.md). A change that conflicts with the intent or its non-goals needs an explicit decision first.
2. Add or edit requirements in [spec.md](spec.md) with a new ID and testable acceptance criteria **before** changing code.
3. Add a phase or task to [plan.md](plan.md) that references those requirement IDs.
4. Implement, then update each requirement's Status and Evidence.
5. Follow the quality gates in [`AGENTS.md`](../AGENTS.md) (`npm test`, `npm run security:scan`, `npm run smoke`, manual checks).

The original source code is kept unchanged on purpose. Known gaps are listed in [`docs/possible-improvements.md`](../docs/possible-improvements.md) and are **not** fixed.
