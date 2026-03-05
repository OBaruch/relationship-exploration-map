# Pruebas Locales Completas (App + Subdominio + Proxy)

Este proyecto ya queda preparado para probarse localmente de dos formas.

## Opcion A: rapido (solo Node)
```bash
npm install
npm run dev
npm run local:check
```
Abrir:
- `http://localhost:8080`
- `http://mapa.localhost:8080`

## Opcion B: modo VPS local (recomendado)
Levanta app + Nginx con subdominio local.

```bash
npm run local:stack:up
npm run local:stack:check
```

Abrir cualquiera:
- `http://mapa.localhost`
- `http://mapa.127.0.0.1.nip.io`

Parar stack:
```bash
npm run local:stack:down
```

Ver logs:
```bash
npm run local:stack:logs
```

## Si no tienes Docker
Puedes probar casi todo local con `npm run dev` y URL con host de subdominio:
- `http://mapa.localhost:8080`

Solo no estaras validando la capa Nginx.

## Si `mapa.localhost` no resuelve en tu equipo
Agrega hosts manual:
- Windows (`C:\Windows\System32\drivers\etc\hosts`)
- Linux/macOS (`/etc/hosts`)

Linea:
```txt
127.0.0.1 mapa.localhost mapa.local.test
```

## Validacion manual recomendada
1. Abrir UI y verificar carga del tablero.
2. Probar `Guardar mapa` y `Cargar` desde lista.
3. Verificar API:
   - `http://mapa.localhost/api/health`
   - `http://mapa.localhost/api/maps`
