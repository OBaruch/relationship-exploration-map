# Relationship Exploration Map

Aplicacion web para mapear dinamicas de pareja (apego, limites, minas sensibles, reciprocidad y reparacion) con tablero interactivo espejado.

## Tech Stack
- Backend: Node.js (HTTP nativo, CommonJS)
- Frontend: HTML + CSS + JavaScript vanilla
- Persistencia: archivo JSON local (`data/maps.json`)
- Testing: Node test runner (`node --test`)

## Estructura
- `public/`: cliente web
- `src/server/`: servidor y API
- `docs/`: objetivo de producto y roadmap
- `tests/`: pruebas de backend
- `scripts/`: utilidades (smoke test)

## Comandos
```bash
npm install
npm run dev
npm test
npm run smoke
```

Servidor por defecto: `http://localhost:8080`.

## API
- `GET /api/health`
- `GET /api/maps`
- `POST /api/maps`
- `GET /api/maps/:id`
- `PUT /api/maps/:id`

## Despliegue VPS (resumen)
1. Instalar Node.js 18+ y clonar repo.
2. Ejecutar `npm install`.
3. Levantar con `npm start` o `systemd/pm2`.
4. Publicar con Nginx reverse proxy + HTTPS (Let's Encrypt).

## Documentacion
- [Objetivo del producto](docs/objetivo.md)
- [Roadmap MVP](docs/ROADMAP_MVP.md)
- [Arquitectura tecnica](docs/ARCHITECTURE.md)
- [Deploy en VPS](docs/DEPLOY_VPS.md)
- [Checklist de calidad](docs/QUALITY_CHECKLIST.md)
