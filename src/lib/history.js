// Historique des estimations — stockage LOCAL uniquement (localStorage).
// Aucune donnée n'est envoyée à un serveur. Si le stockage est indisponible,
// l'application fonctionne normalement, sans historique.

const KEY = "chevillette_history_v1";
const MAX_ENTRIES = 50;

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Stockage indisponible : on ignore silencieusement.
  }
}

export function getHistory() {
  return read();
}

export function addEntry(entry) {
  const list = read();
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const newEntry = { id, date: new Date().toISOString(), ...entry };
  list.unshift(newEntry);
  write(list.slice(0, MAX_ENTRIES));
  return newEntry;
}

export function removeEntry(id) {
  write(read().filter((e) => e.id !== id));
}

export function clearHistory() {
  write([]);
}