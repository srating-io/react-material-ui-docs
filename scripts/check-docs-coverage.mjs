/**
 * Fails if the library exports something no documentation page mentions.
 *
 * The convention in both repos is that adding a component means adding a page here and a
 * sidebar entry, but nothing enforced it, so the two drifted badly. This closes that loop:
 * it reads the public API out of the installed library's type declarations and checks each
 * name appears somewhere under app/.
 *
 *   node scripts/check-docs-coverage.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = path.join(ROOT, 'node_modules', '@esmalley', 'react-material-ui', 'dist', 'types');

/** Exports that deliberately have no page of their own. Keep this list short and justified. */
const ALLOWED = new Map([
  ['Particles', 'work in progress, not in the public barrel yet'],
]);

const read = (file) => fs.readFileSync(file, 'utf8');

const exportsFrom = (dts) => {
  const names = new Set();
  const src = read(dts);

  const patterns = [
    /^export\s+declare\s+(?:const|function|class|let|var)\s+([A-Za-z_$][\w$]*)/gm,
    /^export\s+(?:declare\s+)?(?:type|interface|enum)\s+([A-Za-z_$][\w$]*)/gm,
  ];

  for (const re of patterns) {
    for (const m of src.matchAll(re)) names.add(m[1]);
  }

  // `export { A, B };` - skip the bare `export {};` marker tsc emits.
  for (const m of src.matchAll(/^export\s*\{([^}]*)\}\s*;?\s*$/gm)) {
    for (const part of m[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop().trim();
      if (name) names.add(name);
    }
  }

  return names;
};

// Walk the barrel to find every module that is actually public.
const barrel = read(path.join(TYPES, 'index.d.ts'));
const modules = [...barrel.matchAll(/^export \* from '\.\/(.+?)';$/gm)]
  .map((m) => m[1].replace(/\.tsx$/, '.d.ts').replace(/\.js$/, '.d.ts'));

const api = new Map();
for (const mod of modules) {
  const dts = path.join(TYPES, mod);
  if (!fs.existsSync(dts)) {
    console.error(`  ! barrel points at a missing declaration: ${mod}`);
    continue;
  }
  for (const name of exportsFrom(dts)) api.set(name, mod);
}

// Collect the documentation source once.
const pages = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.tsx')) pages.push(p);
  }
};
walk(path.join(ROOT, 'app'));

const haystack = pages.map(read).join('\n');

const missing = [];
for (const [name, mod] of [...api].sort()) {
  if (ALLOWED.has(name)) continue;
  // Word boundary so `Tr` does not match inside `Trigger`.
  if (!new RegExp(`\\b${name}\\b`).test(haystack)) missing.push({ name, mod });
}

console.log(`Checked ${api.size} public exports against ${pages.length} pages.`);

if (ALLOWED.size) {
  for (const [name, why] of ALLOWED) console.log(`  skipped ${name} (${why})`);
}

if (missing.length) {
  console.error(`\n${missing.length} export(s) are not mentioned anywhere under app/:\n`);
  for (const { name, mod } of missing) console.error(`  ${name}  (${mod})`);
  console.error('\nAdd a page or a section covering each, plus a sidebar entry in components/Sidebar.tsx.');
  process.exit(1);
}

console.log('Every public export is documented.');
