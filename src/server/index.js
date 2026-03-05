const http = require("http");
const config = require("./config");
const { createRequestHandler } = require("./app");
const { createMapStore } = require("./storage/mapStore");

const mapStore = createMapStore({ filePath: config.mapsFile });
mapStore.ensureStore();

const requestHandler = createRequestHandler({
  mapStore,
  publicDir: config.publicDir,
  maxBodySize: config.maxBodySize,
});

const server = http.createServer((req, res) => {
  requestHandler(req, res);
});

server.listen(config.port, config.host, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://${config.host}:${config.port}`);
});

module.exports = {
  server,
};
