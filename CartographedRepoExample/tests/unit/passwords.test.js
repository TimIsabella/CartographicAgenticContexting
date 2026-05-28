const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword, verifyPassword } = require('../../apps/api/src/auth/passwords');

test('hashPassword enforces minimum password length', () => {
  assert.throws(() => hashPassword('short'), /at least 8 characters/);
});

test('hashPassword creates verifiable hash', () => {
  const password = 'correct horse battery staple';
  const hash = hashPassword(password);

  assert.equal(typeof hash, 'string');
  assert.ok(hash.includes(':'));
  assert.equal(verifyPassword(password, hash), true);
  assert.equal(verifyPassword('incorrect password', hash), false);
});

test('verifyPassword rejects malformed stored values', () => {
  assert.equal(verifyPassword('anything', ''), false);
  assert.equal(verifyPassword('anything', 'invalid-format'), false);
});
