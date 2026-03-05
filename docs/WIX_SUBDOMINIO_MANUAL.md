# Manual: Informacion que debes darme para crear tu subdominio (Wix + VPS)

## Objetivo
Con este formato me pasas todos los datos necesarios y yo te devuelvo:
- los registros DNS exactos para Wix,
- la configuracion de Nginx para el VPS,
- y los pasos de validacion final.

Nota: yo no puedo entrar a tu cuenta de Wix, pero con esta informacion te doy instrucciones exactas para que lo configures sin errores.

## 1) Informacion obligatoria que debes enviarme
1. Dominio principal en Wix (ejemplo: `tudominio.com`).
2. Subdominio que quieres crear (ejemplo: `mapa.tudominio.com`).
3. IP publica IPv4 de tu VPS (ejemplo: `123.45.67.89`).
4. Si tienes IPv6 publica (si/no y valor).
5. Proveedor de VPS (DigitalOcean, Hetzner, AWS, etc.) y sistema operativo.
6. Puerto donde corre la app (en este proyecto, por defecto `8080`).
7. Si ya usas Nginx en el VPS (si/no).
8. Si el DNS del dominio realmente se administra en Wix (si/no).

## 2) Informacion opcional (recomendada)
1. Captura o copia de tus DNS actuales en Wix.
2. Si quieres HTTPS obligatorio (recomendado: si).
3. Correo para alertas de certificado SSL.
4. Si ya existe algun registro con el mismo host/subdominio.

## 3) Como sacar los datos tecnicos rapido
En el VPS:

```bash
curl -4 ifconfig.me
curl -6 ifconfig.me
```

Para validar que tu app responde local:

```bash
curl http://127.0.0.1:8080/api/health
```

## 4) Que haras en Wix (resumen)
1. Ir a `Dominios` -> `Administrar DNS` del dominio.
2. Crear registro `A`:
   - Host/Nombre: `mapa` (si quieres `mapa.tudominio.com`)
   - Apunta a: `IP_PUBLICA_VPS`
3. (Opcional) Crear `AAAA` si usas IPv6.
4. Guardar y esperar propagacion (5 min a 24 h).

## 5) Plantilla para enviarme (copiar/pegar)
```txt
Dominio principal: 
Subdominio deseado: 
IP publica IPv4 VPS: 
IP publica IPv6 VPS (opcional): 
Proveedor VPS: 
Sistema operativo VPS: 
Puerto app: 
Nginx instalado: (si/no)
DNS gestionado en Wix: (si/no)
HTTPS obligatorio: (si/no)
Registros DNS existentes relevantes:
```

## 6) Que te devolvere cuando me pases eso
1. Registros DNS exactos para Wix (A/AAAA/CNAME si aplica).
2. Bloque de Nginx listo para pegar.
3. Comandos para activar HTTPS con Certbot.
4. Checklist de verificacion final (`nslookup`, `curl`, navegador).
