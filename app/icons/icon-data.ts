/**
 * The icon geometry contract, shared by the generator and the page.
 *
 * `scripts/generate-icons.mjs` walks every icon component once at build time and
 * writes what it renders to `public/icons/<version>/<category>-<page>.json`. The
 * page fetches those files as it needs them and rebuilds the svg with
 * `createElement`.
 *
 * Before this, the page reached for icons with `import(`<pkg>/${name}`)`. A
 * template literal tells the bundler nothing about which name will be asked for,
 * so it had to make every candidate reachable: all ~10,600 icon modules resolved,
 * parsed and emitted as their own chunk on every cold build -- 10,636 chunks and
 * 44MB of `.next/static` for the handful a visitor ever looks at.
 *
 * The generator imports this file under node's own type stripping, so the page
 * size here is the only one there is and the two cannot drift.
 */

/** One svg element: its tag, its attributes, and children for the few that nest. */
export type IconNode = [
  tag: string,
  props: Record<string, string | number>,
  children?: IconNode[],
];

export type IconEntry = {
  /** Everything inside the `<svg>`. */
  nodes: IconNode[];
  /** Outer `<svg>` attributes, for the two icons that want more than the default. */
  svg?: Record<string, string>;
};

/** One generated file: every icon in one page of one category. */
export type IconDataPage = Record<string, IconEntry>;

/**
 * Icons per generated file. 250 keeps a page near 20KB brotli, so the first
 * screen costs one small request rather than the whole category, and a search
 * whose hits are scattered still pulls at most the category.
 */
export const ICON_PAGE_SIZE = 250;

/** Which page holds the icon at `index` in `manifest[category]`. */
export const iconPageOf = (index: number) => Math.floor(index / ICON_PAGE_SIZE);

/** Path under `public/`. Also the url, with a leading slash. */
export const iconPageFile = (version: string, category: string, page: number) =>
  `icons/${version}/${category}-${page}.json`;

/**
 * The version sits in the path so these can be cached immutably: bumping the
 * icons package writes a new directory instead of changing a file a browser
 * already holds. `next.config.ts` sets the header, and supplies the version.
 */
export const iconPageUrl = (version: string, category: string, page: number) =>
  `/${iconPageFile(version, category, page)}`;
