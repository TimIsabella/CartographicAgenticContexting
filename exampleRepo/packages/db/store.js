const fs = require('node:fs/promises');
const path = require('node:path');

const EMPTY_DB = Object.freeze({
  users: [],
  sessions: [],
  notes: [],
  subscriptions: [],
  invoices: [],
});

function ensureDbShape(candidate = {}) {
  return {
    users: Array.isArray(candidate.users) ? candidate.users : [],
    sessions: Array.isArray(candidate.sessions) ? candidate.sessions : [],
    notes: Array.isArray(candidate.notes) ? candidate.notes : [],
    subscriptions: Array.isArray(candidate.subscriptions) ? candidate.subscriptions : [],
    invoices: Array.isArray(candidate.invoices) ? candidate.invoices : [],
  };
}

function createStore(filePath) {
  if (!filePath) {
    throw new Error('A database file path is required.');
  }

  async function readDb() {
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      return ensureDbShape(JSON.parse(raw));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      return ensureDbShape(EMPTY_DB);
    }
  }

  async function writeDb(db) {
    const shaped = ensureDbShape(db);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, `${JSON.stringify(shaped, null, 2)}\n`);
    return shaped;
  }

  async function updateDb(mutator) {
    const db = await readDb();
    const result = await mutator(db);
    await writeDb(db);
    return result;
  }

  return {
    filePath,
    readDb,
    writeDb,
    updateDb,
  };
}

module.exports = {
  createStore,
  ensureDbShape,
};
