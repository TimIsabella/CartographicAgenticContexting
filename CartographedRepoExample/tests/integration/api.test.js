const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const net = require('node:net');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');
const { spawn } = require('node:child_process');

const REPO_ROOT = path.resolve(__dirname, '../..');

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, () => {
      const address = server.address();
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(address.port);
      });
    });
    server.once('error', reject);
  });
}

async function waitForHealth(baseUrl, timeoutMs = 5000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch {
      // Retry until timeout.
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error('Server did not become healthy in time.');
}

test('API supports auth, notes, and billing workflow', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'cartographed-api-test-'));
  const dbPath = path.join(tempDir, 'db.json');
  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  let cookie = '';

  const serverProcess = spawn(process.execPath, ['apps/api/src/server.js'], {
    cwd: REPO_ROOT,
    env: {
      ...process.env,
      PORT: String(port),
      DB_FILE_PATH: dbPath,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let stderr = '';
  serverProcess.stderr.on('data', (chunk) => {
    stderr += chunk.toString('utf8');
  });

  async function api(pathname, options = {}) {
    const headers = {
      ...(options.headers ?? {}),
    };

    if (cookie) {
      headers.Cookie = cookie;
    }

    const response = await fetch(`${baseUrl}${pathname}`, {
      ...options,
      headers,
    });

    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      cookie = setCookie.split(';')[0];
    }

    const text = await response.text();
    const body = text ? JSON.parse(text) : {};

    return { status: response.status, body };
  }

  try {
    await waitForHealth(baseUrl);

    let result = await api('/api/session');
    assert.equal(result.status, 401);

    result = await api('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'alice', password: 'password1234' }),
    });
    assert.equal(result.status, 201);
    assert.equal(result.body.user.username, 'alice');
    assert.ok(cookie.startsWith('sessionId='));

    result = await api('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'first note' }),
    });
    assert.equal(result.status, 201);
    assert.equal(result.body.note.text, 'first note');

    result = await api('/api/notes');
    assert.equal(result.status, 200);
    assert.equal(result.body.notes.length, 1);

    result = await api('/api/billing/plans');
    assert.equal(result.status, 200);
    assert.equal(result.body.plans.length >= 2, true);

    result = await api('/api/billing/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId: 'starter' }),
    });
    assert.equal(result.status, 201);
    assert.equal(result.body.subscription.planId, 'starter');

    result = await api('/api/billing/subscription');
    assert.equal(result.status, 200);
    assert.equal(result.body.subscription.planId, 'starter');
    assert.equal(result.body.invoices.length, 1);

    result = await api('/api/logout', { method: 'POST' });
    assert.equal(result.status, 200);

    result = await api('/api/notes');
    assert.equal(result.status, 401);

    result = await api('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'alice', password: 'password1234' }),
    });
    assert.equal(result.status, 200);
    assert.equal(result.body.user.username, 'alice');

    result = await api('/api/session');
    assert.equal(result.status, 200);
    assert.equal(result.body.user.username, 'alice');
  } finally {
    if (serverProcess.exitCode === null && serverProcess.signalCode === null) {
      serverProcess.kill('SIGTERM');
      await once(serverProcess, 'exit');
    }
  }

  if (stderr.trim()) {
    throw new Error(`Server stderr was not empty:\n${stderr}`);
  }
});
