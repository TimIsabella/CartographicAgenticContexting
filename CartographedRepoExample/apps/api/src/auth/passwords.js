const crypto = require('node:crypto');

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  if (typeof password !== 'string' || password.length < 8) {
    throw new Error('Password must be at least 8 characters.');
  }

  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  const [salt, storedHash] = String(storedPassword ?? '').split(':');

  if (!salt || !storedHash) {
    return false;
  }

  const candidateHash = crypto.scryptSync(String(password ?? ''), salt, 64).toString('hex');
  const candidate = Buffer.from(candidateHash, 'hex');
  const stored = Buffer.from(storedHash, 'hex');

  return candidate.length === stored.length && crypto.timingSafeEqual(candidate, stored);
}

module.exports = {
  hashPassword,
  verifyPassword,
};
