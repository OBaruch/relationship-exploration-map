const path = require("path");

const projectRoot = path.resolve(__dirname, "..", "..");

module.exports = {
  host: process.env.HOST || "0.0.0.0",
  port: Number(process.env.PORT || 8080),
  maxBodySize: 1024 * 1024, // 1MB
  projectRoot,
  publicDir: path.join(projectRoot, "public"),
  dataDir: path.join(projectRoot, "data"),
  mapsFile: path.join(projectRoot, "data", "maps.json"),
};
