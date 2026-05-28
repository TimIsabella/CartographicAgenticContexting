const crypto = require('node:crypto');
const { readBody, sendJson } = require('../http');
const { logEvent } = require('../../../../packages/observability/logger');
const { hashPassword, verifyPassword } = require('./passwords');
const {
  clearSessionCookie,
  createSession,
  getAuthorizedUser,
  publicUser,
  setSessionCookie,
} = require('./sessions');

function createAuthRoutes(store) {
  async function handleAuthRoute(request, response, url) {
    if (request.method === 'GET' && url.pathname === '/api/session') {
      const auth = await getAuthorizedUser(store, request);

      if (!auth) {
        sendJson(response, 401, { error: 'Not authorized.' });
        return true;
      }

      sendJson(response, 200, { user: publicUser(auth.user) });
      return true;
    }

    if (request.method === 'POST' && url.pathname === '/api/register') {
      const { username, password } = await readBody(request);

      if (!username || !password || username.length < 3 || password.length < 8) {
        sendJson(response, 400, { error: 'Username must be 3+ characters and password must be 8+ characters.' });
        return true;
      }

      const normalizedUsername = String(username).trim().toLowerCase();
      const db = await store.readDb();

      if (db.users.some((user) => user.username.toLowerCase() === normalizedUsername)) {
        sendJson(response, 409, { error: 'Username already exists.' });
        return true;
      }

      const user = {
        id: crypto.randomUUID(),
        username: String(username).trim(),
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
      };

      db.users.push(user);
      await store.writeDb(db);

      const session = await createSession(store, user.id);
      logEvent('auth.registered', { userId: user.id, username: user.username });
      sendJson(response, 201, { user: publicUser(user) }, { 'Set-Cookie': setSessionCookie(session) });
      return true;
    }

    if (request.method === 'POST' && url.pathname === '/api/login') {
      const { username, password } = await readBody(request);
      const db = await store.readDb();
      const normalizedUsername = String(username ?? '').trim().toLowerCase();
      const user = db.users.find((entry) => entry.username.toLowerCase() === normalizedUsername);

      if (!user || !verifyPassword(String(password ?? ''), user.passwordHash)) {
        logEvent('auth.login_failed', { username: normalizedUsername });
        sendJson(response, 401, { error: 'Invalid username or password.' });
        return true;
      }

      const session = await createSession(store, user.id);
      logEvent('auth.login_succeeded', { userId: user.id });
      sendJson(response, 200, { user: publicUser(user) }, { 'Set-Cookie': setSessionCookie(session) });
      return true;
    }

    if (request.method === 'POST' && url.pathname === '/api/logout') {
      const cookies = require('../http').parseCookies(request);
      await store.updateDb((db) => {
        db.sessions = db.sessions.filter((session) => session.id !== cookies.sessionId);
      });

      sendJson(response, 200, { ok: true }, { 'Set-Cookie': clearSessionCookie() });
      return true;
    }

    return false;
  }

  return handleAuthRoute;
}

module.exports = {
  createAuthRoutes,
};
