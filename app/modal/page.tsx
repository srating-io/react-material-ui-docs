'use client';

import { Button, CodeBlock, Divider, ErrorModal, Modal, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../components/PropsTable';
import React, { useState } from 'react';

// Modal does not export its props type, so the optional half is spelled out here.
type ModalDemoProps = {
  type?: 'paper' | 'custom';
  showCloseButton?: boolean;
  paperStyle?: React.CSSProperties;
};

const ControlledModal = (props: ModalDemoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button title='Open modal' value={1} onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        {...props}
      >
        <Typography type='h6'>A modal title</Typography>
        <Typography type='body1'>Modal contents... you can put anything in as the children of a modal!</Typography>
      </Modal>
    </>
  );
};

const CustomModal = (props: ModalDemoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button title='Open modal' value={1} onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        {...props}
      >
        <div style={{ backgroundColor: 'orange', width: 400 }}>
          <Typography type='h6'>A modal title</Typography>
          <Typography type='body1'>Modal contents... you can put anything in as the children of a modal!</Typography>
        </div>
      </Modal>
    </>
  );
};

const ErrorModalDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button title='Trigger an error' value='error' onClick={() => setOpen(true)} />
      <ErrorModal
        open={open}
        title='Could not save'
        message='The server rejected the request. Try again in a moment.'
        confirmText='Dismiss'
        confirm={() => setOpen(false)}
      />
    </>
  );
};

export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Modal</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        A centred overlay that portals into <code>#menu-root</code>, falling back to{' '}
        <code>document.body</code>. It renders nothing while closed. Dismissal is by clicking the backdrop
        or the optional close button &mdash; there is no Escape handler, no focus trap and no body scroll
        lock, so supply those yourself if the content needs them.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
      <ControlledModal />
      <CodeBlock code={`
        import { Button, Modal } from '@esmalley/react-material-ui';

        const ControlledModal = (props) => {
          const [open, setOpen] = useState(false);

          return (
            <>
              <Button title='Open modal' value={1} onClick={() => setOpen(true)} />
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                {...props}
              >
                <Typography type='h6'>A modal title</Typography>
                <Typography type='body1'>Modal contents... you can put anything in as the children of a modal!</Typography>
              </Modal>
            </>
          );
        };

        <ControlledModal />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Show close button</Typography>
      <ControlledModal showCloseButton />
      <CodeBlock code={`
        import { Button, Modal } from '@esmalley/react-material-ui';

        const ControlledModal = (props) => {
          const [open, setOpen] = useState(false);

          return (
            <>
              <Button title='Open modal' value={1} onClick={() => setOpen(true)} />
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                {...props}
              >
                <Typography type='h6'>A modal title</Typography>
                <Typography type='body1'>Modal contents... you can put anything in as the children of a modal!</Typography>
              </Modal>
            </>
          );
        };

        <ControlledModal showCloseButton />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Custom Type</Typography>
      <CustomModal type="custom" />
      <CodeBlock code={`
        import { Button, Modal } from '@esmalley/react-material-ui';

        const CustomModal = (props: ModalDemoProps) => {
          const [open, setOpen] = useState(false);

          return (
            <>
              <Button title='Open modal' value={1} onClick={() => setOpen(true)} />
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                {...props}
              >
                <div style={{ backgroundColor: 'orange', width: 400 }}>
                  <Typography type='h6'>A modal title</Typography>
                  <Typography type='body1'>Modal contents... you can put anything in as the children of a modal!</Typography>
                </div>
              </Modal>
            </>
          );
        };
  
        <CustomModal type="custom" />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>ErrorModal</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        A prebuilt confirmation dialog for surfacing a failure. It wraps <code>Modal</code>{' '}with a title, a
        message and a single acknowledge button, so you do not rebuild the same shape per error.
      </Typography>
      <ErrorModalDemo />
      <CodeBlock code={`
        import { useState } from 'react';
        import { ErrorModal } from '@esmalley/react-material-ui';

        const [open, setOpen] = useState(false);

        <ErrorModal
          open={open}
          title='Could not save'
          message='The server rejected the request. Try again in a moment.'
          confirmText='Dismiss'
          confirm={() => setOpen(false)}
        />
      `} />
      <PropsTable
        note='confirm is wired to both the button and the modal onClose, so dismissing with a backdrop click counts as confirming. Do not use it for a destructive yes/no choice.'
        rows={[
          { name: 'open', type: 'boolean', required: true, description: 'Whether the dialog is showing.' },
          { name: 'message', type: 'string', required: true, description: 'Body text.' },
          { name: 'confirm', type: '() => void', required: true, description: 'Runs when the button is pressed, and also on a backdrop dismissal.' },
          { name: 'title', type: 'string', default: "'Error'", description: 'Heading above the message.' },
          { name: 'confirmText', type: 'string', default: "'Ok'", description: 'Button label.' },
        ]}
      />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Modal props</Typography>
      <PropsTable
        rows={[
          { name: 'open', type: 'boolean', required: true, description: 'Whether the modal is showing.' },
          { name: 'onClose', type: '(e: React.SyntheticEvent) => void', required: true, description: 'Called on a backdrop click and from the close button.' },
          { name: 'children', type: 'React.ReactNode', required: true, description: 'Modal content.' },
          { name: 'type', type: "'paper' | 'custom'", default: "'paper'", description: "'paper' wraps the children in a themed Paper. 'custom' renders them bare so you can supply the whole surface." },
          { name: 'showCloseButton', type: 'boolean', default: 'false', description: 'Adds a sticky close button in the top right.' },
          { name: 'paperStyle', type: 'React.CSSProperties', default: '{}', description: "Merged over the default Paper sizing (minWidth 320, maxWidth 500, minHeight 100, padding 16). Ignored when type is 'custom'." },
        ]}
      />
    </div>
  );
}



