const crypto = require('node:crypto');
const { parseCookies } = require('../http');

const SESSION_TTL_MS = 1000 * 60 * 60 * 4;

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
  };
}

function setSessionCookie(session) {
  return `sessionId=${session.id}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`;
}

function clearSessionCookie() {
  return 'sessionId=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0';
}

async function createSession(store, userId) {
  return store.updateDb((db) => {
    const session = {
      id: crypto.randomUUID(),
      userId,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
    };

    db.sessions = db.sessions.filter((entry) => Date.parse(entry.expiresAt) > Date.now());
    db.sessions.push(session);
    return session;
  });
}

async function getAuthorizedUser(store, request) {
  const cookies = parseCookies(request);
  const sessionId = cookies.sessionId;

  if (!sessionId) return null;

  const db = await store.readDb();
  const session = db.sessions.find((entry) => entry.id === sessionId);

  if (!session || Date.parse(session.expiresAt) <= Date.now()) {
    return null;
  }

  const user = db.users.find((entry) => entry.id === session.userId);
  return user ? { db, user, session } : null;
}

module.exports = {
  clearSessionCookie,
  createSession,
  getAuthorizedUser,
  publicUser,
  setSessionCookie,
};
