const statusEl = document.querySelector('#status');
const authForm = document.querySelector('#auth-form');
const logoutButton = document.querySelector('#logout-button');
const noteForm = document.querySelector('#note-form');
const notesEl = document.querySelector('#notes');
const billingStatusEl = document.querySelector('#billing-status');
const billingForm = document.querySelector('#billing-form');
const plansEl = document.querySelector('#plans');
const planSelect = document.querySelector('#plan-select');
const invoicesEl = document.querySelector('#invoices');

let activeUser = null;
let plans = [];

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

function formatMoney(cents) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

function renderNotes(notes) {
  notesEl.innerHTML = '';

  if (!notes.length) {
    const empty = document.createElement('li');
    empty.textContent = activeUser ? 'No notes yet.' : 'Log in to load notes.';
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

function renderPlans() {
  plansEl.innerHTML = '';
  planSelect.innerHTML = '';

  for (const plan of plans) {
    const option = document.createElement('option');
    option.value = plan.id;
    option.textContent = `${plan.name} — ${formatMoney(plan.monthlyCents)}/mo`;
    planSelect.append(option);

    const card = document.createElement('article');
    card.className = 'plan-card';
    card.innerHTML = `<h3></h3><p></p><ul></ul>`;
    card.querySelector('h3').textContent = plan.name;
    card.querySelector('p').textContent = `${formatMoney(plan.monthlyCents)} per month`;
    const list = card.querySelector('ul');
    for (const feature of plan.features) {
      const item = document.createElement('li');
      item.textContent = feature;
      list.append(item);
    }
    plansEl.append(card);
  }
}

function renderBilling(subscription, invoices) {
  if (!activeUser) {
    billingStatusEl.textContent = 'Log in to manage a subscription.';
    invoicesEl.innerHTML = '<li>No invoices loaded.</li>';
    return;
  }

  const plan = plans.find((entry) => entry.id === subscription?.planId);
  billingStatusEl.textContent = subscription
    ? `Subscribed to ${plan?.name ?? subscription.planId} (${subscription.status}).`
    : 'No active subscription.';

  invoicesEl.innerHTML = '';
  if (!invoices.length) {
    invoicesEl.innerHTML = '<li>No invoices yet.</li>';
    return;
  }

  for (const invoice of invoices) {
    const item = document.createElement('li');
    item.textContent = `${formatMoney(invoice.amountCents)} · ${invoice.status} · ${new Date(invoice.createdAt).toLocaleString()}`;
    invoicesEl.append(item);
  }
}

async function loadPlans() {
  const data = await request('/api/billing/plans');
  plans = data.plans;
  renderPlans();
}

async function loadSession() {
  try {
    const { user } = await request('/api/session');
    activeUser = user;
    setStatus(`Logged in as ${user.username}`);
    await Promise.all([loadNotes(), loadBilling()]);
  } catch {
    activeUser = null;
    setStatus('Not logged in. Register or log in to manage notes and billing.');
    renderNotes([]);
    renderBilling(null, []);
  }
}

async function loadNotes() {
  if (!activeUser) return;
  const { notes } = await request('/api/notes');
  renderNotes(notes);
}

async function loadBilling() {
  if (!activeUser) return;
  const { subscription, invoices } = await request('/api/billing/subscription');
  renderBilling(subscription, invoices);
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
    await Promise.all([loadNotes(), loadBilling()]);
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
    renderBilling(null, []);
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

billingForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!activeUser) {
    setStatus('Log in before subscribing.', true);
    return;
  }

  try {
    await request('/api/billing/subscribe', {
      method: 'POST',
      body: JSON.stringify({ planId: planSelect.value }),
    });
    await loadBilling();
  } catch (error) {
    setStatus(error.message, true);
  }
});

await loadPlans();
await loadSession();
