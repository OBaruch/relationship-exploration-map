# Research Basis for the Board Situations

English summary of [`original/COUPLE_SITUATIONS_RESEARCH.md`](original/COUPLE_SITUATIONS_RESEARCH.md) (dated 2026-03-07), plus a description of how its results appear in the code.

## Goal

Give **every block** on the board a concrete, realistic relationship situation instead of an empty or generic cell.

## Board design criteria

- 11×11 board: a shared centre column plus **55 mirrored pairs**.
- **55 specific situations**, one per mirrored pair.
- **5 themes × 11 situations** each (one per board row):

| Theme key (`section`) | Label | Distance from centre (`d`) | Columns (left / right) | Board tint (from `styles.css`) |
|---|---|---|---|---|
| `confianza` | Confianza (Trust) | 1 | 4 / 6 | blue |
| `comunicacion` | Comunicación (Communication) | 2 | 3 / 7 | teal |
| `intimidad` | Intimidad (Intimacy) | 3 | 2 / 8 | pink |
| `proyecto` | Proyecto de vida (Life project) | 4 | 1 / 9 | yellow |
| `limites` | Límites (Boundaries) | 5 | 0 / 10 | red |

The distance and column values come from `SECTION_ORDER` and the `ZONES` construction in `public/assets/app.js`. The research document itself does not say which theme sits closest to the centre.

## Sources cited in the original document

| Source | Useful idea | How it reached the board |
|---|---|---|
| Gottman Institute: *The Four Horsemen & their antidotes* | Conflict is *managed*, not eliminated; criticism, contempt, defensiveness and stonewalling damage relationships | "Crítica dura", "Disculpa real", "Desacuerdo crónico", "Sin insultos", "Pausa sana" |
| Verywell Mind: assertive communication | Clear needs, mutual respect, healthy limits | "Feedback", "Escucha activa", "Conversación difícil", "Tiempo propio", "Privacidad digital" |
| Wikipedia: *Attachment in adults* | Attachment models shape closeness, anxiety and responses to distance and conflict | "Ausencia emocional", "Reconexión", "Rechazo", "Contacto ex", "Revisar celular" |
| Wikipedia: *Conflict resolution* | Cognitive, emotional and behavioural resolution; coping styles | Blocks that separate behaviour, emotion and practical negotiation |
| Wikipedia: *Family therapy* | Individual problems are often sustained by system dynamics | "Familia intrusiva", "Eventos familia", "Plan crisis", "Tareas hogar", "Presupuesto" |

URLs are listed in the original file.

## Implementation (as described by the document and confirmed in code)

- `public/assets/app.js` defines `SITUATION_LIBRARY` (5 themes × 11 entries, each with a short `label` and a situation `text`) and `SECTION_LABELS` for display names.
- Each side block gets `label`, `text` and `section` properties.
- `public/index.html` shows a short research note in the "Documentación" section of the app.

## Caveat (from the original)

The research was used as a **conversational structure**, not as a clinical diagnostic framework.
