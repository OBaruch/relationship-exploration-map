const fs = require("fs");
const path = require("path");
const { sendText } = require("../http/send");

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};

function resolvePath(publicDir, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const absolute = path.resolve(publicDir, `.${safePath}`);
  const root = path.resolve(publicDir);

  if (!absolute.startsWith(root)) {
    return null;
  }

  if (!fs.existsSync(absolute)) {
    return null;
  }

  if (!fs.statSync(absolute).isFile()) {
    return null;
  }

  return absolute;
}

function serveStaticFile({ res, publicDir, pathname }) {
  const filePath = resolvePath(publicDir, pathname);
  if (!filePath) {
    sendText(res, 404, "Not found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = CONTENT_TYPES[ext] || "application/octet-stream";
  const content = fs.readFileSync(filePath);

  res.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
  });
  res.end(content);
}

module.exports = {
  serveStaticFile,
};
