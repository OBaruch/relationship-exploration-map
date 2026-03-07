const SIZE = 11;
const CENTER = Math.floor(SIZE / 2);

const SECTION_LABELS = {
  confianza: "Confianza",
  comunicacion: "Comunicación",
  intimidad: "Intimidad",
  proyecto: "Proyecto de vida",
  limites: "Límites",
};

const SECTION_ORDER = ["confianza", "comunicacion", "intimidad", "proyecto", "limites"];

const SITUATION_LIBRARY = {
  confianza: [
    { label: "Transparencia", text: "Cuando uno oculta conversaciones en redes y el otro percibe distancia." },
    { label: "Promesa rota", text: "Cuando se promete un cambio importante y no se cumple en el tiempo acordado." },
    { label: "Versiones", text: "Cuando la historia de un hecho cambia y aparece duda sobre la verdad." },
    { label: "Mentira blanca", text: "Cuando se minimiza un dato ‘para evitar conflicto’ y luego genera desconfianza." },
    { label: "Ex pareja", text: "Cuando reaparece contacto con una ex pareja sin acuerdo previo." },
    { label: "Revisar celular", text: "Cuando alguien quiere revisar el teléfono para calmar inseguridad." },
    { label: "Secreto ajeno", text: "Cuando se comparte un secreto de la pareja con amistades o familia." },
    { label: "Lealtad social", text: "Cuando en público uno ridiculiza o desautoriza al otro." },
    { label: "Ausencia emocional", text: "Cuando uno necesita apoyo y el otro se desconecta afectivamente." },
    { label: "Acuerdo roto", text: "Cuando se rompe un acuerdo explícito y no hay reparación inmediata." },
    { label: "Reconstrucción", text: "Cuando hay que recuperar confianza después de una falta seria." },
  ],
  comunicacion: [
    { label: "Interrupciones", text: "Cuando una persona no deja terminar ideas y sube la tensión." },
    { label: "Texto en frío", text: "Cuando una discusión importante se intenta resolver solo por chat." },
    { label: "Silencio tenso", text: "Cuando pasan horas o días sin hablar después de una pelea." },
    { label: "Suposiciones", text: "Cuando se adivinan intenciones sin preguntar directo." },
    { label: "Crítica dura", text: "Cuando se ataca la personalidad y no una conducta puntual." },
    { label: "Pausa sana", text: "Cuando se solicita tiempo para bajar intensidad sin desaparecer." },
    { label: "Feedback", text: "Cuando se pide cambiar un hábito cotidiano que molesta." },
    { label: "Conversación difícil", text: "Cuando se necesita abrir un tema delicado sin escalar." },
    { label: "Disculpa real", text: "Cuando hay daño y hace falta disculpa específica con reparación." },
    { label: "Escucha activa", text: "Cuando uno quiere ser escuchado sin ser corregido de inmediato." },
    { label: "Desacuerdo crónico", text: "Cuando un tema se repite y nunca se cierra del todo." },
  ],
  intimidad: [
    { label: "Frecuencia", text: "Cuando existe diferencia en deseo o frecuencia sexual." },
    { label: "Consentimiento", text: "Cuando hay dudas sobre ritmo, límites y consentimiento explícito." },
    { label: "Afecto público", text: "Cuando no coinciden en mostrar cariño frente a otras personas." },
    { label: "Lenguajes amor", text: "Cuando cada quien expresa amor de forma distinta y no se siente recibido." },
    { label: "Rechazo", text: "Cuando una iniciativa íntima no es correspondida y duele." },
    { label: "Fantasías", text: "Cuando se comparten fantasías y se negocian límites de seguridad." },
    { label: "Rutina íntima", text: "Cuando la intimidad se vuelve mecánica y poco conectada." },
    { label: "Reparación física", text: "Cuando después de una pelea cuesta volver a acercarse." },
    { label: "No sexual", text: "Cuando hace falta intimidad emocional sin componente sexual." },
    { label: "Imagen corporal", text: "Cuando inseguridades físicas afectan el encuentro íntimo." },
    { label: "Reconexión", text: "Cuando hay que reconstruir cercanía tras periodos de distancia." },
  ],
  proyecto: [
    { label: "Presupuesto", text: "Cuando se define cómo dividir gastos y ahorrar cada mes." },
    { label: "Tareas hogar", text: "Cuando la distribución de tareas domésticas se siente injusta." },
    { label: "Carrera", text: "Cuando metas profesionales compiten con el tiempo de pareja." },
    { label: "Mudanza", text: "Cuando surge decisión de cambiar de ciudad o vivienda." },
    { label: "Tiempo pareja", text: "Cuando trabajo y agenda dejan poco espacio de calidad." },
    { label: "Vacaciones", text: "Cuando no coinciden en tipo de descanso o presupuesto de viaje." },
    { label: "Meta anual", text: "Cuando se acuerdan prioridades para los próximos 12 meses." },
    { label: "Deudas", text: "Cuando una deuda personal impacta decisiones compartidas." },
    { label: "Hijos", text: "Cuando hay diferencia sobre tener hijos, cuándo o cómo criarlos." },
    { label: "Eventos familia", text: "Cuando se negocia asistencia a compromisos familiares." },
    { label: "Plan crisis", text: "Cuando se prepara respuesta ante desempleo, enfermedad o emergencia." },
  ],
  limites: [
    { label: "Privacidad digital", text: "Cuando se negocia qué es privado y qué se comparte online." },
    { label: "Tiempo propio", text: "Cuando una persona pide espacio personal sin rechazo." },
    { label: "Coqueteo", text: "Cuando hay conductas ambiguas con terceros en redes o eventos." },
    { label: "Sustancias", text: "Cuando consumo de alcohol u otras sustancias afecta acuerdos." },
    { label: "Sin insultos", text: "Cuando se define el límite de trato durante conflictos." },
    { label: "Violencia cero", text: "Cuando se establece tolerancia cero a agresión verbal o física." },
    { label: "Contacto ex", text: "Cuando se pactan reglas sobre contacto con ex parejas." },
    { label: "Familia intrusiva", text: "Cuando familia externa opina o decide sobre la relación." },
    { label: "Redes sociales", text: "Cuando no coinciden en qué publicar de la vida privada." },
    { label: "Ubicación", text: "Cuando alguien exige reportes o ubicación en tiempo real." },
    { label: "No negociables", text: "Cuando cada quien define límites que no está dispuesto a ceder." },
  ],
};

const ZONES = Array.from({ length: SIZE }, (_, r) =>
  SECTION_ORDER.map((section, index) => {
    const situation = SITUATION_LIBRARY[section][r];
    return {
      r,
      d: index + 1,
      key: `${section}-${r + 1}`,
      label: situation.label,
      section,
      text: situation.text,
    };
  })
).flat();

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
  turnStatus: document.getElementById("turnStatus"),
  actionStatus: document.getElementById("actionStatus"),
  countExplored: document.getElementById("countExplored"),
  countMines: document.getElementById("countMines"),
  countReflected: document.getElementById("countReflected"),
  maleExplorationMeta: document.getElementById("maleExplorationMeta"),
  femaleExplorationMeta: document.getElementById("femaleExplorationMeta"),
  maleExplorationStyle: document.getElementById("maleExplorationStyle"),
  femaleExplorationStyle: document.getElementById("femaleExplorationStyle"),
  maleScoreBar: document.getElementById("maleScoreBar"),
  femaleScoreBar: document.getElementById("femaleScoreBar"),
  explorationLeader: document.getElementById("explorationLeader"),
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
  blockModal: document.getElementById("blockModal"),
  modalTitle: document.getElementById("modalTitle"),
  modalBody: document.getElementById("modalBody"),
  modalUnlockBtn: document.getElementById("modalUnlockBtn"),
  modalSkipBtn: document.getElementById("modalSkipBtn"),
  modalCloseBtn: document.getElementById("modalCloseBtn"),
  introModal: document.getElementById("introModal"),
  introContinueBtn: document.getElementById("introContinueBtn"),
  toggleDocsBtn: document.getElementById("toggleDocsBtn"),
  knowledgeContent: document.getElementById("knowledgeContent"),
};

const appState = {
  board: [],
  notes: {},
  selectedKey: null,
  currentMapId: null,
  showHints: false,
  turn: "male",
  players: {
    male: { r: CENTER, c: CENTER - 1, icon: "👨" },
    female: { r: CENTER, c: CENTER + 1, icon: "👩" },
  },
  modalCell: null,
  docsVisible: true,
  docsPinned: false,
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
    directUnlocked: false,
    mirroredUnlocked: false,
    mirroredBy: null,
    mine: false,
    disarmed: false,
    reflected: false,
    key: "",
    label: "",
    section: "comunicacion",
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
      cell.section = zone.section;
      cell.text = zone.text;
    });
  });
}

function getCellByKey(key) {
  const [rRaw, cRaw] = String(key || "").split(",");
  const r = Number(rRaw);
  const c = Number(cRaw);
  return appState.board[r]?.[c] || null;
}

function getSelectedCell() {
  return getCellByKey(appState.selectedKey);
}

function applyMirror(cell, updater) {
  const mirrored = appState.board[cell.r]?.[mirrorCol(cell.c)];
  if (!mirrored || mirrored.c === cell.c) return;
  updater(mirrored);
}

function isOwnSide(cell, turn) {
  if (cell.center) return false;
  if (turn === "male") return cell.c < CENTER;
  return cell.c > CENTER;
}

function isAdjacent(player, cell) {
  return Math.abs(player.r - cell.r) + Math.abs(player.c - cell.c) === 1;
}

function getPlayerOnCell(cell) {
  if (appState.players.male.r === cell.r && appState.players.male.c === cell.c) return "male";
  if (appState.players.female.r === cell.r && appState.players.female.c === cell.c) return "female";
  return null;
}

function ownerForCell(cell) {
  if (cell.center) return null;
  return cell.c < CENTER ? "male" : "female";
}

function playerLabel(player) {
  return player === "male" ? "Hombre" : "Mujer";
}

function describeTurn() {
  return appState.turn === "male" ? "Turno: 👨 Hombre" : "Turno: 👩 Mujer";
}

function explain(cell) {
  if (cell.center) {
    return "<strong>Centro compartido</strong><br><br>Base segura de la relación.";
  }

  const side = cell.c < CENTER ? "Hombre" : "Mujer";
  let text = `<strong>${cell.label || "Bloque"}</strong><br><br>`;
  text += `Tema: <strong>${SECTION_LABELS[cell.section] || cell.section}</strong>.<br>`;
  text += `${cell.text || "Actividad/acción por definir"}<br><br>`;
  text += `Lado: <strong>${side}</strong>.`;

  if (cell.mine && !cell.disarmed) text += "<br><br>⚠️ No negociable (mina activa).";
  if (cell.directUnlocked) {
    text += `<br><br>✅ Desbloqueado directo por <strong>${playerLabel(ownerForCell(cell))}</strong> (color sólido).`;
  } else if (cell.mirroredUnlocked) {
    text += `<br><br>🪞 Desbloqueado por reflejo desde <strong>${playerLabel(cell.mirroredBy || (ownerForCell(cell) === "male" ? "female" : "male"))}</strong> (color tenue).`;
  } else if (cell.completed) {
    text += "<br><br>✅ Desbloqueado.";
  }

  const note = appState.notes[cellKey(cell)];
  if (note) text += `<br><br><strong>Nota:</strong> ${note}`;

  return text;
}

function setStatus(message, isError = false) {
  els.actionStatus.style.color = isError ? "var(--danger)" : "var(--muted)";
  els.actionStatus.textContent = message;
}

function classifyExploration(stats) {
  if (stats.actions === 0) return "Conservador/a (sin explorar aún)";
  if (stats.maxDepth >= 4 || stats.score >= 16) return "Aventurero/a";
  if (stats.maxDepth <= 2 && stats.actions <= 2) return "Conservador/a";
  return "Intermedio/a";
}

function computeExplorationStats(player) {
  const stats = {
    actions: 0,
    mirrored: 0,
    depthSum: 0,
    maxDepth: 0,
    avgDepth: 0,
    score: 0,
    style: "Conservador/a",
  };

  appState.board.flat().forEach((cell) => {
    if (cell.center) return;
    if (ownerForCell(cell) !== player) return;

    const depth = Math.abs(cell.c - CENTER);

    if (cell.directUnlocked) {
      stats.actions += 1;
      stats.depthSum += depth;
      stats.maxDepth = Math.max(stats.maxDepth, depth);
    } else if (cell.mirroredUnlocked) {
      stats.mirrored += 1;
    }
  });

  stats.avgDepth = stats.actions > 0 ? stats.depthSum / stats.actions : 0;
  stats.score = Number((stats.actions * 2 + stats.avgDepth * 2.5 + stats.maxDepth * 1.5).toFixed(2));
  stats.style = classifyExploration(stats);

  return stats;
}

function updateExplorationPanel() {
  if (!els.maleExplorationMeta || !els.femaleExplorationMeta) return;

  const male = computeExplorationStats("male");
  const female = computeExplorationStats("female");

  const maxScore = Math.max(male.score, female.score, 1);

  els.maleExplorationMeta.textContent = `Acciones ${male.actions} · Reflejos ${male.mirrored} · Profundidad ${male.maxDepth}`;
  els.femaleExplorationMeta.textContent = `Acciones ${female.actions} · Reflejos ${female.mirrored} · Profundidad ${female.maxDepth}`;
  els.maleExplorationStyle.textContent = male.style;
  els.femaleExplorationStyle.textContent = female.style;

  els.maleScoreBar.style.width = `${Math.max(6, (male.score / maxScore) * 100)}%`;
  els.femaleScoreBar.style.width = `${Math.max(6, (female.score / maxScore) * 100)}%`;

  const diff = male.score - female.score;
  if (Math.abs(diff) < 0.85) {
    els.explorationLeader.textContent = "Exploración: equilibrio entre ambos.";
  } else if (diff > 0) {
    els.explorationLeader.textContent = "Exploración: Hombre más aventurero en este mapa.";
  } else {
    els.explorationLeader.textContent = "Exploración: Mujer más aventurera en este mapa.";
  }
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
  els.turnStatus.textContent = describeTurn();
  updateExplorationPanel();
}

function updateDetail(cell) {
  els.detail.innerHTML = explain(cell);
  els.noteCellKey.value = cellKey(cell);
  els.noteText.value = appState.notes[cellKey(cell)] || "";
}

function openModalForCell(cell) {
  appState.modalCell = cell;
  els.modalTitle.textContent = `${cell.label || "Bloque"} (${cell.r},${cell.c})`;
  els.modalBody.textContent = `${cell.text || "Actividad/acción del bloque."} ¿Deseas desbloquearlo ahora?`;
  els.modalUnlockBtn.disabled = cell.mine && !cell.disarmed;
  if (els.blockModal.showModal) els.blockModal.showModal();
}

function closeModal() {
  appState.modalCell = null;
  if (els.blockModal.open) els.blockModal.close();
}

function openIntroModal() {
  if (!els.introModal) return;
  if (els.introModal.showModal && !els.introModal.open) {
    els.introModal.showModal();
  }
}

function closeIntroModal() {
  if (!els.introModal) return;
  if (els.introModal.open) els.introModal.close();
}

function isMobileView() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function updateResponsiveBoardSize() {
  const parentWidth = els.board?.parentElement?.clientWidth || window.innerWidth;
  const usable = Math.max(280, parentWidth - 28);
  const gap = 4;
  const boardPadding = 24;
  const rawSize = Math.floor((usable - boardPadding - gap * (SIZE - 1)) / SIZE);
  const cellSize = Math.max(28, Math.min(48, rawSize));
  document.documentElement.style.setProperty("--cell-size", `${cellSize}px`);
}

function setKnowledgeVisible(visible) {
  appState.docsVisible = Boolean(visible);
  if (els.knowledgeContent) {
    els.knowledgeContent.hidden = !appState.docsVisible;
  }
  if (els.toggleDocsBtn) {
    els.toggleDocsBtn.textContent = appState.docsVisible ? "Ocultar guía extendida" : "Mostrar guía extendida";
    els.toggleDocsBtn.setAttribute("aria-expanded", String(appState.docsVisible));
  }
}

function render() {
  els.board.innerHTML = "";
  updateResponsiveBoardSize();
  els.board.style.gridTemplateColumns = `repeat(${SIZE}, var(--cell-size))`;

  appState.board.forEach((row) => {
    row.forEach((cell) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `cell section-${cell.section}`;

      if (cell.center) button.classList.add("center");
      if (cell.unlocked && !cell.center) button.classList.add("unlocked");
      if (cell.mine && !cell.disarmed) button.classList.add("mine");
      if (cell.disarmed) button.classList.add("disarmed");
      if (cell.reflected) button.classList.add("reflected");
      if (!cell.unlocked && !cell.center) button.classList.add("blocked");
      if (appState.selectedKey === cellKey(cell)) button.classList.add("selected");

      if (cell.directUnlocked && !cell.center) {
        const owner = ownerForCell(cell);
        button.classList.add(`direct-${owner}`);
      } else if (cell.mirroredUnlocked && !cell.center) {
        button.classList.add("mirrored-soft");
        if (cell.mirroredBy === "male") button.classList.add("mirror-from-male");
        if (cell.mirroredBy === "female") button.classList.add("mirror-from-female");
      } else if (cell.completed && !cell.center) {
        button.classList.add("completed");
      }

      const occupied = getPlayerOnCell(cell);
      if (occupied === "male") button.textContent = "👨";
      else if (occupied === "female") button.textContent = "👩";
      else if (cell.mine && !cell.disarmed) button.textContent = "💣";
      else if ((appState.showHints || cell.completed) && cell.label) button.textContent = cell.label.slice(0, 3).toUpperCase();

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
  if (selected) updateDetail(selected);
  else {
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
    node.classList.toggle("selected", keys.has(`${r},${c}`));
  });
}

function nextTurn() {
  appState.turn = appState.turn === "male" ? "female" : "male";
}

function unlockCellForCurrentTurn(cell) {
  const player = appState.turn === "male" ? appState.players.male : appState.players.female;

  if (!isOwnSide(cell, appState.turn)) {
    setStatus("Solo puedes desbloquear bloques de tu lado.", true);
    return;
  }

  if (!isAdjacent(player, cell)) {
    setStatus("Movimiento inválido: solo arriba, abajo, izquierda o derecha desde tu posición.", true);
    return;
  }

  if (cell.mine && !cell.disarmed) {
    setStatus("Ese bloque es no negociable (mina activa).", true);
    return;
  }

  cell.completed = true;
  cell.unlocked = true;
  cell.directUnlocked = true;
  cell.mirroredUnlocked = false;
  cell.mirroredBy = null;

  applyMirror(cell, (mirror) => {
    mirror.completed = true;
    mirror.unlocked = true;
    if (!mirror.directUnlocked) {
      mirror.mirroredUnlocked = true;
      mirror.mirroredBy = appState.turn;
    }
  });

  player.r = cell.r;
  player.c = cell.c;

  setStatus(`Bloque desbloqueado por ${playerLabel(appState.turn)}.`);
  nextTurn();
  render();
}

function skipCellForCurrentTurn(cell) {
  cell.reflected = true;
  applyMirror(cell, (mirror) => {
    mirror.reflected = true;
  });
  setStatus(`${playerLabel(appState.turn)} decidió no realizar este bloque por ahora.`);
  nextTurn();
  render();
}

function handleCellClick(cell) {
  appState.selectedKey = cellKey(cell);

  if (cell.center) {
    render();
    return;
  }

  if (els.toolMode.value === "mine") {
    if (!isOwnSide(cell, appState.turn)) {
      setStatus("Marca minas solo en tu lado en tu turno.", true);
      render();
      return;
    }
    cell.mine = !(cell.mine && !cell.disarmed);
    cell.disarmed = false;
    if (cell.mine) {
      cell.completed = false;
      cell.directUnlocked = false;
      cell.mirroredUnlocked = false;
      cell.mirroredBy = null;
    }
    applyMirror(cell, (mirror) => {
      mirror.mine = cell.mine;
      mirror.disarmed = cell.disarmed;
      if (cell.mine) {
        mirror.completed = false;
        mirror.directUnlocked = false;
        mirror.mirroredUnlocked = false;
        mirror.mirroredBy = null;
      }
    });
    setStatus(cell.mine ? "No negociable marcado (mina activa)." : "Mina removida.");
    render();
    return;
  }

  if (els.toolMode.value === "reflect") {
    cell.reflected = !cell.reflected;
    applyMirror(cell, (mirror) => {
      mirror.reflected = cell.reflected;
    });
    setStatus("Bloque marcado como revisado.");
    render();
    return;
  }

  openModalForCell(cell);
}

function boardPayload() {
  return {
    size: SIZE,
    center: CENTER,
    turn: appState.turn,
    players: appState.players,
    cells: appState.board.flat().map((cell) => ({
      r: cell.r,
      c: cell.c,
      center: cell.center,
      unlocked: cell.unlocked,
      completed: cell.completed,
      directUnlocked: cell.directUnlocked,
      mirroredUnlocked: cell.mirroredUnlocked,
      mirroredBy: cell.mirroredBy,
      mine: cell.mine,
      disarmed: cell.disarmed,
      reflected: cell.reflected,
      key: cell.key,
      label: cell.label,
      text: cell.text,
      section: cell.section,
    })),
  };
}

function restoreBoard(payload) {
  buildInitialBoard();
  if (!payload || !Array.isArray(payload.cells)) return;

  payload.cells.forEach((cell) => {
    if (!appState.board[cell.r]?.[cell.c]) return;
    appState.board[cell.r][cell.c] = { ...appState.board[cell.r][cell.c], ...cell };
  });

  if (payload.players && payload.players.male && payload.players.female) {
    appState.players = payload.players;
  }
  if (payload.turn === "male" || payload.turn === "female") {
    appState.turn = payload.turn;
  }
}

function currentMapPayload() {
  return {
    title: els.mapTitle.value.trim() || "Mapa sin titulo",
    people: { personA: "Hombre", personB: "Mujer" },
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
    option.textContent = `${item.title} | ${new Date(item.updatedAt).toLocaleString()}`;
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
  els.personA.value = "Hombre";
  els.personB.value = "Mujer";
  els.toolMode.value = ["explore", "mine", "reflect"].includes(map.mode) ? map.mode : "explore";
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
  appState.turn = "male";
  appState.players = {
    male: { r: CENTER, c: CENTER - 1, icon: "👨" },
    female: { r: CENTER, c: CENTER + 1, icon: "👩" },
  };
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

  els.modalUnlockBtn.addEventListener("click", () => {
    const cell = appState.modalCell;
    closeModal();
    if (!cell) return;
    unlockCellForCurrentTurn(cell);
  });

  els.modalSkipBtn.addEventListener("click", () => {
    const cell = appState.modalCell;
    closeModal();
    if (!cell) return;
    skipCellForCurrentTurn(cell);
  });

  els.modalCloseBtn.addEventListener("click", closeModal);

  if (els.introContinueBtn) {
    els.introContinueBtn.addEventListener("click", closeIntroModal);
  }

  if (els.toggleDocsBtn) {
    els.toggleDocsBtn.addEventListener("click", () => {
      appState.docsPinned = true;
      setKnowledgeVisible(!appState.docsVisible);
    });
  }

  window.addEventListener("resize", () => {
    updateResponsiveBoardSize();
    if (!appState.docsPinned) {
      setKnowledgeVisible(!isMobileView());
    }
  });

  window.addEventListener("orientationchange", () => {
    updateResponsiveBoardSize();
  });
}

async function init() {
  buildInitialBoard();
  bindEvents();
  updateResponsiveBoardSize();
  setKnowledgeVisible(!isMobileView());
  render();
  await Promise.all([checkHealth(), refreshMaps().catch(() => null)]);
  setStatus("App lista. Turnos activos: desbloqueo alternado 1 en 1.");
  openIntroModal();
}

init();
