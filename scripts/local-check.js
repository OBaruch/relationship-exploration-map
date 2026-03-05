const http = require("http");

function parsePortArg() {
  const index = process.argv.findIndex((item) => item === "--port");
  if (index >= 0) {
    const value = Number(process.argv[index + 1]);
    if (Number.isInteger(value) && value > 0) return value;
  }
  const envPort = Number(process.env.LOCAL_CHECK_PORT || "8080");
  return Number.isInteger(envPort) && envPort > 0 ? envPort : 8080;
}

function request({ hostHeader, path }) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: "127.0.0.1",
        port: parsePortArg(),
        path,
        method: "GET",
        headers: {
          Host: hostHeader,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk.toString("utf8");
        });
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode || 0,
            body: data,
          });
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function run() {
  const port = parsePortArg();
  const health = await request({
    hostHeader: "mapa.localhost",
    path: "/api/health",
  });
  if (health.statusCode !== 200) {
    throw new Error(`Health check failed with status ${health.statusCode}`);
  }
  const healthJson = JSON.parse(health.body);
  if (healthJson.status !== "ok") {
    throw new Error("Health payload is invalid");
  }

  const home = await request({
    hostHeader: "mapa.localhost",
    path: "/",
  });
  if (home.statusCode !== 200) {
    throw new Error(`Home check failed with status ${home.statusCode}`);
  }
  if (!home.body.includes("Mapa Relacional Interactivo")) {
    throw new Error("Home HTML is not expected");
  }

  // eslint-disable-next-line no-console
  console.log(`local-check=ok host=mapa.localhost port=${port}`);
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error.message);
  process.exitCode = 1;
});
