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
npm run security:scan
npm run smoke
npm run local:stack:up
npm run local:stack:check
npm run local:stack:down
```

Servidor por defecto: `http://localhost:8080`.

Nota de entorno: si tu sistema ya define `PORT` (comun en CI o wrappers), el proyecto usa `APP_PORT` para forzar el puerto local. Ejemplo: `APP_PORT=8080 npm run dev`.

## API
- `GET /api/health`
- `GET /api/maps`
- `POST /api/maps`
- `GET /api/maps/:id`
- `PUT /api/maps/:id`

## Seguridad
- `npm run security:scan`: escanea el working tree por posibles secretos.
- `npm run security:scan:history`: escanea patrones sensibles en historial Git.

## Despliegue VPS (resumen)
1. Instalar Node.js 18+ y clonar repo.
2. Ejecutar `npm install`.
3. Levantar con `npm start` o `systemd/pm2`.
4. Publicar con Nginx reverse proxy + HTTPS (Let's Encrypt).

## Documentacion
- [Objetivo del producto](docs/objetivo.md)
- [Roadmap MVP](docs/ROADMAP_MVP.md)
- [Arquitectura tecnica](docs/ARCHITECTURE.md)
- [Pruebas locales completas](docs/LOCAL_TESTING.md)
- [Deploy en VPS](docs/DEPLOY_VPS.md)
- [Manual Wix subdominio](docs/WIX_SUBDOMINIO_MANUAL.md)
- [Checklist de calidad](docs/QUALITY_CHECKLIST.md)
