'use client';

import { CodeBlock, Divider, Paper, Typography, useKontororu, useTheme, useWindowDimensions } from '@esmalley/react-material-ui';
import PropsTable from '../../components/PropsTable';

export default function Page() {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const Kontororu = useKontororu();

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Hooks</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        Four hooks ship alongside the components. <code>useTheme</code>{' '}is covered on the ThemeProvider
        page; the rest are here.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>useWindowDimensions</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Returns the current viewport size and re-renders on resize. <code>Columns</code>{' '}uses it internally
        to decide when to collapse to a single column.
      </Typography>
      <Paper style={{ padding: 16, marginBottom: 10 }}>
        <Typography type='body2'>
          This window is <code>{width}</code> &times; <code>{height}</code>. Resize the browser to watch it
          update.
        </Typography>
      </Paper>
      <CodeBlock code={`
        import { useWindowDimensions, Dimensions } from '@esmalley/react-material-ui';

        const { width, height } = useWindowDimensions();

        return width < 600 ? <MobileLayout /> : <DesktopLayout />;
      `} />
      <Typography type='body2' style={{ marginBottom: 10 }}>
        It deliberately returns <code>{'{ width: 0, height: 0 }'}</code>{' '}on the very first render and fills
        in real numbers from a mount effect. That avoids a server and client hydration mismatch, but it does
        mean the first paint always takes the smallest branch of whatever you write. If a zero-width layout
        flash matters, hold the render until you have a non-zero width.
      </Typography>
      <PropsTable
        note='The Dimensions interface is exported, so you can type a value you pass around.'
        rows={[
          { name: 'width', type: 'number', default: '0', description: 'window.innerWidth, or 0 before mount.' },
          { name: 'height', type: 'number', default: '0', description: 'window.innerHeight, or 0 before mount.' },
        ]}
      />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>useKontororu</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Returns a shared event bus. It is a module-level singleton, so every caller anywhere in the app gets
        the same instance &mdash; that is the point, it lets unrelated components talk without wiring props
        through the tree.
      </Typography>
      <CodeBlock code={`
        import { useKontororu } from '@esmalley/react-material-ui';

        const Kontororu = useKontororu();

        // somewhere that needs to react
        useEffect(() => {
          const handler = () => doSomething();
          Kontororu.addEventListener('my-event', handler);
          return () => Kontororu.removeEventListener('my-event', handler);
        }, []);

        // somewhere that triggers it
        Kontororu.dispatchEvent(new CustomEvent('my-event'));
      `} />
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Because the instance is shared process-wide, event names are effectively global. Namespace them if
        the app is large.
      </Typography>

      <Typography type='subtitle2' style={{ marginBottom: 4 }}>Events the library listens for</Typography>
      <PropsTable
        rows={[
          { name: 'next', type: 'CustomEvent', description: 'Advances a mounted Wizard by one step, running that step isValid() check first. This is the only way to drive the wizard from outside, since it does not accept a current-step prop.' },
        ]}
      />
      <CodeBlock code={`
        // advance the wizard when the user presses Enter in a field
        <TextInput
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              Kontororu.dispatchEvent(new CustomEvent('next'));
            }
          }}
        />
      `} />
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The bus is live on this page &mdash; <code>{typeof Kontororu.dispatchEvent === 'function' ? 'ready' : 'unavailable'}</code>.
      </Typography>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>useTextInputLogic, useSelectInputLogic and useMultiSelectInputLogic</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The machinery behind every input: focus, touched state, validation, the clear button and the
        dropdown open state. They are exported so a custom input can behave exactly like a built-in one
        rather than reimplementing the behaviour.
      </Typography>
      <CodeBlock code={`
        import { useTextInputLogic, TextInputProps } from '@esmalley/react-material-ui';

        const MyInput = (props: TextInputProps) => {
          const {
            value, isFocused, isTouched, hasError, displayedErrorMessage, handlers,
          } = useTextInputLogic<HTMLInputElement>(props);

          return (
            <input
              value={String(value ?? '')}
              onChange={handlers.handleChange}
              onFocus={handlers.handleFocus}
              onBlur={handlers.handleBlur}
            />
          );
        };
      `} />
      <PropsTable
        note='All three hooks return the same shape. Pass the component props straight through - the hook reads inputHandler, required, validator and the rest off them.'
        rows={[
          { name: 'value', type: 'Value', description: 'The current value, from the value prop when controlled or internal state when not.' },
          { name: 'isFocused', type: 'boolean', description: 'Whether the field currently has focus.' },
          { name: 'isTouched', type: 'boolean', description: 'Set once the field has been focused or clicked. Gates the required check.' },
          { name: 'isOpen', type: 'boolean', description: 'Dropdown open state. Lives in the shared base, so it exists on text inputs too and is simply unused there.' },
          { name: 'anchor', type: 'HTMLElement | null', description: 'The element a popup should anchor to.' },
          { name: 'hasError', type: 'boolean', description: 'The external error prop ORed with the internal validation result.' },
          { name: 'displayedErrorMessage', type: 'string | undefined', description: 'External errorMessage if given, otherwise the internal one.' },
          { name: 'handlers', type: 'object', description: 'handleFocus, handleBlur, handleChange, handleIsTouched, handleValidationError, handleClick, handleClose, handleKeyDown, handleInternalValue and handleIsOpen.' },
        ]}
      />
      <Typography type='body2' style={{ marginBottom: 10 }}>
        If you build an input on these, register it with the form handler and support both controlled and
        uncontrolled use, the way the built-in inputs do. See{' '}
        <Typography type='a' href='/inputs/validation' style={{ color: theme.link.primary }}>
          Forms and validation
        </Typography>
        .
      </Typography>
      <Divider />
    </div>
  );
}
