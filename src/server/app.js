const { sendJson } = require("./http/send");
const { handleApiRoute } = require("./routes/api");
const { serveStaticFile } = require("./static/serveStatic");

function createRequestHandler({ mapStore, publicDir, maxBodySize }) {
  return async function requestHandler(req, res) {
    try {
      const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
      const pathname = decodeURIComponent(url.pathname);

      const apiHandled = await handleApiRoute({
        req,
        res,
        pathname,
        mapStore,
        maxBodySize,
      });
      if (apiHandled) return;

      if (req.method !== "GET") {
        sendJson(res, 405, { error: "Method not allowed" });
        return;
      }

      serveStaticFile({ res, publicDir, pathname });
    } catch (error) {
      sendJson(res, 500, { error: "Internal server error", detail: error.message });
    }
  };
}

module.exports = {
  createRequestHandler,
};
