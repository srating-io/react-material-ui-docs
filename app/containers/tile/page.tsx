'use client';

import InfoIcon from '@esmalley/react-material-icons/Info';
import MouseIcon from '@esmalley/react-material-icons/Mouse';
import { Button, CodeBlock, Divider, Tile, Typography } from '@esmalley/react-material-ui';
import { toaster } from '@esmalley/ts-utils';


export default function Page() {
  const buttons = [
    <Button title='A button' value={1} onClick={() => toaster.add('You clicked a button', 'success')} />,
  ];

  return (
    <div style={{ padding: 20 }}>
      <Typography type='h5' style={{ marginBottom: 20 }}>Tile</Typography>
      <Typography type='body1' style={{ marginBottom: 20 }}>
        The Tile component is a versatile container for grouping related information.
        It supports icons, secondary text, action buttons, and click events.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
      <Tile primary='Standard tile' />
      <CodeBlock code={`
        import { Tile } from '@esmalley/react-material-ui';

        <Tile
          primary='Standard tile'
        />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Secondary</Typography>
      <Tile primary='Primary line' secondary='Secondary line' />
      <CodeBlock code={`
        import { Tile } from '@esmalley/react-material-ui';

        <Tile
          primary='Primary line'
          secondary='Secondary line'
        />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Icon</Typography>
      <Tile primary='Primary line' secondary='Secondary line' icon={<InfoIcon style={{ fontSize: 20 }} />} />
      <CodeBlock code={`
        import { Tile } from '@esmalley/react-material-ui';
        import InfoIcon from '@esmalley/react-material-icons/Info';

        <Tile
          primary='Primary line'
          secondary='Secondary line'
          icon={<InfoIcon style={{ fontSize: 20 }} />}
        />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Buttons</Typography>
      <Tile primary='Primary line' secondary='Secondary ' icon={<InfoIcon style={{ fontSize: 20 }} />} buttons={buttons} />
      <CodeBlock code={`
        import { Tile } from '@esmalley/react-material-ui';
        import InfoIcon from '@esmalley/react-material-icons/Info';

        <Tile
          primary='Primary line'
          secondary='Secondary line'
          icon={<InfoIcon style={{ fontSize: 20 }} />}
          buttons={buttons}
        />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Clickable</Typography>
      <Tile primary='Click me' secondary='Secondary line' icon={<MouseIcon style={{ fontSize: 20 }} />} onClick={() => toaster.add('Tile was clicked', 'success')} />
      <CodeBlock code={`
        import { Tile } from '@esmalley/react-material-ui';
        import MouseIcon from '@esmalley/react-material-icons/Mouse';
        import { toaster } from '@esmalley/ts-utils';

        <Tile
          primary='Click me'
          secondary='Secondary line'
          icon={<MouseIcon style={{ fontSize: 20 }} />}
          onClick={() => toaster.add('Tile was clicked', 'success')}
          />
        `} />
      <Divider />
    </div>
  );
}

