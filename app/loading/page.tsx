'use client';

import { Backdrop, Button, CircularProgress, CodeBlock, Divider, LinearProgress, Skeleton, Typography } from '@esmalley/react-material-ui';
import { useState, useEffect } from 'react';

export default function LoadingPage() {
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
        The Loading component provides various ways to indicate progress or loading states, including circular and linear progress bars, backfor, and skeletons.
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
      <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', borderRadius: 4, marginBottom: 10 }}>
        <Button value='back-drop' title='Show Backdrop' onClick={() => setBackdropOpen(true)} />
      </div>
      <Backdrop open={backdropOpen}><CircularProgress /></Backdrop>
      <CodeBlock code={`
        import { Backdrop, Button, CircularProgress } from '@esmalley/react-material-ui';

        <Backdrop open={backdropOpen}>
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
    </div>
  );
}
