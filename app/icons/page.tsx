'use client';

import { createElement, useEffect, useMemo, useRef, useState } from 'react';
import manifest from '@esmalley/react-material-icons/utils/manifest';
import { Style, Textor } from '@esmalley/ts-utils';
import { CodeBlock, Inputs, Modal, MultiPicker, MultiPickerOption, TextInput, Tile, Typography, useTheme } from '@esmalley/react-material-ui';
import { IconDataPage, IconEntry, IconNode, iconPageOf, iconPageUrl } from './icon-data';

const ICON_SIZE = 24;

/** Set by `next.config.ts` off the installed icons package. */
const ICONS_VERSION = process.env.ICONS_VERSION as string;

/** What `createIcon` in the icons package puts on its own `<svg>`. */
const SVG_STYLE = { display: 'inline-block', verticalAlign: 'middle', fill: 'currentColor' };

const SVG_PROPS = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  role: 'img',
  width: '1em',
  height: '1em',
};

const toElement = (node: IconNode, key: number) => {
  const [tag, props, children] = node;
  return createElement(tag, { ...props, key }, children?.map(toElement));
};

/**
 * One icon, rebuilt from the geometry in `public/icons/` -- see `icon-data.ts`
 * for why the icons are not imported.
 *
 * The svg is filled with `currentColor`, so a theme change needs no refetch.
 */
const Icon = (
  { entry, color }:
  { entry?: IconEntry; color: string },
) => {
  // Sized like the icon it stands in for, so nothing shifts when it lands.
  if (!entry) return <span style={{ display: 'block', width: ICON_SIZE, height: ICON_SIZE }} />;

  return createElement(
    'svg',
    { ...SVG_PROPS, ...entry.svg, style: { ...SVG_STYLE, fontSize: ICON_SIZE, color } },
    entry.nodes.map(toElement),
  );
};

const CHUNK_SIZE = 50;

// Both grids size themselves off their container rather than off the window.
// `Columns` reads `window.innerWidth`, which is far wider than this column of
// content whenever the sidebar is showing, and its `1fr` tracks cannot shrink
// below their content -- so any fixed column count overflows at most widths.
const MIN_TILE_WIDTH = 170;
const MIN_PICKER_WIDTH = 110;

// `min()` keeps a container narrower than one track from overflowing. `auto-fit`
// collapses the tracks it does not fill, `auto-fill` keeps them.
const autoGrid = (mode: 'auto-fill' | 'auto-fit', minimum: number) =>
  `repeat(${mode}, minmax(min(100%, ${minimum}px), 1fr))`;

// `MultiPicker` lays its options out with `Columns` too and takes only a fixed
// count, so override that grid from the outside; the selector matches its
// `Columns` element. Below `Columns`' own 475px breakpoint it switches to a flex
// column and this stops applying, which keeps the stacked phone layout.
// `auto-fit` so the handful of options spread across the row as they did when
// the count was fixed, rather than bunching up at their minimum width.
const pickerClass = Style.getStyleClassName({
  paddingBottom: 5,
  '& > div > div': { gridTemplateColumns: autoGrid('auto-fit', MIN_PICKER_WIDTH) },
});

export default function Page() {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('filled');
  const [selected, setSelected] = useState('');
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const [data, setData] = useState<Record<string, IconDataPage>>({});
  const requested = useRef(new Set<string>());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const inputHandler = new Inputs();

  const allFiltered = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return manifest[category].filter((name: string) => {
      const lower = name.toLowerCase();
      return words.every((word) => lower.includes(word));
    });
  }, [query, category]);

  const visible = useMemo(
    () => allFiltered.slice(0, visibleCount),
    [allFiltered, visibleCount],
  );

  // A name's position in its category is what decides the file it lives in.
  const positions = useMemo(
    () => new Map<string, number>(
      manifest[category].map((name: string, at: number) => [name, at]),
    ),
    [category],
  );

  const pageFor = (name: string) => iconPageOf(positions.get(name) ?? 0);

  // `manifest` is typed as literal tuples keyed by category, so reading it with a
  // `string` gives back `any`; say what comes out of it here.
  const pages = useMemo<number[]>(
    () => [...new Set<number>(visible.map((name: string) => pageFor(name)))],
    [visible, positions],
  );

  useEffect(() => {
    setVisibleCount(CHUNK_SIZE);
  }, [query, category]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + CHUNK_SIZE, allFiltered.length));
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [allFiltered.length]);

  // One request per file the visible icons live in. Scrolling the list in order
  // asks for one more file every 250 icons; a search whose hits are scattered
  // asks for the files they fall in, and at worst for the whole category.
  useEffect(() => {
    for (const page of pages) {
      const key = `${category}-${page}`;

      // Marked before the request goes out, so a render while it is in flight
      // does not ask for the same file again.
      if (requested.current.has(key)) continue;
      requested.current.add(key);

      fetch(iconPageUrl(ICONS_VERSION, category, page))
        .then((response) => response.json())
        .then((icons: IconDataPage) => setData((held) => ({ ...held, [key]: icons })))
        // Unmarked, so the next scroll or search tries again rather than
        // leaving those tiles blank for good.
        .catch(() => { requested.current.delete(key); });
    }
  }, [pages, category]);

  const categories: MultiPickerOption[] = Object.keys(manifest).map((cat) => ({
    value: cat,
    label: Textor.toSentenceCase(cat),
  }));

  const importString = `import ${selected}Icon from '@esmalley/react-material-icons/${selected}';`;

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Icons</Typography>
      <div className={pickerClass}>
        <MultiPicker
          inputHandler={inputHandler}
          label='Icon type'
          onChange={(val) => setCategory(val as string)}
          required
          options={categories}
          selected={[category]}
          isRadio
          numberOfColumns={categories.length}
          showError={false}
        />
      </div>
      <TextInput
        inputHandler={inputHandler}
        placeholder='Search icons...'
        variant='outlined'
        value={query}
        onChange={(val) => setQuery(val as string)}
      />
      <div
        ref={scrollContainerRef}
        style={{ maxHeight: 400, overflowY: 'scroll', overflowX: 'hidden', marginTop: 20 }}
      >
        <div
          style={{
            display: 'grid',
            // `auto-fill`, so a search with two hits shows two normal tiles
            // rather than two stretched across the page.
            gridTemplateColumns: autoGrid('auto-fill', MIN_TILE_WIDTH),
            gap: 10,
          }}
        >
          {visible.map((name) => (
            <Tile
              key={name}
              icon={(
                <Icon
                  entry={data[`${category}-${pageFor(name)}`]?.[name]}
                  color={theme.text?.primary || '#000'}
                />
              )}
              primary={name}
              // Icon names are one long unbreakable word; without these the tile
              // refuses to shrink and widens its grid track.
              style={{ padding: '10px 0px', minWidth: 0, overflowWrap: 'anywhere' }}
              onClick={() => setSelected(name)}
            />
          ))}
        </div>

        {visibleCount < allFiltered.length && (
          <div ref={loaderRef} style={{ padding: 20, textAlign: 'center' }}>
            <Typography type='caption'>
              {`${visibleCount} / ${allFiltered.length}`}
            </Typography>
          </div>
        )}
      </div>
      <Modal open={selected !== ''} onClose={() => setSelected('')} paperStyle={{ maxWidth: 800 }} type='custom'>
        <CodeBlock code={importString} style={{ padding: '10px 20px' }}/>
      </Modal>
    </div>
  );
}
