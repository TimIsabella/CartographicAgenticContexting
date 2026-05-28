const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { URL } = require('node:url');
const { createStore } = require('../../../packages/db/store');
const { logHttpRequest } = require('../../../packages/observability/logger');
const { sendJson } = require('./http');
const { getAuthorizedUser } = require('./auth/sessions');
const { createAuthRoutes } = require('./auth/routes');
const { createBillingRoutes } = require('./billing/routes');

const PORT = Number(process.env.PORT ?? 3000);
const REPO_ROOT = path.resolve(__dirname, '../../..');
const PUBLIC_DIR = path.join(REPO_ROOT, 'apps/web');
const DB_FILE = path.resolve(process.env.DB_FILE_PATH ?? path.join(REPO_ROOT, 'packages/db/db.json'));

const store = createStore(DB_FILE);
const handleAuthRoute = createAuthRoutes(store);
const handleBillingRoute = createBillingRoutes(store);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
};

async function handleNotesRoute(request, response, url) {
  if (url.pathname !== '/api/notes') return false;

  const auth = await getAuthorizedUser(store, request);

  if (!auth) {
    sendJson(response, 401, { error: 'Not authorized.' });
    return true;
  }

  if (request.method === 'GET') {
    const notes = auth.db.notes.filter((note) => note.userId === auth.user.id);
    sendJson(response, 200, { notes });
    return true;
  }

  if (request.method === 'POST') {
    const { readBody } = require('./http');
    const crypto = require('node:crypto');
    const { text } = await readBody(request);

    if (!text || String(text).trim().length > 500) {
      sendJson(response, 400, { error: 'Note text is required and must be 500 characters or less.' });
      return true;
    }

    const note = {
      id: crypto.randomUUID(),
      userId: auth.user.id,
      text: String(text).trim(),
      createdAt: new Date().toISOString(),
    };

    auth.db.notes.push(note);
    await store.writeDb(auth.db);
    sendJson(response, 201, { note });
    return true;
  }

  sendJson(response, 405, { error: 'Method not allowed.' });
  return true;
}

async function handleApi(request, response, url) {
  if (request.method === 'GET' && url.pathname === '/api/health') {
    sendJson(response, 200, { ok: true });
    return;
  }

  const handled =
    (await handleAuthRoute(request, response, url)) ||
    (await handleBillingRoute(request, response, url)) ||
    (await handleNotesRoute(request, response, url));

  if (!handled) {
    sendJson(response, 404, { error: 'Not found.' });
  }
}

async function serveStatic(response, url) {
  const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const filePath = path.normalize(path.join(PUBLIC_DIR, requestedPath));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    sendJson(response, 403, { error: 'Forbidden.' });
    return;
  }

  const extension = path.extname(filePath);
  const contentType = contentTypes[extension] ?? 'application/octet-stream';
  const file = await fs.readFile(filePath);
  response.writeHead(200, { 'Content-Type': contentType });
  response.end(file);
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname.startsWith('/api/')) {
      await handleApi(request, response, url);
    } else {
      await serveStatic(response, url);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      sendJson(response, 404, { error: 'Not found.' });
      return;
    }

    sendJson(response, error.statusCode ?? 500, { error: error.message ?? 'Server error.' });
  } finally {
    logHttpRequest(request, response);
  }
});

server.listen(PORT, () => {
  console.log(`Example app running at http://localhost:${PORT}`);
});
