# Investigación base: situaciones comunes de pareja para el tablero

Fecha: 2026-03-07

## Objetivo

Definir situaciones concretas para que **cada bloque del tablero** represente un caso real de relación y no un bloque vacío.

## Criterio de diseño del tablero

- Tamaño: 11x11 (centro compartido + 55 pares espejo).
- Se asignaron **55 situaciones específicas** (una por cada par espejo).
- Agrupación por 5 temas:
  1. Confianza
  2. Comunicación
  3. Intimidad
  4. Proyecto de vida
  5. Límites

Cada tema contiene 11 situaciones, para cubrir todas las filas del tablero.

## Hallazgos usados para estructurar temas

### 1) Gottman Institute (conflicto)
- Fuente: https://www.gottman.com/blog/the-four-horsemen-the-antidotes/
- Punto útil: el conflicto no se elimina, se **maneja**; patrones de crítica, desprecio, defensividad y evasión dañan la relación.
- Traducción al tablero: bloques de "crítica dura", "disculpa real", "desacuerdo crónico", "sin insultos", "pausa sana".

### 2) Comunicación asertiva (Verywell Mind)
- Fuente: https://www.verywellmind.com/learn-assertive-communication-in-five-simple-steps-3144969
- Punto útil: claridad de necesidades, respeto mutuo, límites sanos, reducción de estrés relacional.
- Traducción al tablero: "feedback", "escucha activa", "conversación difícil", "tiempo propio", "privacidad digital".

### 3) Apego en adultos
- Fuente: https://en.wikipedia.org/wiki/Attachment_in_adults
- Punto útil: modelos de apego influyen en cercanía, ansiedad y respuesta a distancia/conflicto.
- Traducción al tablero: "ausencia emocional", "reconexión", "rechazo", "contacto ex", "revisar celular".

### 4) Resolución de conflicto
- Fuente: https://en.wikipedia.org/wiki/Conflict_resolution
- Punto útil: resolución cognitiva, emocional y conductual; estilos de afrontamiento (evitación, compromiso, colaboración, etc.).
- Traducción al tablero: bloques que distinguen conducta, emoción y negociación práctica.

### 5) Enfoque sistémico (familia y pareja)
- Fuente: https://en.wikipedia.org/wiki/Family_therapy
- Punto útil: problemas individuales suelen sostenerse por dinámicas del sistema relacional.
- Traducción al tablero: "familia intrusiva", "eventos familia", "plan crisis", "tareas hogar", "presupuesto".

## Resultado implementado

En `public/assets/app.js`:
- Se reemplazó el set parcial de zonas por una librería completa de 55 situaciones.
- Cada bloque lateral ahora tiene:
  - `label` (nombre corto)
  - `text` (situación específica)
  - `section` (tema)
- Se agregó mapeo `SECTION_LABELS` para mostrar tema legible en el detalle.

En `public/index.html` y `public/assets/styles.css`:
- Se añadió nota de investigación en la documentación visible de la app.

## Nota

Esta investigación se usó como **estructura conversacional**, no como diagnóstico clínico.
