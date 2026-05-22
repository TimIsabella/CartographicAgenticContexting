const SENSITIVE_KEY_PATTERN = /(password|token|secret|session|cookie|authorization)/i;

function redact(value) {
  if (Array.isArray(value)) return value.map(redact);

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [
        key,
        SENSITIVE_KEY_PATTERN.test(key) ? '[REDACTED]' : redact(nested),
      ])
    );
  }

  return value;
}

function logEvent(eventName, fields = {}) {
  const payload = {
    event: eventName,
    at: new Date().toISOString(),
    ...redact(fields),
  };

  console.log(JSON.stringify(payload));
}

function logHttpRequest(request, response, fields = {}) {
  logEvent('http.request', {
    method: request.method,
    path: request.url?.split('?')[0],
    statusCode: response.statusCode,
    ...fields,
  });
}

module.exports = {
  logEvent,
  logHttpRequest,
  redact,
};
