const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { createStore, ensureDbShape } = require('../../packages/db/store');

test('ensureDbShape normalizes missing collections', () => {
  const shaped = ensureDbShape({
    users: [{ id: 'u1' }],
    notes: 'not-an-array',
  });

  assert.deepEqual(shaped, {
    users: [{ id: 'u1' }],
    sessions: [],
    notes: [],
    subscriptions: [],
    invoices: [],
  });
});

test('createStore reads, writes, and updates db data', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'cartographed-store-test-'));
  const dbPath = path.join(tempDir, 'db.json');
  const store = createStore(dbPath);

  const initial = await store.readDb();
  assert.equal(Array.isArray(initial.users), true);
  assert.equal(initial.users.length, 0);

  await store.writeDb({
    users: [{ id: 'u1', username: 'alice' }],
    sessions: [],
    notes: [],
    subscriptions: [],
    invoices: [],
  });

  const written = await store.readDb();
  assert.equal(written.users.length, 1);
  assert.equal(written.users[0].username, 'alice');

  const updateResult = await store.updateDb((db) => {
    db.notes.push({ id: 'n1', userId: 'u1', text: 'hello', createdAt: new Date().toISOString() });
    return db.notes.length;
  });

  assert.equal(updateResult, 1);

  const updated = await store.readDb();
  assert.equal(updated.notes.length, 1);
  assert.equal(updated.notes[0].text, 'hello');
});
