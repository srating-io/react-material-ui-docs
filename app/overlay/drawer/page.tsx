'use client';

import { Button, CodeBlock, Drawer, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';
import { useState } from 'react';

export default function Page() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('left');

  const handlePositionChange = (newPosition: 'left' | 'right' | 'top' | 'bottom') => {
    setPosition(newPosition);
    setOpen(true);
  };

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Drawer</Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Open drawer in certain position</Typography>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Button title='Open Left' value={1} onClick={() => handlePositionChange('left')} />
        <Button title='Open Right' value={2} onClick={() => handlePositionChange('right')} />
        <Button title='Open Top' value={3} onClick={() => handlePositionChange('top')} />
        <Button title='Open Bottom' value={4} onClick={() => handlePositionChange('bottom')} />
      </div>

      <Drawer open={open} position={position} onClose={() => setOpen(false)}>
        <div style={{ padding: 10 }}>
          <Typography type='h5'>Drawer Content</Typography>
          <Typography type='body1'>This drawer is positioned on the {position} side.</Typography>
          <div style={{ textAlign: 'right' }}><Button title='Close Drawer' ink value={1} onClick={() => setOpen(false)} /></div>
        </div>
      </Drawer>

      <CodeBlock code={`
        import { Drawer, Typography } from '@esmalley/react-material-ui';

        const [open, setOpen] = useState(false);
        const [position, setPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('left');

        <Drawer open={open} position={position} onClose={() => setOpen(false)}>
          <div style={{ padding: 10 }}>
            <Typography type='h5'>Drawer Content</Typography>
            <Typography type='body1'>This drawer is positioned on the {position} side.</Typography>
            <div style={{ textAlign: 'right' }}><Button title='Close Drawer' ink value={1} onClick={() => setOpen(false)} /></div>
          </div>
        </Drawer>
      `} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='Drawer stays mounted while closed so it can animate off-screen, and it locks body scroll while open. There is no Escape handler and no focus trap.'
        rows={[
          { name: 'open', type: 'boolean', required: true, description: 'Whether the panel is showing.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called on a backdrop click.' },
          { name: 'children', type: 'React.JSX.Element', required: true, description: 'Panel content. Set the panel size from here - there is no width prop.' },
          { name: 'position', type: '\'left\' | \'right\' | \'top\' | \'bottom\'', default: '\'left\'', description: 'Which edge the panel slides in from.' },
        ]}
      />
    </div>
  );
}
