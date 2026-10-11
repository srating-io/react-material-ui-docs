'use client';

import { CodeBlock, Divider, Slab, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';



export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Slab</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        A Slab pairs a small italic label with a primary value. Pass <code>info</code>{' '}to attach a help icon that reveals extra detail on click.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
      <Slab label='Slab label' primary='Slab primary text' />
      <CodeBlock code={`
        import { Slab } from '@esmalley/react-material-ui';

        <Slab label='Slab label' primary='Slab primary text' />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Slab with info</Typography>
      <Slab label='Label information' primary='Slab primary information' info='Slab extra information' />
      <CodeBlock code={`
        import { Slab } from '@esmalley/react-material-ui';

        <Slab
          label='Label information'
          primary='Slab primary information'
          info='Slab extra information'
        />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='getBaseLabelStyle is exported too, if you need to match the label treatment somewhere else.'
        rows={[
          { name: 'label', type: 'string', required: true, description: 'Small italic caption above the value.' },
          { name: 'primary', type: 'string | number', required: true, description: 'The value itself.' },
          { name: 'info', type: 'string', description: 'Adds a help icon that toggles this text into view.' },
          { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Merged into the container.' },
          { name: 'labelStyle', type: 'React.CSSProperties', default: '{}', description: 'Merged over the base label style.' },
          { name: 'primaryStyle', type: 'React.CSSProperties', default: '{}', description: 'Merged into the value.' },
        ]}
      />
    </div>
  );
}
