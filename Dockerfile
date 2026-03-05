FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --no-fund --no-audit

COPY public ./public
COPY src ./src
COPY scripts ./scripts
COPY server.js ./server.js
COPY data ./data

EXPOSE 8080

CMD ["node", "src/server/index.js"]
