const port = Number(process.env.APP_PORT || 8080);
const baseUrl = process.env.BASE_URL || `http://127.0.0.1:${Number.isInteger(port) && port > 0 ? port : 8080}`;

async function run() {
  const healthResponse = await fetch(`${baseUrl}/api/health`);
  if (!healthResponse.ok) {
    throw new Error(`Health check failed (${healthResponse.status})`);
  }
  const health = await healthResponse.json();

  const mapsResponse = await fetch(`${baseUrl}/api/maps`);
  if (!mapsResponse.ok) {
    throw new Error(`Maps endpoint failed (${mapsResponse.status})`);
  }
  const maps = await mapsResponse.json();

  // eslint-disable-next-line no-console
  console.log(`health=${health.status} maps=${Array.isArray(maps.items) ? maps.items.length : 0}`);
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error.message);
  process.exitCode = 1;
});
