'use client';

import AddIcon from '@esmalley/react-material-icons/Add';
import { CodeBlock, Columns, Divider, getToaster, IconButton, Paper, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';

export default function Page() {
  const buttons = [
    <IconButton key='icon-button' icon={<AddIcon style={{ fontSize: 20 }} />} type='circle' value={1} onClick={() => getToaster().add('Clicked', 'success')} />,
  ];

  const papers: React.JSX.Element[] = [];
  for (let i = 1; i <= 10; i++) {
    papers.push(<Paper key={i} elevation={i} style={{ height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{i}</Paper>);
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
       <Paper transparency={0.5} style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>50% Transparency</Paper>
       <CodeBlock code={`
          import { Paper } from '@esmalley/react-material-ui';

          <Paper
            transparency={0.5}
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
            <IconButton icon={<AddIcon style={{ fontSize: 20 }} />} type='circle' value={1} onClick={() => getToaster().add('Clicked', 'success')} />
          ];

          <Paper
            style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            buttons={buttons}
          >
            Included button
          </Paper>
        `} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='In light mode the background is white at every elevation - elevation only changes the shadow. In dark mode it also lightens the surface.'
        rows={[
          { name: 'children', type: 'React.ReactNode', required: true, description: 'Surface content.' },
          { name: 'elevation', type: 'number', default: '3', description: 'Shadow depth, and in dark mode how far the surface lifts toward grey.' },
          { name: 'transparency', type: 'number', default: '0', description: 'Alpha applied to the background, 0 to 1.' },
          { name: 'hover', type: 'boolean', default: 'false', description: 'Adds a hover wash. Pair it with onClick.' },
          { name: 'onClick', type: '(e: React.SyntheticEvent) => void', description: 'Click handler.' },
          { name: 'onKeyDown', type: '(e: React.KeyboardEvent) => void', description: 'Key handler. Pair with tabIndex to make the surface operable.' },
          { name: 'tabIndex', type: 'number', description: 'Put the surface in the tab order.' },
          { name: 'buttons', type: 'React.JSX.Element[]', default: '[]', description: 'Rendered in a strip floated above the top right corner. Sized for 40px tall buttons.' },
          { name: 'onAnimationEnd', type: 'AnimationEventHandler', description: 'Fires when a CSS animation on the surface finishes.' },
          { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Merged last. Accepts a nested hover block.' },
          { name: 'ref', type: 'RefObject<HTMLDivElement | null>', description: 'Attaches to the surface.' },
        ]}
      />
    </div>
  );
}

