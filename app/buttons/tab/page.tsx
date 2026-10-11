'use client';

import { CodeBlock, Divider, Tab, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';
import { useState } from 'react';

export default function Page() {
  const [selected, setSelected] = useState(1);

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Tab</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        Tabs are primarily used for navigation between different views within the same context.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Navigation</Typography>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Tab title='Tab 1' value={1} selected={selected === 1} onClick={(e, value) => setSelected(value as number)} />
        <Tab title='Tab 2' value={2} selected={selected === 2} onClick={(e, value) => setSelected(value as number)} />
        <Tab title='Tab 3' value={3} selected={selected === 3} onClick={(e, value) => setSelected(value as number)} />
      </div>
      <CodeBlock code={`
        import { useState } from 'react';
        import { Tab } from '@esmalley/react-material-ui';

        const [selected, setSelected] = useState(1);

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Tab title='Tab 1' value={1} selected={selected === 1} onClick={(e, value) => setSelected(value as number)} />
          <Tab title='Tab 2' value={2} selected={selected === 2} onClick={(e, value) => setSelected(value as number)} />
          <Tab title='Tab 3' value={3} selected={selected === 3} onClick={(e, value) => setSelected(value as number)} />
        </div>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='Tab is a single tab, not a tab list. There is no container component and no arrow-key navigation - track the selected value yourself, as the example does.'
        rows={[
          { name: 'title', type: 'string', required: true, description: 'Tab label.' },
          { name: 'value', type: 'string | number', required: true, description: 'Passed back as the second argument to onClick.' },
          { name: 'selected', type: 'boolean', required: true, description: 'Draws the underline. You own which tab is selected.' },
          { name: 'onClick', type: '(e: React.SyntheticEvent, value) => void', required: true, description: 'Click handler.' },
          { name: 'containerStyle', type: 'React.CSSProperties', default: '{}', description: 'Applied to the wrapper. Set backgroundColor here and the label contrast is recalculated.' },
          { name: 'buttonStyle', type: 'React.CSSProperties', default: '{}', description: 'Applied to the button element.' },
          { name: 'ref', type: 'RefObject<HTMLDivElement> | null', default: 'null', description: 'Attaches to the wrapper.' },
        ]}
      />
    </div>
  );
}
