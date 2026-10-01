# Roadmap MVP - Mapa Relacional Interactivo

## Objetivo del MVP
Publicar una version funcional en VPS, accesible desde internet, que permita:
- crear mapas relacionales,
- editar estados del tablero (exploracion, minas, transformacion, reflexion),
- guardar y cargar sesiones,
- registrar notas por bloque.

## Alcance funcional (MVP actual)
- Frontend en `public/index.html` + `public/assets/*`.
- Backend Node modular en `src/server/*`.
- API REST:
  - `GET /api/health`
  - `GET /api/maps`
  - `POST /api/maps`
  - `GET /api/maps/:id`
  - `PUT /api/maps/:id`
- Persistencia en `data/maps.json`.
- Ejecucion con `npm start` (Node.js 18+).

## Fase 1 - Produccion inicial en VPS (1 semana)
1. Provisionar VPS (Ubuntu recomendado) y abrir puertos `80` y `443`.
2. Instalar Node.js 18+, clonar repo y ejecutar `npm install`.
3. Levantar servicio con `systemd` o `pm2` para reinicio automatico.
4. Configurar Nginx como reverse proxy hacia `localhost:8080`.
5. Configurar HTTPS con Let's Encrypt (`certbot`).
6. Verificar acceso publico por dominio/subdominio.

## Fase 2 - Estabilidad y seguridad basica (1-2 semanas)
1. Mantener limite de payload y agregar rate limiting por IP.
2. Agregar logs estructurados y rotacion.
3. Implementar backups diarios de `data/maps.json`.
4. Fortalecer validaciones y sanitizacion de entradas.
5. Monitoreo de uptime y chequeo periodico de `/api/health`.

## Fase 3 - Evolucion de producto (2-4 semanas)
1. Migrar persistencia a SQLite/PostgreSQL.
2. Agregar autenticacion (cuenta o links privados por sesion).
3. Exportar mapa en JSON/PDF.
4. Historial de sesiones y comparacion entre versiones.
5. Modulo guiado con preguntas por bloque para uso terapeutico.

## Criterios de salida de MVP
- App publica por HTTPS y estable 24/7.
- Guardado/carga de mapas sin perdida de datos.
- Flujo principal usable en desktop y mobile.
- Backups funcionando y recuperables.
