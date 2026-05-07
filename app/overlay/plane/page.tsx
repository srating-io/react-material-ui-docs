'use client';

import { Button, CodeBlock, Paper, Plane, Typography } from '@esmalley/react-material-ui';
import { useState } from 'react';

export default function Page() {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleToggle = (e) => {
    setAnchor(e.currentTarget);
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleClose = (e: MouseEvent) => {
    setOpen(false);
  };

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Plane</Typography>

      <Typography type='body1'>The plane component is a popover which can contain any contents.</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>It can be anchored to display near an element (like a button which triggers it).</Typography>
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

      <CodeBlock code = {`
        import { Button, Paper, Plane, Typography } from '@esmalley/react-material-ui';

        const [open, setOpen] = useState(false);
        const [anchor, setAnchor] = useState<HTMLElement | null>(null);

        const handleToggle = (e) => {
          setAnchor(e.currentTarget);
          if (open) {
            setOpen(false);
          } else {
            setOpen(true);
          }
        };

        const handleClose = (e: MouseEvent) => {
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
    </div>
  );
}
