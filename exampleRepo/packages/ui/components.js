function createStatusBadge(status) {
  const badge = document.createElement('span');
  badge.dataset.status = status;
  badge.textContent = status;
  badge.style.border = '1px solid currentColor';
  badge.style.borderRadius = '999px';
  badge.style.padding = '2px 8px';
  badge.style.fontSize = '0.85rem';
  return badge;
}

function createCard({ title, body, actions = [] }) {
  const card = document.createElement('article');
  card.className = 'sample-card';

  const heading = document.createElement('h3');
  heading.textContent = title;
  card.append(heading);

  const paragraph = document.createElement('p');
  paragraph.textContent = body;
  card.append(paragraph);

  if (actions.length) {
    const actionRow = document.createElement('div');
    actionRow.className = 'sample-card-actions';
    for (const action of actions) actionRow.append(action);
    card.append(actionRow);
  }

  return card;
}

export {
  createCard,
  createStatusBadge,
};
