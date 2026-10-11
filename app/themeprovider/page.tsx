'use client';

import { CodeBlock, Columns, Divider, Typography, useTheme } from '@esmalley/react-material-ui';
import PropsTable from '../../components/PropsTable';

const SEMANTIC_GROUPS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const COLOR_SCALES = [
  'grey', 'red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan',
  'teal', 'green', 'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange', 'brown',
] as const;

const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A400', 'A700'] as const;

const Swatch = ({ color, label }: { color: string; label: string }) => {
  const theme = useTheme();

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          height: 44,
          borderRadius: 4,
          backgroundColor: color,
          border: `1px solid ${theme.grey[600]}`,
        }}
      />
      <Typography type='caption' style={{ color: theme.text.secondary }}>{label}</Typography>
      <Typography type='caption' style={{ color: theme.text.disabled, fontSize: 10 }}>{color}</Typography>
    </div>
  );
};

export default function Page() {
  const theme = useTheme();

  // text.icon exists only on the dark theme, so reading it needs a mode check first.
  const iconColor = theme.mode === 'dark' ? theme.text.icon : theme.text.secondary;

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>ThemeProvider</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        Every component in this library reads its colors from the theme, so the whole app has to be wrapped
        in a <code>ThemeProvider</code>. The provider holds nothing but the mode string &mdash;{' '}
        <code>&apos;dark&apos;</code>{' '}or <code>&apos;light&apos;</code> &mdash; and <code>useTheme()</code>{' '}
        builds the palette from it.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Setup</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Three things belong at the root of the app: the provider, <code>UXBaseline</code>{' '}for the body
        styling, and an empty <code>#menu-root</code>{' '}element that the overlays portal into.
      </Typography>
      <CodeBlock code={`
        import { useState } from 'react';
        import { ThemeProvider, UXBaseline, Themes } from '@esmalley/react-material-ui';

        const App = ({ children }) => {
          const [theme, setTheme] = useState<Themes>('dark');

          return (
            <ThemeProvider theme={theme}>
              <UXBaseline />
              {children}

              {/* overlays (menu, modal, drawer, plane, toast, tooltip) portal in here */}
              <div id='menu-root' />
            </ThemeProvider>
          );
        };
      `} />
      <Typography type='body2' style={{ marginBottom: 10 }}>
        There is no custom palette mechanism. The theme is derived entirely from the mode, so the way to
        restyle a component is its <code>style</code>{' '}prop, not a theme override.
      </Typography>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Fonts</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>UXBaseline</code>{' '}sets <code>font-family: Roboto, Helvetica, Arial, sans-serif</code>{' '}but does
        not load any font. Install one, or the app falls back to Helvetica or Arial. This site
        uses <code>typeface-roboto</code>, imported once in the root layout.
      </Typography>
      <CodeBlock lang='sh' code={`
        npm install typeface-roboto
      `} />
      <CodeBlock code={`
        // app/layout.tsx
        import 'typeface-roboto';
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Reading the theme</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>useTheme()</code>{' '}returns the resolved palette. It is a plain object &mdash; read tokens off it
        directly rather than hardcoding a color anywhere.
      </Typography>
      <CodeBlock code={`
        import { useTheme } from '@esmalley/react-material-ui';

        const MyThing = () => {
          const theme = useTheme();

          return <div style={{ color: theme.text.primary, background: theme.background.main }} />;
        };
      `} />
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The current mode is on the theme as <code>theme.mode</code>, which is how components branch when
        light and dark need different treatment. This page is currently rendering
        the <code>{theme.mode}</code>{' '}theme &mdash; use the toggle in the header to switch.
      </Typography>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Dark and light are not the same shape</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The two themes are a union, not one interface, and three keys exist on only one side. TypeScript
        rejects them until you narrow on <code>theme.mode</code>{' '}first.
      </Typography>
      <PropsTable
        note='Narrow with a theme.mode check before reading any of these.'
        rows={[
          { name: 'text.icon', type: 'string', default: 'dark only', description: 'Present on the dark theme. On light, fall back to text.secondary.' },
          { name: 'background.light', type: 'string', default: 'light only', description: 'A second background step that the dark theme does not define.' },
          { name: 'group.contrastText', type: 'string', default: 'light only', description: 'On primary, secondary, info, success, warning and error. Dark groups carry main, light and dark only.' },
        ]}
      />
      <CodeBlock code={`
        // does not compile - text.icon is not on the light theme
        const c = theme.text.icon;

        // narrow first
        const iconColor = theme.mode === 'dark' ? theme.text.icon : theme.text.secondary;
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Semantic colors</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Six semantic groups, each with <code>main</code>, <code>light</code>{' '}and <code>dark</code>. Reach for
        these before the raw scales below.
      </Typography>
      {SEMANTIC_GROUPS.map((group) => (
        <div key={group} style={{ marginBottom: 16 }}>
          <Typography type='subtitle2' style={{ marginBottom: 4 }}>{group}</Typography>
          <Columns numberOfColumns={3}>
            <Swatch color={theme[group].light} label={`${group}.light`} />
            <Swatch color={theme[group].main} label={`${group}.main`} />
            <Swatch color={theme[group].dark} label={`${group}.dark`} />
          </Columns>
        </div>
      ))}
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Surfaces and text</Typography>
      <Columns numberOfColumns={4}>
        <Swatch color={theme.background.main} label='background.main' />
        <Swatch color={theme.header.main} label='header.main' />
        <Swatch color={theme.text.primary} label='text.primary' />
        <Swatch color={theme.text.secondary} label='text.secondary' />
        <Swatch color={theme.text.disabled} label='text.disabled' />
        <Swatch color={iconColor} label='text.icon (dark only)' />
        <Swatch color={theme.link.primary} label='link.primary' />
      </Columns>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Interaction states</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>theme.action</code>{' '}carries the hover, focus, selected and disabled treatments, each as a color
        plus the opacity it was built from. Use these rather than inventing an overlay.
      </Typography>
      <PropsTable
        rows={[
          { name: 'action.active', type: 'string', description: 'Active icon and control color.' },
          { name: 'action.hover', type: 'string', description: 'Hover overlay. What every hoverable surface in the library uses.' },
          { name: 'action.hoverOpacity', type: 'number', description: 'The alpha that action.hover was derived from.' },
          { name: 'action.selected', type: 'string', description: 'Selected row or item background.' },
          { name: 'action.selectedOpacity', type: 'number', description: 'The alpha behind action.selected.' },
          { name: 'action.focus', type: 'string', description: 'Keyboard focus overlay.' },
          { name: 'action.focusOpacity', type: 'number', description: 'The alpha behind action.focus.' },
          { name: 'action.disabled', type: 'string', description: 'Disabled text and icon color.' },
          { name: 'action.disabledBackground', type: 'string', description: 'Disabled surface fill.' },
          { name: 'action.disabledOpacity', type: 'number', description: 'The alpha behind the disabled treatment.' },
        ]}
      />
      <Columns numberOfColumns={4}>
        <Swatch color={theme.action.hover} label='action.hover' />
        <Swatch color={theme.action.selected} label='action.selected' />
        <Swatch color={theme.action.focus} label='action.focus' />
        <Swatch color={theme.action.disabledBackground} label='action.disabledBackground' />
      </Columns>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Color scales</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Eighteen Material scales are on the theme by name. Each runs <code>50</code>{' '}through <code>900</code>{' '}
        plus the accents <code>A100</code>, <code>A200</code>, <code>A400</code>{' '}and <code>A700</code>{' '}
        &mdash; except <code>brown</code>, which has no accent steps.
      </Typography>
      <CodeBlock code={`
        const theme = useTheme();

        theme.blue[500];
        theme.deepOrange.A200;
        theme.brown[700];   // brown has no A100 / A200 / A400 / A700
      `} />
      {COLOR_SCALES.map((scale) => (
        <div key={scale} style={{ marginBottom: 20 }}>
          <Typography type='subtitle2' style={{ marginBottom: 4 }}>{scale}</Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {SCALE_STEPS.map((step) => {
              // brown has no accent steps, so the two scale shapes do not overlap structurally
              const group = theme[scale] as unknown as Record<string | number, string>;
              const color = group[step];
              if (!color) return null;

              return (
                <div key={String(step)} style={{ width: 62, textAlign: 'center' }}>
                  <div
                    style={{
                      height: 34,
                      borderRadius: 3,
                      backgroundColor: color,
                      border: `1px solid ${theme.grey[600]}`,
                    }}
                  />
                  <Typography type='caption' style={{ color: theme.text.secondary, fontSize: 10 }}>{step}</Typography>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>ThemeProvider props</Typography>
      <PropsTable
        rows={[
          { name: 'theme', type: "'dark' | 'light'", required: true, description: 'The mode. Exported as the Themes type.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Your app.' },
        ]}
      />

      <Typography type='h6' style={{ marginBottom: 10 }}>UXBaseline</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>UXBaseline</code>{' '}takes no props. It renders a single <code>&lt;style&gt;</code>{' '}element that
        resets <code>box-sizing</code>, clears the default body margin, applies <code>background.main</code>{' '}
        and <code>text.primary</code>{' '}to the body, and normalizes form element fonts. Render it once, inside
        the provider.
      </Typography>
      <Divider />
    </div>
  );
}
