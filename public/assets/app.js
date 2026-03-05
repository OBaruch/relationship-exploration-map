const SIZE = 11;
const CENTER = Math.floor(SIZE / 2);

const ZONES = [
  { r: 1, d: 1, key: "confianza", label: "Confianza", text: "Separarse sin leer abandono inmediato." },
  { r: 1, d: 3, key: "viajes", label: "Viajes", text: "Explorar mundo nuevo con acuerdos claros." },
  { r: 2, d: 2, key: "amistades", label: "Amistades", text: "Integracion saludable de terceros y circulos." },
  { r: 2, d: 4, key: "novedad", label: "Novedad", text: "Curiosidad, juego y crecimiento compartido." },
  { r: 3, d: 1, key: "espacio", label: "Espacio", text: "Autonomia, tiempos propios y privacidad." },
  { r: 3, d: 3, key: "trabajo", label: "Trabajo", text: "Metas, ritmos laborales y apoyo mutuo." },
  { r: 4, d: 2, key: "familia", label: "Familia", text: "Vinculo con familias de origen y limites externos." },
  { r: 5, d: 1, key: "rutina", label: "Rutina", text: "Convivencia, cuidado diario y coordinacion." },
  { r: 6, d: 1, key: "vulnerabilidad", label: "Vulnerabilidad", text: "Pedir ayuda, abrir miedo y sostener ternura." },
  { r: 7, d: 2, key: "sexualidad", label: "Sexualidad", text: "Deseo, intimidad y acuerdos eroticos." },
  { r: 8, d: 1, key: "celos", label: "Celos", text: "Temor de perdida, comparacion y seguridad." },
  { r: 8, d: 3, key: "secretos", label: "Secretos", text: "Informacion sensible y transparencia viable." },
  { r: 9, d: 2, key: "control", label: "Control", text: "Rigidez, vigilancia o miedo a soltar." },
  { r: 9, d: 4, key: "traicion", label: "Traicion", text: "Ruptura severa de acuerdos relacionales." },
  { r: 10, d: 3, key: "reparacion", label: "Reparacion", text: "Trabajo posterior al dano y resignificacion." },
];

const els = {
  board: document.getElementById("board"),
  detail: document.getElementById("detail"),
  mapTitle: document.getElementById("mapTitle"),
  personA: document.getElementById("personA"),
  personB: document.getElementById("personB"),
  toolMode: document.getElementById("toolMode"),
  mapIdInput: document.getElementById("mapIdInput"),
  savedMaps: document.getElementById("savedMaps"),
  healthStatus: document.getElementById("healthStatus"),
  actionStatus: document.getElementById("actionStatus"),
  countExplored: document.getElementById("countExplored"),
  countMines: document.getElementById("countMines"),
  countReflected: document.getElementById("countReflected"),
  noteCellKey: document.getElementById("noteCellKey"),
  noteText: document.getElementById("noteText"),
  newBtn: document.getElementById("newBtn"),
  hintsBtn: document.getElementById("hintsBtn"),
  saveBtn: document.getElementById("saveBtn"),
  loadByIdBtn: document.getElementById("loadByIdBtn"),
  loadSelectedBtn: document.getElementById("loadSelectedBtn"),
  refreshBtn: document.getElementById("refreshBtn"),
  saveNoteBtn: document.getElementById("saveNoteBtn"),
  clearNoteBtn: document.getElementById("clearNoteBtn"),
};

const appState = {
  board: [],
  notes: {},
  selectedKey: null,
  currentMapId: null,
  showHints: false,
};

function cellKey(cell) {
  return `${cell.r},${cell.c}`;
}

function mirrorCol(col) {
  return SIZE - 1 - col;
}

function createCell(r, c) {
  return {
    r,
    c,
    center: c === CENTER,
    unlocked: c === CENTER || Math.abs(c - CENTER) === 1,
    completed: c === CENTER,
    mine: false,
    disarmed: false,
    reflected: false,
    key: "",
    label: "",
    text: "",
  };
}

function buildInitialBoard() {
  appState.board = Array.from({ length: SIZE }, (_, r) =>
    Array.from({ length: SIZE }, (_, c) => createCell(r, c))
  );

  ZONES.forEach((zone) => {
    const cols = [CENTER - zone.d, CENTER + zone.d];
    cols.forEach((col) => {
      const cell = appState.board[zone.r][col];
      cell.key = zone.key;
      cell.label = zone.label;
      cell.text = zone.text;
    });
  });
}

function getSelectedCell() {
  if (!appState.selectedKey) return null;
  const [rRaw, cRaw] = appState.selectedKey.split(",");
  const r = Number(rRaw);
  const c = Number(cRaw);
  if (!Number.isInteger(r) || !Number.isInteger(c)) return null;
  return appState.board[r]?.[c] || null;
}

function applyMirror(cell, updater) {
  const mirrored = appState.board[cell.r]?.[mirrorCol(cell.c)];
  if (!mirrored || mirrored.c === cell.c) return;
  updater(mirrored);
}

function unlockAround(cell) {
  const distance = Math.abs(cell.c - CENTER);
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  dirs.forEach(([dr, dc]) => {
    const nr = cell.r + dr;
    const nc = cell.c + dc;
    const target = appState.board[nr]?.[nc];
    if (!target) return;
    if (Math.abs(target.c - CENTER) <= distance + 1) {
      target.unlocked = true;
      applyMirror(target, (m) => {
        m.unlocked = true;
      });
    }
  });
}

function explain(cell) {
  if (cell.center) {
    return "<strong>Centro compartido</strong><br><br>Representa la base segura: pertenencia, regreso y coordinacion.";
  }

  const side =
    cell.c < CENTER
      ? (els.personA.value.trim() || "Persona A")
      : (els.personB.value.trim() || "Persona B");

  let text = `<strong>${cell.label || "Bloque libre"}</strong><br><br>`;
  text += `${cell.text || "Zona relacional abierta."}<br><br>`;
  text += `<em>Lado: ${side}</em>.`;

  if (cell.mine && !cell.disarmed) {
    text += "<br><br>Estado: <strong>Mina activa</strong>.";
  } else if (cell.disarmed) {
    text += "<br><br>Estado: <strong>Mina transformada</strong>.";
  } else if (cell.reflected) {
    text += "<br><br>Estado: <strong>Reflexionado</strong>.";
  } else if (cell.completed) {
    text += "<br><br>Estado: <strong>Completado</strong>.";
  } else if (cell.unlocked) {
    text += "<br><br>Estado: <strong>Desbloqueado</strong>.";
  } else {
    text += "<br><br>Estado: <strong>Bloqueado</strong>.";
  }

  const note = appState.notes[cellKey(cell)];
  if (note) {
    text += `<br><br><strong>Nota:</strong> ${note}`;
  }

  return text;
}

function setStatus(message, isError = false) {
  els.actionStatus.style.color = isError ? "var(--danger)" : "var(--muted)";
  els.actionStatus.textContent = message;
}

function updateStats() {
  let explored = 0;
  let mines = 0;
  let reflected = 0;

  appState.board.flat().forEach((cell) => {
    if (!cell.center && cell.completed) explored += 1;
    if (cell.mine && !cell.disarmed) mines += 1;
    if (!cell.center && cell.reflected) reflected += 1;
  });

  els.countExplored.textContent = String(explored);
  els.countMines.textContent = String(mines);
  els.countReflected.textContent = String(reflected);
}

function updateDetail(cell) {
  els.detail.innerHTML = explain(cell);
  els.noteCellKey.value = cellKey(cell);
  els.noteText.value = appState.notes[cellKey(cell)] || "";
}

function render() {
  els.board.innerHTML = "";
  els.board.style.gridTemplateColumns = `repeat(${SIZE}, 48px)`;

  appState.board.forEach((row) => {
    row.forEach((cell) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "cell";

      if (cell.center) button.classList.add("center");
      if (cell.unlocked && !cell.center) button.classList.add("unlocked");
      if (cell.completed && !cell.center) button.classList.add("completed");
      if (cell.mine && !cell.disarmed) button.classList.add("mine");
      if (cell.disarmed) button.classList.add("disarmed");
      if (cell.reflected) button.classList.add("reflected");
      if (!cell.unlocked && !cell.center) button.classList.add("blocked");
      if (appState.selectedKey === cellKey(cell)) button.classList.add("selected");

      if (cell.center) {
        button.textContent = "||";
      } else if (cell.mine && !cell.disarmed) {
        button.textContent = "X";
      } else if (cell.disarmed) {
        button.textContent = "OK";
      } else if (cell.reflected) {
        button.textContent = "R";
      } else if ((appState.showHints || cell.completed) && cell.label) {
        button.textContent = cell.label.slice(0, 3).toUpperCase();
      }

      button.addEventListener("mouseenter", () => {
        appState.selectedKey = cellKey(cell);
        updateDetail(cell);
        renderSelectionOnly();
      });

      button.addEventListener("click", () => {
        handleCellClick(cell);
      });

      els.board.appendChild(button);
    });
  });

  const selected = getSelectedCell();
  if (selected) {
    updateDetail(selected);
  } else {
    els.detail.innerHTML = "Selecciona un bloque para ver su lectura y registrar notas.";
    els.noteCellKey.value = "Ninguno";
    els.noteText.value = "";
  }

  updateStats();
}

function renderSelectionOnly() {
  const keys = new Set([appState.selectedKey]);
  els.board.querySelectorAll(".cell").forEach((node, index) => {
    const r = Math.floor(index / SIZE);
    const c = index % SIZE;
    const key = `${r},${c}`;
    node.classList.toggle("selected", keys.has(key));
  });
}

function handleCellClick(cell) {
  const mode = els.toolMode.value;

  if (mode === "mine") {
    if (cell.center) return;
    const active = !(cell.mine && !cell.disarmed);
    cell.mine = active;
    cell.disarmed = false;
    cell.reflected = false;
    if (active) cell.completed = false;
    applyMirror(cell, (m) => {
      m.mine = active;
      m.disarmed = false;
      m.reflected = false;
      if (active) m.completed = false;
    });
  } else if (mode === "transform") {
    if (cell.center) return;
    if (cell.mine || cell.disarmed) {
      cell.mine = false;
      cell.disarmed = true;
      cell.completed = true;
      cell.unlocked = true;
      applyMirror(cell, (m) => {
        m.mine = false;
        m.disarmed = true;
        m.completed = true;
        m.unlocked = true;
      });
      unlockAround(cell);
    }
  } else if (mode === "complete") {
    if (cell.center || !cell.unlocked || (cell.mine && !cell.disarmed)) return;
    cell.completed = !cell.completed;
    if (cell.completed) unlockAround(cell);
  } else if (mode === "reflect") {
    if (cell.center || !cell.unlocked || (cell.mine && !cell.disarmed)) return;
    cell.reflected = !cell.reflected;
    applyMirror(cell, (m) => {
      m.reflected = cell.reflected;
    });
  } else {
    if (cell.center || !cell.unlocked || (cell.mine && !cell.disarmed)) return;
    cell.completed = true;
    unlockAround(cell);
  }

  appState.selectedKey = cellKey(cell);
  render();
}

function boardPayload() {
  return {
    size: SIZE,
    center: CENTER,
    cells: appState.board.flat().map((cell) => ({
      r: cell.r,
      c: cell.c,
      center: cell.center,
      unlocked: cell.unlocked,
      completed: cell.completed,
      mine: cell.mine,
      disarmed: cell.disarmed,
      reflected: cell.reflected,
      key: cell.key,
      label: cell.label,
      text: cell.text,
    })),
  };
}

function restoreBoard(payload) {
  if (!payload || !Array.isArray(payload.cells)) {
    buildInitialBoard();
    return;
  }

  const fresh = Array.from({ length: SIZE }, (_, r) =>
    Array.from({ length: SIZE }, (_, c) => createCell(r, c))
  );

  payload.cells.forEach((cell) => {
    if (!fresh[cell.r]?.[cell.c]) return;
    fresh[cell.r][cell.c] = { ...fresh[cell.r][cell.c], ...cell };
  });

  appState.board = fresh;
}

function currentMapPayload() {
  return {
    title: els.mapTitle.value.trim() || "Mapa sin titulo",
    people: {
      personA: els.personA.value.trim() || "Persona A",
      personB: els.personB.value.trim() || "Persona B",
    },
    mode: els.toolMode.value,
    boardState: boardPayload(),
    notes: appState.notes,
  };
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || `HTTP ${response.status}`);
  }
  return response.json();
}

async function checkHealth() {
  try {
    const health = await api("/api/health");
    els.healthStatus.value = `OK ${health.now}`;
  } catch {
    els.healthStatus.value = "Sin conexion";
  }
}

async function refreshMaps() {
  const response = await api("/api/maps");
  const previous = els.savedMaps.value;
  els.savedMaps.innerHTML = "";

  if (!response.items.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Sin mapas guardados";
    els.savedMaps.appendChild(option);
    return;
  }

  response.items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = `${item.title} | ${item.people?.personA || "A"} - ${item.people?.personB || "B"} | ${new Date(item.updatedAt).toLocaleString()}`;
    els.savedMaps.appendChild(option);
  });

  if (previous && response.items.some((item) => item.id === previous)) {
    els.savedMaps.value = previous;
  }
}

async function saveMap() {
  const payload = currentMapPayload();
  if (!appState.currentMapId) {
    const created = await api("/api/maps", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    appState.currentMapId = created.id;
    els.mapIdInput.value = created.id;
    setStatus(`Mapa creado con ID: ${created.id}`);
  } else {
    await api(`/api/maps/${appState.currentMapId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    setStatus(`Mapa ${appState.currentMapId} actualizado.`);
  }
  await refreshMaps();
}

async function loadMap(id) {
  const mapId = String(id || "").trim();
  if (!mapId) {
    setStatus("Ingresa un ID valido.", true);
    return;
  }

  const map = await api(`/api/maps/${mapId}`);
  appState.currentMapId = map.id;
  els.mapIdInput.value = map.id;
  els.mapTitle.value = map.title || "";
  els.personA.value = map.people?.personA || "Persona A";
  els.personB.value = map.people?.personB || "Persona B";
  els.toolMode.value = map.mode || "explore";
  appState.notes = map.notes && typeof map.notes === "object" ? map.notes : {};
  appState.selectedKey = null;
  restoreBoard(map.boardState);
  render();
  setStatus(`Mapa ${map.id} cargado.`);
}

function resetMap() {
  buildInitialBoard();
  appState.notes = {};
  appState.selectedKey = null;
  appState.currentMapId = null;
  els.mapIdInput.value = "";
  els.mapTitle.value = "";
  render();
  setStatus("Mapa reiniciado.");
}

function saveCurrentNote() {
  const selected = getSelectedCell();
  if (!selected) {
    setStatus("Selecciona un bloque para guardar nota.", true);
    return;
  }
  const key = cellKey(selected);
  const note = els.noteText.value.trim();
  if (note) appState.notes[key] = note;
  else delete appState.notes[key];
  render();
  setStatus("Nota actualizada localmente. Guarda el mapa para persistir.");
}

function clearCurrentNote() {
  const selected = getSelectedCell();
  if (!selected) return;
  delete appState.notes[cellKey(selected)];
  els.noteText.value = "";
  render();
  setStatus("Nota eliminada.");
}

function bindEvents() {
  els.newBtn.addEventListener("click", resetMap);
  els.hintsBtn.addEventListener("click", () => {
    appState.showHints = !appState.showHints;
    els.hintsBtn.textContent = appState.showHints ? "Ocultar etiquetas" : "Mostrar etiquetas";
    render();
  });

  els.saveBtn.addEventListener("click", async () => {
    try {
      await saveMap();
    } catch (error) {
      setStatus(`Error al guardar: ${error.message}`, true);
    }
  });

  els.loadByIdBtn.addEventListener("click", async () => {
    try {
      await loadMap(els.mapIdInput.value);
    } catch (error) {
      setStatus(`Error al cargar por ID: ${error.message}`, true);
    }
  });

  els.loadSelectedBtn.addEventListener("click", async () => {
    try {
      await loadMap(els.savedMaps.value);
    } catch (error) {
      setStatus(`Error al cargar seleccionado: ${error.message}`, true);
    }
  });

  els.refreshBtn.addEventListener("click", async () => {
    try {
      await refreshMaps();
      setStatus("Lista actualizada.");
    } catch (error) {
      setStatus(`Error al actualizar lista: ${error.message}`, true);
    }
  });

  els.saveNoteBtn.addEventListener("click", saveCurrentNote);
  els.clearNoteBtn.addEventListener("click", clearCurrentNote);
}

async function init() {
  buildInitialBoard();
  bindEvents();
  render();
  await Promise.all([checkHealth(), refreshMaps().catch(() => null)]);
  setStatus("App lista. Crea o carga un mapa.");
}

init();
