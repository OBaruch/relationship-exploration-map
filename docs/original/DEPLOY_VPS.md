# Deploy en VPS (Node + Nginx)

## 1) Preparar servidor
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

## 2) Clonar y ejecutar
```bash
git clone <REPO_URL> relationship-exploration-map
cd relationship-exploration-map
npm install
npm start
```

## 3) Crear servicio systemd
Crear `/etc/systemd/system/relationship-map.service`:
```ini
[Unit]
Description=Relationship Exploration Map
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/relationship-exploration-map
Environment=NODE_ENV=production
Environment=HOST=127.0.0.1
Environment=PORT=8080
ExecStart=/usr/bin/node src/server/index.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

Activar:
```bash
sudo systemctl daemon-reload
sudo systemctl enable relationship-map
sudo systemctl start relationship-map
sudo systemctl status relationship-map
```

## 4) Nginx reverse proxy
```nginx
server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## 5) HTTPS
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```
