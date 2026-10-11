'use client';

import { Chip, CodeBlock, Divider, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';
import { useState } from 'react';



const DeletableChips = () => {
  const [chips, setChips] = useState([
    { value: 1, title: 'Design' },
    { value: 2, title: 'Engineering' },
    { value: 3, title: 'Research' },
  ]);

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      {chips.map((chip) => (
        <Chip
          key={chip.value}
          title={chip.title}
          value={chip.value}
          onDelete={(e, value) => setChips(chips.filter((c) => c.value !== value))}
        />
      ))}
      {!chips.length ? (
        <Chip
          title='Reset'
          value='reset'
          filled
          onClick={() => setChips([
            { value: 1, title: 'Design' },
            { value: 2, title: 'Engineering' },
            { value: 3, title: 'Research' },
          ])}
        />
      ) : null}
    </div>
  );
};

export default function Page() {
  const [clickableFilled, setClickableFilled] = useState(false);
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Chip</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        Chips are compact elements that represent an attribute, entity, or action.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
      <Chip title='Standard chip' value={1} />
      <CodeBlock code={`
        import { Chip } from '@esmalley/react-material-ui';

        <Chip title='Standard chip' value={1} />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Filled</Typography>
      <Chip title='Filled chip' value={1} filled />
      <CodeBlock code={`
        import { Chip } from '@esmalley/react-material-ui';

        <Chip title='Filled chip' value={1} filled />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Clickable</Typography>
      <Chip
        title='Clickable'
        value={1}
        filled={clickableFilled}
        onClick={() => setClickableFilled(!clickableFilled)}
      />
      <CodeBlock code={`
        import { useState } from 'react';
        import { Chip } from '@esmalley/react-material-ui';

        const [isActive, setIsActive] = useState(false);

        <Chip
          title='Clickable'
          value={1}
          filled={isActive}
          onClick={() => setIsActive(!isActive)}
        />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Deletable</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Supplying <code>onDelete</code>{' '}adds a trailing cancel icon. The icon is its own tab stop and
        stops the event propagating, so removing a chip never also fires <code>onClick</code>{' '}&mdash; you
        can safely use both on the same chip.
      </Typography>
      <DeletableChips />
      <CodeBlock code={`
        import { useState } from 'react';
        import { Chip } from '@esmalley/react-material-ui';

        const [chips, setChips] = useState([
          { value: 1, title: 'Design' },
          { value: 2, title: 'Engineering' },
        ]);

        {chips.map((chip) => (
          <Chip
            key={chip.value}
            title={chip.title}
            value={chip.value}
            onDelete={(e, value) => setChips(chips.filter((c) => c.value !== value))}
          />
        ))}
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='The chip is keyboard operable only when onClick is supplied. The delete affordance is always reachable and stops the click from propagating, so deleting never also fires onClick.'
        rows={[
          { name: 'title', type: 'string', required: true, description: 'Chip label.' },
          { name: 'value', type: 'string | number', required: true, description: 'Passed back as the second argument to onClick and onDelete.' },
          { name: 'filled', type: 'boolean', default: 'false', description: 'Solid fill instead of the outlined treatment.' },
          { name: 'onClick', type: '(e: React.SyntheticEvent, value) => void', description: 'Makes the chip interactive: pointer cursor, hover shade, tab stop, Enter and Space.' },
          { name: 'onDelete', type: '(e: React.SyntheticEvent, value) => void', description: 'Adds a trailing cancel icon with its own tab stop and Enter/Space handling.' },
          { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Merged last.' },
        ]}
      />
    </div>
  );
}
