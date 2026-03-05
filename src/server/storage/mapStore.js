const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const MODES = new Set(["explore", "mine", "complete", "transform", "reflect"]);

function truncateText(value, maxLength, fallback = "") {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  return trimmed.slice(0, maxLength);
}

function normalizePeople(people) {
  const source = people && typeof people === "object" ? people : {};
  return {
    personA: truncateText(source.personA, 80, "Persona A"),
    personB: truncateText(source.personB, 80, "Persona B"),
  };
}

function normalizeNotes(notes) {
  const source = notes && typeof notes === "object" ? notes : {};
  const normalized = {};

  Object.entries(source).forEach(([key, value]) => {
    if (!/^\d{1,2},\d{1,2}$/.test(key)) return;
    if (typeof value !== "string") return;
    const text = value.trim().slice(0, 1200);
    if (!text) return;
    normalized[key] = text;
  });

  return normalized;
}

function normalizeCell(cell) {
  if (!cell || typeof cell !== "object") return null;
  if (!Number.isInteger(cell.r) || !Number.isInteger(cell.c)) return null;

  return {
    r: cell.r,
    c: cell.c,
    center: Boolean(cell.center),
    unlocked: Boolean(cell.unlocked),
    completed: Boolean(cell.completed),
    mine: Boolean(cell.mine),
    disarmed: Boolean(cell.disarmed),
    reflected: Boolean(cell.reflected),
    key: typeof cell.key === "string" ? cell.key.slice(0, 40) : "",
    label: typeof cell.label === "string" ? cell.label.slice(0, 80) : "",
    text: typeof cell.text === "string" ? cell.text.slice(0, 220) : "",
  };
}

function normalizeBoardState(boardState) {
  const source = boardState && typeof boardState === "object" ? boardState : {};
  const size = Number.isInteger(source.size) ? Math.max(3, Math.min(31, source.size)) : 11;
  const center = Number.isInteger(source.center) ? source.center : Math.floor(size / 2);
  const cells = Array.isArray(source.cells)
    ? source.cells.map(normalizeCell).filter(Boolean).slice(0, size * size)
    : [];

  return { size, center, cells };
}

function normalizeMapInput(input) {
  const source = input && typeof input === "object" ? input : {};
  const mode = typeof source.mode === "string" && MODES.has(source.mode) ? source.mode : "explore";

  return {
    title: truncateText(source.title, 120, "Mapa sin titulo"),
    people: normalizePeople(source.people),
    notes: normalizeNotes(source.notes),
    boardState: normalizeBoardState(source.boardState),
    mode,
  };
}

function createMapStore({ filePath }) {
  if (!filePath) {
    throw new Error("filePath is required");
  }

  function ensureStore() {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf8");
    }
  }

  function readAll() {
    ensureStore();
    const content = fs.readFileSync(filePath, "utf8");
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeAll(maps) {
    ensureStore();
    const tmpPath = `${filePath}.tmp`;
    fs.writeFileSync(tmpPath, JSON.stringify(maps, null, 2), "utf8");
    fs.renameSync(tmpPath, filePath);
  }

  function listSummaries() {
    return readAll()
      .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
      .map((map) => ({
        id: map.id,
        title: map.title,
        people: map.people,
        updatedAt: map.updatedAt,
        createdAt: map.createdAt,
      }));
  }

  function getById(id) {
    return readAll().find((map) => map.id === id) || null;
  }

  function create(input) {
    const now = new Date().toISOString();
    const maps = readAll();
    const normalized = normalizeMapInput(input);
    const map = {
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...normalized,
    };
    maps.push(map);
    writeAll(maps);
    return map;
  }

  function update(id, input) {
    const maps = readAll();
    const index = maps.findIndex((map) => map.id === id);
    if (index < 0) {
      return null;
    }

    const normalized = normalizeMapInput(input);
    const updated = {
      ...maps[index],
      ...normalized,
      id: maps[index].id,
      createdAt: maps[index].createdAt,
      updatedAt: new Date().toISOString(),
    };

    maps[index] = updated;
    writeAll(maps);
    return updated;
  }

  return {
    ensureStore,
    listSummaries,
    getById,
    create,
    update,
  };
}

module.exports = {
  createMapStore,
  normalizeMapInput,
};
