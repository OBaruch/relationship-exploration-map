const path = require("path");

const projectRoot = path.resolve(__dirname, "..", "..");

function parsePort(value, fallback = 8080) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

module.exports = {
  host: process.env.HOST || "0.0.0.0",
  // APP_PORT tiene prioridad para evitar colisiones en entornos que inyectan PORT aleatorio.
  port: parsePort(process.env.APP_PORT, parsePort(process.env.PORT, 8080)),
  maxBodySize: 1024 * 1024, // 1MB
  projectRoot,
  publicDir: path.join(projectRoot, "public"),
  dataDir: path.join(projectRoot, "data"),
  mapsFile: path.join(projectRoot, "data", "maps.json"),
};
