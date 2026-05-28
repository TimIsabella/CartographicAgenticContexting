const crypto = require('node:crypto');
const { readBody, sendJson } = require('../http');
const { getAuthorizedUser } = require('../auth/sessions');
const { logEvent } = require('../../../../packages/observability/logger');
const { getPlan, listPlans } = require('./catalog');

function createInvoice(subscription, plan) {
  return {
    id: crypto.randomUUID(),
    subscriptionId: subscription.id,
    userId: subscription.userId,
    amountCents: plan.monthlyCents,
    status: 'open',
    createdAt: new Date().toISOString(),
  };
}

function createBillingRoutes(store) {
  async function requireUser(request, response) {
    const auth = await getAuthorizedUser(store, request);

    if (!auth) {
      sendJson(response, 401, { error: 'Not authorized.' });
      return null;
    }

    return auth;
  }

  async function handleBillingRoute(request, response, url) {
    if (request.method === 'GET' && url.pathname === '/api/billing/plans') {
      sendJson(response, 200, { plans: listPlans() });
      return true;
    }

    if (request.method === 'GET' && url.pathname === '/api/billing/subscription') {
      const auth = await requireUser(request, response);
      if (!auth) return true;

      const subscription = auth.db.subscriptions.find((entry) => entry.userId === auth.user.id) ?? null;
      const invoices = auth.db.invoices.filter((entry) => entry.userId === auth.user.id);
      sendJson(response, 200, { subscription, invoices });
      return true;
    }

    if (request.method === 'POST' && url.pathname === '/api/billing/subscribe') {
      const auth = await requireUser(request, response);
      if (!auth) return true;

      const { planId } = await readBody(request);
      const plan = getPlan(planId);

      if (!plan) {
        sendJson(response, 400, { error: 'Unknown billing plan.' });
        return true;
      }

      const subscription = {
        id: crypto.randomUUID(),
        userId: auth.user.id,
        planId: plan.id,
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      const invoice = createInvoice(subscription, plan);

      auth.db.subscriptions = auth.db.subscriptions.filter((entry) => entry.userId !== auth.user.id);
      auth.db.subscriptions.push(subscription);
      auth.db.invoices.push(invoice);
      await store.writeDb(auth.db);

      logEvent('billing.subscribed', { userId: auth.user.id, planId: plan.id, invoiceId: invoice.id });
      sendJson(response, 201, { subscription, invoice });
      return true;
    }

    return false;
  }

  return handleBillingRoute;
}

module.exports = {
  createBillingRoutes,
};
