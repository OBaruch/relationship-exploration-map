# Product Vision

This is an English summary of the original product vision document, [`original/objetivo.md`](original/objetivo.md) (Spanish, about 650 lines). It covers the **concept** as the author wrote it. For what the code actually implements, see [code-overview.md](code-overview.md) and [../specs/spec.md](../specs/spec.md). Parts of the vision were never implemented.

## One-line summary

> *"An interactive tool that turns a relationship into a visual map of attachment, boundaries, exploration and shared maturity."*
> Or, more poetically: *"Not all relationships break by moving away from the centre; many break by not knowing how to explore the map."*

## The metaphor: the relationship is a board

- A **central pillar or column** is the secure base: bond, belonging, emotional safety, the point of return, the stability of "us".
- **Person A** is on the left and **Person B** on the right.
- The board is **mirrored**. When one person advances into a block, the equivalent block on the other side becomes available, because *"what one opens in a relationship does not happen in isolation; it changes the map for both."*
- An available block does not mean the other person can, wants to, or is ready to enter it. This is where attachment comes in.

## What the board encodes

| Element | Meaning |
|---|---|
| Centre | Basic attachment, safety, belonging, minimal structure of the bond |
| Distance from centre | More autonomy, complexity, perceived risk and novelty. Near: routine, basic trust, coexistence. Far: separate travel, renegotiated agreements, advanced sexual exploration, complex jealousy, redefined limits |
| Mirror | Reciprocity: a limit set by A also appears on B's side, and vice versa |
| Block | A concrete unit of relational experience: an activity, agreement, limit, challenge, pending conversation or integrated experience (friends, travel, work, privacy, family, sexuality, social media, jealousy, money, commitment, secrets, control, repair…) |

## Block states (as envisioned)

1. **Locked**: not yet open in the relationship.
2. **Unlocked**: reachable by proximity, prior exploration or the mirror.
3. **Completed**: explored or integrated (not "solved forever").
4. **Active mine**: a non-negotiable, trigger, wound or high-risk zone.
5. **Transformed mine**: a former mine that was worked through or reframed by mutual agreement. Not every mine should be transformed.
6. *(Optional)* **In conflict**: activated but unresolved.
7. *(Optional)* **Reflected**: discussed but not necessarily lived.

## Mines

- A mine may stand for infidelity, deception, humiliation, excessive control, violence, manipulation, serious secrets, emotional abandonment, destructive social-media use, lack of reciprocity, or any serious limit the couple names.
- **Central rule:** *a mine placed on one side also appears in the mirror block on the other side*, so that "I can but you can't" double standards don't hold.
- Their purpose is teaching as well as forbidding: they reveal fears, expose double standards, open conversations, separate real limits from unprocessed anxiety, and show (in)compatibilities.
- Some mines may be **transformed** in mature relationships. The document stresses this is *not a universal ideal*.

## Attachment styles as board patterns

| Style | Behaviour on the board |
|---|---|
| Secure | Leaves the centre, explores, tolerates distance, returns without drama; the map expands coherently |
| Anxious | Stays near the centre even when blocks are unlocked; reads the other's expansion as a threat |
| Avoidant | Moves, but selectively: opens peripheral zones (work, autonomy) and avoids intimate ones |
| Disorganized | Erratic: approach and flight, impulsive exploration, repeated mines |

## Intended uses and audience

- **Couples:** define limits, map lived experience, *talk without fighting directly* by pointing at the map, see asymmetries, compare maps over time (initial, after a crisis, after therapy).
- **Psychotherapy (individual or couples):** a visual aid to explain attachment, limits, avoidance and repair.
- **Emotional education**, **digital content**, and **narrative/emotional design research**.

## Product philosophy

1. Loving is not staying still in the centre.
2. Exploring is not betraying.
3. Every limit reveals a story.
4. Not everything should be reframed; some mines must stay firm.
5. Reciprocity matters: a one-sided agreement leaves the map ethically broken.
6. Relational maturity can be visualised as breadth, clarity and repair, not perfection.

## Envisioned feature tiers

| Tier | Features | Status in this repository |
|---|---|---|
| Base | Interactive HTML board, categorised blocks, mines, automatic mirror, unlocking, completion, explanatory text | Implemented (prototype and current app) |
| Advanced | Custom block names, saved maps, couple profiles, multiple sessions, notes per block, JSON/PDF export | Partial: saved maps and notes are implemented. Custom names, profiles and export are not |
| Therapeutic | Guided routes, per-block questions, reflection exercises, attachment indicators, cross-session comparison | Not implemented. The "exploration radar" is a simple heuristic, not an attachment indicator |
| Premium / institutional | Dashboard, facilitator mode, clinical/educational modules | Not implemented |

## Conceptual risks the product must state

It does not diagnose, does not replace therapy, does not make one person "the problem", does not reduce a relationship to one map, does not force any mine to be reframed, and must not be used to manipulate a partner. *"The board is a tool for reading and conversation, not a verdict."* The current UI includes a **"Uso responsable"** (responsible use) panel with this disclaimer.

## Desired tone

Deep, elegant, visually sober, emotionally intelligent, clinically respectful, educational, non-moralistic, not childish and not cold. A mix of reflection tool, interactive experience, emotional cartography and near-therapeutic interface.
