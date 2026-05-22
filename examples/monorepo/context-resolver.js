const contextTree = [
  {
    path: "/AGENTS.md",
    scope: ".",
    node: "root",
    summary: "Repository-wide contribution, validation, and context-resolution rules.",
    rules: [
      "Prefer small, reviewable changes.",
      "Keep implementation, tests, and documentation changes together when they describe the same behavior.",
      "Use the narrowest validation command that proves the change is safe."
    ]
  },
  {
    path: "/apps/api/AGENTS.md",
    scope: "apps/api/",
    node: "branch",
    parent: "/AGENTS.md",
    summary: "API route, service, validation, and testing conventions.",
    rules: [
      "Route handlers translate HTTP requests into service calls.",
      "Services own business logic and should not depend on transport-specific request or response objects.",
      "Input validation happens at the boundary before service calls."
    ]
  },
  {
    path: "/apps/api/src/auth/AGENTS.md",
    scope: "apps/api/src/auth/",
    node: "leaf",
    parent: "/apps/api/AGENTS.md",
    summary: "Authentication-specific rules and security-sensitive behavior.",
    rules: [
      "Never log passwords, tokens, session secrets, recovery codes, or raw authorization headers.",
      "Treat authentication failures as expected control flow.",
      "Keep token creation, token verification, and session persistence separated."
    ]
  },
  {
    path: "/packages/db/AGENTS.md",
    scope: "packages/db/",
    node: "branch",
    parent: "/AGENTS.md",
    summary: "Shared database conventions and sensitive persisted data constraints.",
    rules: [
      "Schema changes must include an explicit migration path.",
      "Prefer additive migrations before destructive migrations.",
      "Password hashes, reset tokens, session identifiers, and audit fields are sensitive."
    ]
  },
  {
    path: "/docs/releases/AGENTS.md",
    scope: "docs/releases/",
    node: "branch",
    parent: "/AGENTS.md",
    summary: "Release documentation rules and validation expectations.",
    rules: [
      "Release notes should describe user-visible behavior, migration impact, and validation status.",
      "Mention breaking changes explicitly.",
      "Keep rollback notes close to risky deployment steps."
    ]
  }
];

const maps = [
  {
    path: "/apps/api/AGENTS.map.auth.md",
    context: "authentication work across API and database boundaries",
    keywords: ["auth", "authorization", "login", "logout", "password", "session", "token", "identity"],
    references: ["/AGENTS.md", "/apps/api/AGENTS.md", "/apps/api/src/auth/AGENTS.md", "/packages/db/AGENTS.md"]
  },
  {
    path: "/docs/releases/AGENTS.map.release.md",
    context: "release preparation and release documentation",
    keywords: ["release", "release notes", "migration", "rollback", "validation", "breaking change"],
    references: ["/AGENTS.md", "/docs/releases/AGENTS.md", "/apps/api/AGENTS.md", "/packages/db/AGENTS.md"]
  }
];

const routes = [
  {
    path: "/docs/releases/AGENTS.route.release-prep.md",
    context: "release preparation",
    keywords: ["prepare release", "release prep", "release notes", "rollback", "migration"],
    steps: [
      "/AGENTS.md",
      "/docs/releases/AGENTS.md",
      "/docs/releases/AGENTS.map.release.md",
      "/apps/api/AGENTS.md",
      "/packages/db/AGENTS.md"
    ]
  }
];

const examples = [
  {
    path: "apps/api/src/auth/login.js",
    task: "Change login token behavior and verify that persisted sessions stay safe."
  },
  {
    path: "docs/releases/2026-05.md",
    task: "Prepare release notes for an API change with a database migration."
  },
  {
    path: "packages/db/session-model.js",
    task: "Add an additive migration for session audit metadata."
  }
];

function normalizePath(path) {
  return path.replace(/^\/+/, "");
}

function textMatchesKeywords(text, keywords) {
  const normalized = text.toLowerCase();
  return keywords.some((keyword) => normalized.includes(keyword));
}

function resolveTreeNodes(targetPath) {
  const normalizedPath = normalizePath(targetPath);
  return contextTree.filter((node) => {
    if (node.scope === ".") return true;
    return normalizedPath.startsWith(node.scope);
  });
}

function resolveMaps(targetPath, task) {
  const searchable = `${targetPath} ${task}`;
  return maps.filter((map) => textMatchesKeywords(searchable, map.keywords));
}

function resolveRoutes(task) {
  return routes.filter((route) => textMatchesKeywords(task, route.keywords));
}

function uniqueOrdered(items) {
  return [...new Set(items)];
}

function resolveContext(targetPath, task) {
  const treeNodes = resolveTreeNodes(targetPath);
  const matchedMaps = resolveMaps(targetPath, task);
  const matchedRoutes = resolveRoutes(task);

  const orderedReferences = uniqueOrdered([
    ...treeNodes.map((node) => node.path),
    ...matchedMaps.flatMap((map) => [map.path, ...map.references]),
    ...matchedRoutes.flatMap((route) => [route.path, ...route.steps])
  ]);

  return {
    treeNodes,
    matchedMaps,
    matchedRoutes,
    orderedReferences
  };
}

function byPath(path) {
  return (
    contextTree.find((node) => node.path === path) ||
    maps.find((map) => map.path === path) ||
    routes.find((route) => route.path === path)
  );
}

function renderList(items, getLabel) {
  if (!items.length) return "<p>No matches.</p>";
  return `<ol>${items.map((item) => `<li>${getLabel(item)}</li>`).join("")}</ol>`;
}

function renderResolution({ treeNodes, matchedMaps, matchedRoutes, orderedReferences }) {
  const references = renderList(orderedReferences, (path) => {
    const item = byPath(path);
    const summary = item?.summary || item?.context || "Referenced context file.";
    return `<code>${path}</code><br><span>${summary}</span>`;
  });

  const mapsList = renderList(matchedMaps, (map) => `<code>${map.path}</code><br><span>${map.context}</span>`);
  const routesList = renderList(matchedRoutes, (route) => `<code>${route.path}</code><br><span>${route.context}</span>`);

  return `
    <div class="cards">
      <article class="card">
        <h3>Tree nodes</h3>
        <p>${treeNodes.length} inherited context file${treeNodes.length === 1 ? "" : "s"}</p>
      </article>
      <article class="card">
        <h3>Maps</h3>
        <p>${matchedMaps.length} cross-cutting map${matchedMaps.length === 1 ? "" : "s"}</p>
      </article>
      <article class="card">
        <h3>Routes</h3>
        <p>${matchedRoutes.length} ordered route${matchedRoutes.length === 1 ? "" : "s"}</p>
      </article>
    </div>

    <h3>Smallest sufficient context set</h3>
    ${references}

    <h3>Matched maps</h3>
    ${mapsList}

    <h3>Matched routes</h3>
    ${routesList}
  `;
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const targetPath = formData.get("path") || "";
  const task = formData.get("task") || "";
  const result = resolveContext(targetPath, task);
  document.querySelector("#result").innerHTML = renderResolution(result);
}

function hydrateExamples() {
  const container = document.querySelector("#examples");
  container.innerHTML = examples
    .map(
      (example) => `
        <button class="card" type="button" data-path="${example.path}" data-task="${example.task}">
          <h3><code>${example.path}</code></h3>
          <p>${example.task}</p>
        </button>
      `
    )
    .join("");

  container.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-path]");
    if (!button) return;
    document.querySelector("#path").value = button.dataset.path;
    document.querySelector("#task").value = button.dataset.task;
    document.querySelector("#resolver-form").requestSubmit();
  });
}

document.querySelector("#resolver-form").addEventListener("submit", handleSubmit);
hydrateExamples();
document.querySelector("#resolver-form").requestSubmit();
