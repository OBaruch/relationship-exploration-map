const path = require("path");
const os = require("os");
const fs = require("fs");
const test = require("node:test");
const assert = require("node:assert/strict");
const { createMapStore } = require("../src/server/storage/mapStore");

function makeStore() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "map-store-"));
  const filePath = path.join(tmpDir, "maps.json");
  const store = createMapStore({ filePath });
  return { tmpDir, filePath, store };
}

test("create map applies defaults and stores record", () => {
  const { store } = makeStore();
  const created = store.create({
    title: "Sesion 1",
    people: { personA: "Ana", personB: "Luis" },
    boardState: { size: 11, center: 5, cells: [] },
  });

  assert.ok(created.id);
  assert.equal(created.title, "Sesion 1");
  assert.equal(created.people.personA, "Ana");
  assert.equal(created.people.personB, "Luis");
  assert.equal(created.mode, "explore");
});

test("update map modifies title and keeps identity fields", () => {
  const { store } = makeStore();
  const created = store.create({ title: "Inicial" });
  const updated = store.update(created.id, { title: "Actualizado", mode: "mine" });

  assert.ok(updated);
  assert.equal(updated.id, created.id);
  assert.equal(updated.createdAt, created.createdAt);
  assert.equal(updated.title, "Actualizado");
  assert.equal(updated.mode, "mine");
});

test("list summaries returns records sorted by updatedAt desc", () => {
  const { store } = makeStore();
  const first = store.create({ title: "Primero" });
  const second = store.create({ title: "Segundo" });
  store.update(first.id, { title: "Primero editado" });

  const summaries = store.listSummaries();
  assert.equal(summaries.length, 2);
  assert.equal(summaries[0].id, first.id);
  assert.equal(summaries[1].id, second.id);
});

test("notes are sanitized and empty values are removed", () => {
  const { store } = makeStore();
  const created = store.create({
    notes: {
      "1,2": "nota valida",
      "foo": "invalida",
      "8,9": "   ",
    },
  });

  assert.deepEqual(created.notes, { "1,2": "nota valida" });
});
