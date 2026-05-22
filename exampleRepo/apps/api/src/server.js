const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { URL } = require('node:url');

const PORT = Number(process.env.PORT ?? 3000);
const REPO_ROOT = path.resolve(__dirname, '../../..');
const PUBLIC_DIR = path.join(REPO_ROOT, 'apps/web');
const DB_FILE = path.join(REPO_ROOT, 'packages/db/db.json');
const SESSION_TTL_MS = 1000 * 60 * 60 * 4;

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
};

async function readDb() {
  const raw = await fs.readFile(DB_FILE, 'utf8');
  return JSON.parse(raw);
}

async function writeDb(db) {
  await fs.writeFile(DB_FILE, `${JSON.stringify(db, null, 2)}\n`);
}

function sendJson(response, statusCode, body, headers = {}) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    ...headers,
  });
  response.end(JSON.stringify(body));
}

function parseCookies(request) {
  const cookieHeader = request.headers.cookie ?? '';
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map((cookie) => cookie.trim().split('='))
      .filter(([key, value]) => key && value)
  );
}

async function readBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  if (!chunks.length) return {};

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw Object.assign(new Error('Request body must be valid JSON.'), { statusCode: 400 });
  }
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  const [salt, storedHash] = storedPassword.split(':');
  const candidateHash = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(candidateHash, 'hex'), Buffer.from(storedHash, 'hex'));
}

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
  };
}

async function getAuthorizedUser(request) {
  const cookies = parseCookies(request);
  const sessionId = cookies.sessionId;

  if (!sessionId) return null;

  const db = await readDb();
  const session = db.sessions.find((entry) => entry.id === sessionId);

  if (!session || Date.parse(session.expiresAt) <= Date.now()) {
    return null;
  }

  const user = db.users.find((entry) => entry.id === session.userId);
  return user ? { db, user, session } : null;
}

async function createSession(userId) {
  const db = await readDb();
  const session = {
    id: crypto.randomUUID(),
    userId,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
  };

  db.sessions = db.sessions.filter((entry) => Date.parse(entry.expiresAt) > Date.now());
  db.sessions.push(session);
  await writeDb(db);

  return session;
}

function setSessionCookie(session) {
  return `sessionId=${session.id}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`;
}

async function handleApi(request, response, url) {
  if (request.method === 'GET' && url.pathname === '/api/session') {
    const auth = await getAuthorizedUser(request);

    if (!auth) {
      sendJson(response, 401, { error: 'Not authorized.' });
      return;
    }

    sendJson(response, 200, { user: publicUser(auth.user) });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/register') {
    const { username, password } = await readBody(request);

    if (!username || !password || username.length < 3 || password.length < 8) {
      sendJson(response, 400, { error: 'Username must be 3+ characters and password must be 8+ characters.' });
      return;
    }

    const db = await readDb();
    const normalizedUsername = String(username).trim().toLowerCase();

    if (db.users.some((user) => user.username.toLowerCase() === normalizedUsername)) {
      sendJson(response, 409, { error: 'Username already exists.' });
      return;
    }

    const user = {
      id: crypto.randomUUID(),
      username: String(username).trim(),
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    db.users.push(user);
    await writeDb(db);

    const session = await createSession(user.id);
    sendJson(response, 201, { user: publicUser(user) }, { 'Set-Cookie': setSessionCookie(session) });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/login') {
    const { username, password } = await readBody(request);
    const db = await readDb();
    const normalizedUsername = String(username ?? '').trim().toLowerCase();
    const user = db.users.find((entry) => entry.username.toLowerCase() === normalizedUsername);

    if (!user || !verifyPassword(String(password ?? ''), user.passwordHash)) {
      sendJson(response, 401, { error: 'Invalid username or password.' });
      return;
    }

    const session = await createSession(user.id);
    sendJson(response, 200, { user: publicUser(user) }, { 'Set-Cookie': setSessionCookie(session) });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/logout') {
    const cookies = parseCookies(request);
    const db = await readDb();
    db.sessions = db.sessions.filter((session) => session.id !== cookies.sessionId);
    await writeDb(db);

    sendJson(response, 200, { ok: true }, { 'Set-Cookie': 'sessionId=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0' });
    return;
  }

  if (url.pathname === '/api/notes') {
    const auth = await getAuthorizedUser(request);

    if (!auth) {
      sendJson(response, 401, { error: 'Not authorized.' });
      return;
    }

    if (request.method === 'GET') {
      const notes = auth.db.notes.filter((note) => note.userId === auth.user.id);
      sendJson(response, 200, { notes });
      return;
    }

    if (request.method === 'POST') {
      const { text } = await readBody(request);

      if (!text || String(text).trim().length > 500) {
        sendJson(response, 400, { error: 'Note text is required and must be 500 characters or less.' });
        return;
      }

      const note = {
        id: crypto.randomUUID(),
        userId: auth.user.id,
        text: String(text).trim(),
        createdAt: new Date().toISOString(),
      };

      auth.db.notes.push(note);
      await writeDb(auth.db);
      sendJson(response, 201, { note });
      return;
    }
  }

  sendJson(response, 404, { error: 'Not found.' });
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
      return;
    }

    await serveStatic(response, url);
  } catch (error) {
    if (error.code === 'ENOENT') {
      sendJson(response, 404, { error: 'Not found.' });
      return;
    }

    sendJson(response, error.statusCode ?? 500, { error: error.message ?? 'Server error.' });
  }
});

server.listen(PORT, () => {
  console.log(`Example app running at http://localhost:${PORT}`);
});
