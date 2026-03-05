# Arquitectura Tecnica

## Vision general
La aplicacion usa una arquitectura simple de tres capas:
1. **Presentacion** (`public/`): UI y reglas de interaccion del tablero.
2. **Aplicacion/API** (`src/server/routes/`): endpoints HTTP REST.
3. **Persistencia** (`src/server/storage/`): lectura/escritura de mapas en JSON.

## Backend
- `src/server/index.js`: bootstrap del servidor.
- `src/server/app.js`: request handler principal.
- `src/server/routes/api.js`: enrutamiento de `/api/*`.
- `src/server/storage/mapStore.js`: validacion/saneamiento y persistencia de mapas.
- `src/server/static/serveStatic.js`: entrega de archivos estaticos.

## Frontend
- `public/index.html`: layout principal.
- `public/assets/styles.css`: sistema visual.
- `public/assets/app.js`: estado del tablero, interacciones y consumo de API.

## Contrato de datos (mapa)
Campos principales:
- `id`, `createdAt`, `updatedAt`
- `title`
- `people.personA`, `people.personB`
- `mode`
- `boardState` (`size`, `center`, `cells[]`)
- `notes` (diccionario por coordenada `r,c`)

## Decisiones de calidad
- Validacion de input en backend.
- Limite de payload (1MB).
- Escritura atomica en JSON (`.tmp` + rename).
- Estructura modular para migrar a DB sin romper API.
- Pruebas unitarias de storage en `tests/map-store.test.js`.
