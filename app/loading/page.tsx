'use client';

import { Backdrop, Button, CircularProgress, CodeBlock, Divider, LinearProgress, Skeleton, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../components/PropsTable';
import { useState, useEffect } from 'react';

export default function Page() {
  const [progress, setProgress] = useState(0);
  const [backdropOpen, setBackdropOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) return 0;
        return Math.min(oldProgress + 10, 100);
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timeout: null | NodeJS.Timeout = null;
    if (backdropOpen) {
      timeout = setTimeout(() => setBackdropOpen(false), 3000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [backdropOpen]);

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Loading</Typography>
      <Typography type='body1' style={{ marginBottom: 20 }}>
        The Loading component provides various ways to indicate progress or loading states, including circular and linear progress bars, backdrop, and skeletons.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Circle indeterminate</Typography>
      <CircularProgress />
      <CodeBlock code={`
        import { CircularProgress } from '@esmalley/react-material-ui';

        <CircularProgress />
      `} />
      <Divider style={{ margin: '20px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Circle determinate</Typography>
      <CircularProgress type='determinate' value={progress} />
      <CodeBlock code={`
        import { CircularProgress } from '@esmalley/react-material-ui';

        <CircularProgress type='determinate' value={progress} />
      `} />
      <Divider style={{ margin: '20px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Linear indeterminate</Typography>
      <LinearProgress />
      <CodeBlock code={`
        import { LinearProgress } from '@esmalley/react-material-ui';

        <LinearProgress />
      `} />
      <Divider style={{ margin: '20px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Linear determinate</Typography>
      <LinearProgress type='determinate' value={progress} />
      <CodeBlock code={`
        import { LinearProgress } from '@esmalley/react-material-ui';

        <LinearProgress type='determinate' value={progress} />
      `} />
      <Divider style={{ margin: '20px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Backdrop</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>Backdrop renders in place rather than through a portal, and has no Escape handling. This demo closes on click or after three seconds.</Typography>
      <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', borderRadius: 4, marginBottom: 10 }}>
        <Button value='back-drop' title='Show Backdrop' onClick={() => setBackdropOpen(true)} />
      </div>
      <Backdrop open={backdropOpen} onClick={() => setBackdropOpen(false)}><CircularProgress /></Backdrop>
      <CodeBlock code={`
        import { useState } from 'react';
        import { Backdrop, Button, CircularProgress } from '@esmalley/react-material-ui';

        const [backdropOpen, setBackdropOpen] = useState(false);

        <Button value='back-drop' title='Show Backdrop' onClick={() => setBackdropOpen(true)} />

        {/* Backdrop has no built-in dismiss. Pass onClick, or close it from a timer or a request. */}
        <Backdrop open={backdropOpen} onClick={() => setBackdropOpen(false)}>
          <CircularProgress />
        </Backdrop>
      `} />
      <Divider style={{ margin: '20px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Skeleton</Typography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
        <Skeleton type='text' animation='wave' style={{ width: 100, height: 25 }} />
        <Skeleton type='text' animation='pulse' style={{ width: 100, height: 25 }} />
        <Skeleton type='circular' animation='wave' style={{ width: 50, height: 50 }} />
        <Skeleton type='circular' animation='pulse' style={{ width: 50, height: 50 }} />
      </div>
      <CodeBlock code={`
        import { Skeleton } from '@esmalley/react-material-ui';

        <Skeleton type='text' animation='wave' style={{ width: 100, height: 25 }} />
        <Skeleton type='circular' animation='pulse' style={{ width: 50, height: 50 }} />
      `} />
      <Divider style={{ margin: '20px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>CircularProgress props</Typography>
      <PropsTable
        rows={[
          { name: 'type', type: "'indeterminate' | 'determinate'", default: "'indeterminate'", description: 'Spinning, or showing a specific value.' },
          { name: 'value', type: 'number', default: '0', description: 'Percentage 0 to 100, clamped. Only used when determinate.' },
          { name: 'size', type: 'number', default: '40', description: 'Diameter in pixels.' },
          { name: 'thickness', type: 'number', default: '3.6', description: 'Stroke width.' },
          { name: 'color', type: 'string', default: 'theme.info.main', description: 'Stroke colour.' },
          { name: 'containerStyle', type: 'React.CSSProperties', default: '{}', description: 'Merged into the svg wrapper.' },
          { name: 'circleStyle', type: 'React.CSSProperties', default: '{}', description: 'Merged into the circle element.' },
        ]}
      />

      <Typography type='h6' style={{ marginBottom: 10 }}>LinearProgress props</Typography>
      <PropsTable
        note='The track colour is derived by appending an alpha to the bar colour, so color should be a 6-digit hex. A named or rgb() colour produces an invalid track.'
        rows={[
          { name: 'type', type: "'indeterminate' | 'determinate'", default: "'indeterminate'", description: 'Animated sweep, or showing a specific value.' },
          { name: 'value', type: 'number', default: '0', description: 'Percentage 0 to 100, clamped. Only used when determinate.' },
          { name: 'color', type: 'string', default: 'theme.info.main', description: 'Bar colour.' },
          { name: 'containerStyle', type: 'React.CSSProperties', default: '{}', description: 'Merged into the 4px track.' },
        ]}
      />

      <Typography type='h6' style={{ marginBottom: 10 }}>Skeleton props</Typography>
      <PropsTable
        note="There is no 'rectangular' variant. For a block placeholder use type='text' and give it a width and height."
        rows={[
          { name: 'type', type: "'text' | 'circular'", default: "'text'", description: "'text' is full width at 1em tall with rounded corners; 'circular' is a circle and needs explicit dimensions." },
          { name: 'animation', type: "'pulse' | 'wave'", default: "'pulse'", description: 'pulse fades opacity; wave sweeps a highlight across.' },
          { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Merged last. Set width and height here.' },
        ]}
      />

      <Typography type='h6' style={{ marginBottom: 10 }}>Backdrop props</Typography>
      <PropsTable
        note='Backdrop renders in place rather than through a portal, and has no Escape handling. It returns null while closed.'
        rows={[
          { name: 'open', type: 'boolean', required: true, description: 'Whether the overlay is showing.' },
          { name: 'children', type: 'React.JSX.Element', required: true, description: 'Centred content, usually a progress indicator.' },
          { name: 'onClick', type: '() => void', description: 'Click handler on the overlay. The only built-in way to make it dismissable.' },
          { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Merged into the overlay.' },
        ]}
      />
    </div>
  );
}
