/**
 * Writes the icon geometry to static JSON under `public/icons/<version>/`.
 *
 * The icons page needs to show any of ~10,600 icons, but the icon *data* is
 * small -- a `d` string each -- while the icon *modules* are not. Letting the
 * bundler reach them, which is what `import(`<pkg>/${name}`)` does, emitted
 * 10,636 chunks and 44MB of `.next/static` per build and made `next dev`
 * unusable on that page. Reading them through a server route at request time
 * fixed the build but bought a node dependency, a fetch per scroll chunk and
 * cache keys that no two visits share.
 *
 * So: resolve them here, once, and ship the result as plain static files.
 *
 *   node scripts/generate-icons.mjs [--force]
 *
 * Each icon component is `memo(forwardRef(fn))`, so its render function can be
 * called directly for the react element it would produce. That is exact -- no
 * parsing of minified output, no guessing at which svg primitives an icon uses.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

import { ICON_PAGE_SIZE, iconPageFile } from '../app/icons/icon-data.ts';

const PACKAGE = '@esmalley/react-material-icons';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_ROOT = path.join(ROOT, 'public', 'icons');

const require = createRequire(import.meta.url);

/** Attributes every icon's outer `<svg>` carries. Anything else is kept per icon. */
const DEFAULT_SVG = { xmlns: 'http://www.w3.org/2000/svg', width: '1em', height: '1em', role: 'img', viewBox: '0 0 24 24' };

// The package's `exports` map does not expose its own package.json, so read it by
// walking up from the entry point that `exports` does resolve. Stop at the
// manifest that names the package: `dist/cjs` has one of its own, carrying
// nothing but `"type": "commonjs"`.
const { version } = (() => {
  const entry = require.resolve(PACKAGE);
  let at = path.dirname(entry);

  for (;;) {
    const file = path.join(at, 'package.json');
    if (fs.existsSync(file)) {
      const manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (manifest.name === PACKAGE) return manifest;
    }

    const up = path.dirname(at);
    if (up === at) throw new Error(`no package.json for ${PACKAGE} above ${entry}`);
    at = up;
  }
})();

const manifestModule = require(`${PACKAGE}/utils/manifest`);
const manifest = manifestModule.default ?? manifestModule;

/** `memo(forwardRef(fn))` -> `fn`. Loud if the package ever stops wrapping that way. */
const renderFunctionOf = (name) => {
  const module = require(`${PACKAGE}/${name}`);
  const Component = module[name] ?? module.default;
  const render = Component?.type?.render ?? Component?.render;

  if (typeof render !== 'function') {
    throw new Error(`${name}: expected memo(forwardRef(fn)), got ${typeof Component}`);
  }

  return render;
};

const childrenOf = (children) => (
  children === undefined ? [] : (Array.isArray(children) ? children : [children])
);

/** A react element -> the `[tag, props, children?]` tuple the page reads. */
const toNode = (element, name) => {
  if (typeof element?.type !== 'string') {
    throw new Error(`${name}: expected a plain svg element, got ${String(element?.type)}`);
  }

  const { children, ...props } = element.props;
  const kids = childrenOf(children);

  return kids.length
    ? [element.type, props, kids.map((kid) => toNode(kid, name))]
    : [element.type, props];
};

const entryOf = (name) => {
  // The props are only read for their shape, so the values passed in do not
  // matter; `style` and `ref` are the wrapper's and get dropped either way.
  const { children, style, ref, ...attributes } = renderFunctionOf(name)({}, null).props;

  const svg = Object.fromEntries(
    Object.entries(attributes).filter(([key, value]) => DEFAULT_SVG[key] !== value),
  );

  const nodes = childrenOf(children).map((child) => toNode(child, name));
  if (!nodes.length) throw new Error(`${name}: rendered an empty svg`);

  return Object.keys(svg).length ? { nodes, svg } : { nodes };
};

const pagesOf = (names) => {
  const pages = [];
  for (let at = 0; at < names.length; at += ICON_PAGE_SIZE) {
    pages.push(names.slice(at, at + ICON_PAGE_SIZE));
  }
  return pages;
};

const expected = Object.entries(manifest).flatMap(([category, names]) =>
  pagesOf(names).map((_, page) => iconPageFile(version, category, page)));

// `predev` runs this too, so a run that has nothing to do should cost nothing.
const upToDate = expected.every((file) => fs.existsSync(path.join(ROOT, 'public', file)));

if (upToDate && !process.argv.includes('--force')) {
  console.log(`Icon data for ${PACKAGE}@${version} is already written (${expected.length} pages).`);
  process.exit(0);
}

// Only the current version is served, and these are big enough to be worth not
// keeping. A cache header elsewhere is what makes replacing them safe.
if (fs.existsSync(OUT_ROOT)) fs.rmSync(OUT_ROOT, { recursive: true });
fs.mkdirSync(path.join(OUT_ROOT, version), { recursive: true });

const started = Date.now();
let icons = 0;
let bytes = 0;
let compressed = 0;

for (const [category, names] of Object.entries(manifest)) {
  pagesOf(names).forEach((page, index) => {
    const data = Object.fromEntries(page.map((name) => [name, entryOf(name)]));
    const json = JSON.stringify(data);

    fs.writeFileSync(path.join(ROOT, 'public', iconPageFile(version, category, index)), json);

    icons += page.length;
    bytes += json.length;
    compressed += zlib.brotliCompressSync(Buffer.from(json)).length;
  });
}

const kb = (value) => `${Math.round(value / 1024)}KB`;

console.log(
  `Wrote ${icons} icons to ${expected.length} pages under public/${iconPageFile(version, '<category>', 0)}`
  + ` -- ${kb(bytes)} raw, ${kb(compressed)} brotli, ${kb(compressed / expected.length)} per page`
  + ` in ${((Date.now() - started) / 1000).toFixed(1)}s`,
);
