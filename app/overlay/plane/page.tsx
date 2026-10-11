'use client';

import { Button, CodeBlock, Divider, Paper, Plane, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';
import React, { useState } from 'react';

export default function Page() {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleToggle = (e: React.SyntheticEvent) => {
    setAnchor(e.currentTarget as HTMLElement);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Plane</Typography>

      <Typography type='body1'>The plane component is a popover which can contain any contents.</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>It can be anchored to display near an element (like a button which triggers it). Plane flips above the anchor when there is not enough room below, and closes on Escape, on a click outside, or on a backdrop click.</Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Anchored popover</Typography>
      <Button
        title='Toggle Plane'
        value={1}
        onClick={handleToggle}
      />

      <Plane
        open={open}
        anchor={anchor}
        onClose={handleClose}
      >
        <Paper style={{ padding: 15 }}>
          <Typography type='h6'>Plane Content</Typography>
          <Typography type='body2'>This popover is anchored to the button above.</Typography>
        </Paper>
      </Plane>

      <CodeBlock code={`
        import { useState } from 'react';
        import { Button, Paper, Plane, Typography } from '@esmalley/react-material-ui';

        const [open, setOpen] = useState(false);
        const [anchor, setAnchor] = useState<HTMLElement | null>(null);

        const handleToggle = (e: React.SyntheticEvent) => {
          setAnchor(e.currentTarget as HTMLElement);
          setOpen(!open);
        };

        const handleClose = () => {
          setOpen(false);
        };

        <Button
          title='Toggle Plane'
          value={1}
          onClick={handleToggle}
        />

        <Plane
          open={open}
          anchor={anchor}
          onClose={handleClose}
        >
          <Paper style={{ padding: 15 }}>
            <Typography type='h6'>Plane Content</Typography>
            <Typography type='body2'>This popover is anchored to the button above.</Typography>
          </Paper>
        </Plane>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='Plane is a plain positioned container, not a Paper, so give the child its own background. It closes on Escape, on a click outside and on a backdrop click.'
        rows={[
          { name: 'open', type: 'boolean', required: true, description: 'Whether the popover is showing.' },
          { name: 'anchor', type: 'HTMLElement | null', required: true, description: 'The element to position against.' },
          { name: 'onClose', type: '(e) => void', required: true, description: 'Called on Escape, outside click and backdrop click.' },
          { name: 'children', type: 'React.ReactNode', required: true, description: 'Popover content.' },
        ]}
      />
    </div>
  );
}
