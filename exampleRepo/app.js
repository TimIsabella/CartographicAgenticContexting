const statusEl = document.querySelector('#status');
const authForm = document.querySelector('#auth-form');
const logoutButton = document.querySelector('#logout-button');
const noteForm = document.querySelector('#note-form');
const notesEl = document.querySelector('#notes');

let activeUser = null;

async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    credentials: 'same-origin',
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error ?? 'Request failed');
  }

  return data;
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle('error', isError);
}

function renderNotes(notes) {
  notesEl.innerHTML = '';

  if (!notes.length) {
    const empty = document.createElement('li');
    empty.textContent = 'No notes yet.';
    notesEl.append(empty);
    return;
  }

  for (const note of notes) {
    const item = document.createElement('li');
    const created = new Date(note.createdAt).toLocaleString();
    item.innerHTML = `<strong>${created}</strong><p></p>`;
    item.querySelector('p').textContent = note.text;
    notesEl.append(item);
  }
}

async function loadSession() {
  try {
    const { user } = await request('/api/session');
    activeUser = user;
    setStatus(`Logged in as ${user.username}`);
    await loadNotes();
  } catch {
    activeUser = null;
    setStatus('Not logged in. Register or log in to manage notes.');
    renderNotes([]);
  }
}

async function loadNotes() {
  if (!activeUser) return;
  const { notes } = await request('/api/notes');
  renderNotes(notes);
}

authForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitter = event.submitter;
  const action = submitter?.dataset.action;
  const formData = new FormData(authForm);
  const username = String(formData.get('username') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  try {
    const { user } = await request(`/api/${action}`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    activeUser = user;
    setStatus(`Logged in as ${user.username}`);
    authForm.reset();
    await loadNotes();
  } catch (error) {
    setStatus(error.message, true);
  }
});

logoutButton.addEventListener('click', async () => {
  try {
    await request('/api/logout', { method: 'POST' });
    activeUser = null;
    setStatus('Logged out.');
    renderNotes([]);
  } catch (error) {
    setStatus(error.message, true);
  }
});

noteForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const text = document.querySelector('#note-text').value.trim();
  if (!text) return;

  try {
    await request('/api/notes', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });

    noteForm.reset();
    await loadNotes();
  } catch (error) {
    setStatus(error.message, true);
  }
});

loadSession();
