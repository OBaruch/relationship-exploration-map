const { sendJson } = require("../http/send");
const { readJsonBody } = require("../http/readJsonBody");
const { httpError } = require("../http/errors");

const MAP_DETAIL_REGEX = /^\/api\/maps\/([A-Za-z0-9-]+)$/;

function getErrorStatus(error) {
  return Number.isInteger(error.statusCode) ? error.statusCode : 500;
}

async function handleApiRoute({ req, res, pathname, mapStore, maxBodySize }) {
  if (!pathname.startsWith("/api/")) {
    return false;
  }

  try {
    if (req.method === "GET" && pathname === "/api/health") {
      sendJson(res, 200, {
        status: "ok",
        service: "relationship-exploration-map",
        now: new Date().toISOString(),
      });
      return true;
    }

    if (req.method === "GET" && pathname === "/api/maps") {
      sendJson(res, 200, { items: mapStore.listSummaries() });
      return true;
    }

    if (req.method === "POST" && pathname === "/api/maps") {
      const body = await readJsonBody(req, maxBodySize);
      const created = mapStore.create(body);
      sendJson(res, 201, created);
      return true;
    }

    const detailMatch = pathname.match(MAP_DETAIL_REGEX);
    if (!detailMatch) {
      sendJson(res, 404, { error: "Not found" });
      return true;
    }

    const mapId = detailMatch[1];

    if (req.method === "GET") {
      const map = mapStore.getById(mapId);
      if (!map) throw httpError(404, "Map not found");
      sendJson(res, 200, map);
      return true;
    }

    if (req.method === "PUT") {
      const body = await readJsonBody(req, maxBodySize);
      const updated = mapStore.update(mapId, body);
      if (!updated) throw httpError(404, "Map not found");
      sendJson(res, 200, updated);
      return true;
    }

    throw httpError(405, "Method not allowed");
  } catch (error) {
    sendJson(res, getErrorStatus(error), { error: error.message || "Internal server error" });
    return true;
  }
}

module.exports = {
  handleApiRoute,
};
