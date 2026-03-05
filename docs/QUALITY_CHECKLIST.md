# Checklist de Calidad

## Codigo
- [ ] Modulos pequenos por responsabilidad (sin archivos monoliticos).
- [ ] Validacion de entradas en backend.
- [ ] Errores HTTP consistentes (`4xx/5xx` con JSON).
- [ ] Sin duplicar reglas de negocio criticas (ejemplo: logica de espejo).

## Frontend
- [ ] UI responsive desktop/mobile.
- [ ] Estado centralizado en `public/assets/app.js`.
- [ ] Estilos encapsulados en `public/assets/styles.css`.
- [ ] Texto y mensajes claros para el usuario final.

## Backend y datos
- [ ] Limite de payload aplicado.
- [ ] Persistencia atomica (`.tmp` + rename).
- [ ] `maps.json` excluido de control de versiones.
- [ ] Endpoint de salud operativo (`/api/health`).

## Pruebas y operacion
- [ ] `npm test` en verde antes de merge.
- [ ] `npm run smoke` en entorno de despliegue.
- [ ] Logs y backups configurados en VPS.
- [ ] HTTPS activo en produccion.
