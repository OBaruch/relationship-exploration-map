const { httpError } = require("./errors");

function readJsonBody(req, maxBodySize) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let raw = "";

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBodySize) {
        reject(httpError(413, "Payload too large"));
        req.destroy();
        return;
      }
      raw += chunk.toString("utf8");
    });

    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(httpError(400, "Invalid JSON body"));
      }
    });

    req.on("error", reject);
  });
}

module.exports = {
  readJsonBody,
};
