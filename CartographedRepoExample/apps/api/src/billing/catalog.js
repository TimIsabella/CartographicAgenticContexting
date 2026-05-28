const PLANS = Object.freeze({
  starter: {
    id: 'starter',
    name: 'Starter',
    monthlyCents: 900,
    features: ['Private notes', 'Basic support'],
  },
  team: {
    id: 'team',
    name: 'Team',
    monthlyCents: 2900,
    features: ['Private notes', 'Shared workspace', 'Priority support'],
  },
});

function listPlans() {
  return Object.values(PLANS);
}

function getPlan(planId) {
  return PLANS[planId] ?? null;
}

module.exports = {
  getPlan,
  listPlans,
};
