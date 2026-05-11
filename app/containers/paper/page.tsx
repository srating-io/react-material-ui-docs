'use client';

import AddIcon from '@esmalley/react-material-icons/Add';
import { CodeBlock, Columns, Divider, IconButton, Paper, Typography } from '@esmalley/react-material-ui';

export default function Page() {
  const buttons = [
    <IconButton icon = {<AddIcon style = {{ fontSize: 20 }} />} type = 'circle' value={1} onClick={() => alert('you clicked a button')} />,
  ];

  const papers: React.JSX.Element[] = [];
  for (let i = 1; i <= 10; i++) {
    papers.push(<Paper elevation={i} style={{ height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{i}</Paper>);
  }

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Paper</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        The Paper component is used to create surfaces with elevation and shadows.
        It can also handle hover effects, transparency, and even host buttons.
      </Typography>

       <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
       <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Paper</Paper>
       <CodeBlock code={`
          import { Paper } from '@esmalley/react-material-ui';

          <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Paper
          </Paper>
        `} />
       <Divider />

       <Typography type='h6' style={{ marginBottom: 10 }}>Different elevations</Typography>
       <Columns numberOfColumns={10}>
        {papers}
       </Columns>
       <CodeBlock code={`
          import { Paper, Columns } from '@esmalley/react-material-ui';

          const papers: React.JSX.Element[] = [];
          for (let i = 1; i <= 10; i++) {
            papers.push(<Paper elevation={i} style={{ height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{i}</Paper>);
          }

          <Columns numberOfColumns={10}>
            {papers}
          </Columns>
        `} />
       <Divider />

       <Typography type='h6' style={{ marginBottom: 10 }}>Hover</Typography>
       <Paper hover style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Hover</Paper>
       <CodeBlock code={`
          import { Paper } from '@esmalley/react-material-ui';

          <Paper
            hover
            style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            Hover
          </Paper>
        `} />
       <Divider />

       <Typography type='h6' style={{ marginBottom: 10 }}>Transparency</Typography>
       <Paper tranparency={0.5} style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>50% Transparency</Paper>
       <CodeBlock code={`
          import { Paper } from '@esmalley/react-material-ui';

          <Paper
            tranparency={0.5}
            style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            50% Transparency
          </Paper>
        `} />
       <Divider />

       <Typography type='h6' style={{ marginBottom: 10 }}>With Buttons</Typography>
       <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }} buttons={buttons}>Included button</Paper>
       <CodeBlock code={`
          import { IconButton, Paper } from '@esmalley/react-material-ui';
          import AddIcon from '@esmalley/react-material-icons/Add';

          const buttons = [
            <IconButton icon={<AddIcon />} type='circle' value={1} onClick={() => alert('Clicked')} />
          ];

          <Paper
            style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            buttons={buttons}
          >
            Included button
          </Paper>
        `} />
    </div>
  );
}

