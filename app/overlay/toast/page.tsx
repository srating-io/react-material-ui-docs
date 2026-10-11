'use client';

import { Button, CodeBlock, Divider, getToaster, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';

export default function Page() {
  const showInfo = () => {
    getToaster().add('This is an info toast!', 'info');
  };

  const showSuccess = () => {
    getToaster().add('Operation successful!', 'success');
  };

  const showError = () => {
    getToaster().add('An error occurred!', 'error');
  };


  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Toast</Typography>

      <Typography type='body1' style={{ marginBottom: 10 }}>Toasts are informational popups that fade after a few seconds. Toast.tsx styles two severities specially &mdash; <code>success</code>{' '}and <code>error</code> &mdash; and renders every other value, including <code>info</code>, with the neutral info treatment.</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>Mount a single <code>&lt;Toast /&gt;</code>{' '}near the root of your application. <code>getToaster()</code>{' '}returns a shared singleton, so any code anywhere in the app can raise a toast without prop drilling.</Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Trigger Toasts</Typography>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Button title='Info' value={1} onClick={showInfo} />
        <Button title='Success' value={2} onClick={showSuccess} />
        <Button title='Error' value={3} onClick={showError} />
      </div>
      <CodeBlock code={`
        import { Button, Toast, getToaster } from '@esmalley/react-material-ui';

        const showInfo = () => {
          getToaster().add('This is an info toast!', 'info');
        };

        const showSuccess = () => {
          getToaster().add('Operation successful!', 'success');
        };

        const showError = () => {
          getToaster().add('An error occurred!', 'error');
        };

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Button title='Info' value={1} onClick={showInfo} />
          <Button title='Success' value={2} onClick={showSuccess} />
          <Button title='Error' value={3} onClick={showError} />
        </div>

        <Toast />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>getToaster</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>getToaster()</code>{' '}returns a shared singleton, so any module can raise a toast without a
        reference to the component. Toasts auto-dismiss after about four seconds.
      </Typography>
      <PropsTable
        note='The mounted <Toast /> subscribes to this manager. Without one mounted, calls to add() succeed silently and nothing is shown.'
        rows={[
          { name: 'add(message, type?)', type: '(message: string, type?: string) => number', description: "Queues a toast and returns its id. 'success' and 'error' get their own colour and icon; every other value, including 'info', renders as info." },
          { name: 'requestClose(id)', type: '(id: number) => void', description: 'Starts the exit animation. This is what the toast close button calls.' },
          { name: 'remove(id)', type: '(id: number) => void', description: 'Removes a toast immediately, skipping the animation.' },
          { name: 'getToasts()', type: '() => ToastItem[]', description: 'The current queue.' },
          { name: 'subscribe(listener)', type: '(listener) => () => void', description: 'Called on every change. Returns an unsubscribe function. The Toast component uses this internally.' },
        ]}
      />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Toast props</Typography>
      <PropsTable
        note='Toast portals into #menu-root, falling back to document.body, and renders nothing while the queue is empty. Mount exactly one.'
        rows={[
          { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Merged into the stack container, which is fixed to the bottom centre of the viewport.' },
        ]}
      />
    </div>
  );
}
