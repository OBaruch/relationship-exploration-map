# Deployment en Producción — Relationship Exploration Map

## Resumen ejecutivo
- Dominio: `relaciones.baruchlopez.com`
- Reverse proxy: **Traefik** (TLS con Let's Encrypt)
- Contenedor app: `relationship-map` (`relationship-map:local`)
- Red Docker: `openclaw-zbx2_default`
- Puerto interno app: `3000` (enrutado por Traefik)

## Stack real en producción
- Node.js dentro de Docker
- App server: `node src/server/index.js`
- Deploy actual: contenedor directo (`docker run`) + labels Traefik
- No se detectó Coolify en este flujo

## Arquitectura (alto nivel)
1. Cliente entra por HTTPS a `relaciones.baruchlopez.com`.
2. Traefik matchea router `relaciones` por host.
3. Traefik aplica middleware `security-headers@file`.
4. Traefik reenvía al servicio interno (`relationship-map:3000`).
5. App Node responde frontend/API.

## Labels de Traefik usados
- `traefik.enable=true`
- `traefik.http.routers.relaciones.rule=Host(\`relaciones.baruchlopez.com\`)`
- `traefik.http.routers.relaciones.entrypoints=web,websecure`
- `traefik.http.routers.relaciones.tls=true`
- `traefik.http.routers.relaciones.tls.certresolver=letsencrypt`
- `traefik.http.routers.relaciones.middlewares=security-headers@file`
- `traefik.http.services.relaciones.loadbalancer.server.port=3000`

## Variables de entorno
Variables observadas en runtime:
- `HOST`
- `PORT`
- `NODE_VERSION`
- `YARN_VERSION`

> Nota de consistencia: en runtime actual se observó `PORT=3000`; hay archivos de proyecto con `8080`. Conviene unificar para evitar drift operativo.

## Seguridad
### Edge (Traefik middleware)
Configuración en `/docker/traefik/dynamic/security.yml`:
- HSTS + preload
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (cámara/micrófono/geolocalización bloqueados)
- CSP restrictiva
- redirección HTTP → HTTPS

### Servicio
- Sin exposición directa de puerto al host (solo red interna Docker)
- Política de reinicio `unless-stopped`

## Verificación post deploy
```bash
docker ps | grep relationship-map
curl -I https://relaciones.baruchlopez.com
```
