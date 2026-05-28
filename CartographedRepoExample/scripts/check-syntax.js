const fs = require('node:fs/promises');
const path = require('node:path');
const { spawn } = require('node:child_process');

const REPO_ROOT = path.resolve(__dirname, '..');
const SCAN_DIRS = ['apps', 'packages', 'scripts', 'tests'];
const JS_EXTENSIONS = new Set(['.js', '.mjs', '.cjs']);
const IGNORED_DIRS = new Set(['node_modules', '.git']);

async function listScriptFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    if (entry.isDirectory() && IGNORED_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listScriptFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && JS_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function runNodeCheck(filePath) {
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['--check', filePath], {
      stdio: 'inherit',
    });

    child.once('error', reject);
    child.once('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Syntax check failed: ${filePath}`));
      }
    });
  });
}

async function main() {
  const files = [];

  for (const scanDir of SCAN_DIRS) {
    const fullPath = path.join(REPO_ROOT, scanDir);
    try {
      await fs.access(fullPath);
      files.push(...(await listScriptFiles(fullPath)));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }

  files.sort();

  if (!files.length) {
    console.log('No JavaScript files found.');
    return;
  }

  for (const file of files) {
    await runNodeCheck(file);
  }

  console.log(`Syntax check passed for ${files.length} file(s).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
