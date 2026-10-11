'use client';

import { CodeBlock, Columns, Divider, Switch, SwitchProps, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';
import { useState } from 'react';

// Helper component isolated to this page
const ControlledInput = (props: SwitchProps) => {
  const { value: propsValue, ...otherProps } = props;
  const [value, setValue] = useState(propsValue || false);

  return (
    <Switch
      value={value}
      onChange={(val) => setValue(val)}
      {...otherProps}
    />
  );
};

export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Switch</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        An on/off toggle. Note the controlled prop is value, not checked, and that Switch is the one input with no form-handler or validation integration - it has no inputHandler, required or error props.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>The wrapper used below</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Every example on this page renders through this small page-local wrapper, so each one is a real
        controlled input with its own state and its own form handler. Swap it for your own state and the
        snippets work as written.
      </Typography>
      <CodeBlock code={`
        import { useState } from 'react';
        import { Switch, SwitchProps } from '@esmalley/react-material-ui';

        const ControlledInput = (props: SwitchProps) => {
          const [value, setValue] = useState(props.value ?? false);

          return <Switch {...props} value={value} onChange={(val) => setValue(val)} />;
        };
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
        <ControlledInput value={true} />
      <CodeBlock code={`
        import { Switch } from '@esmalley/react-material-ui';

        <ControlledInput value={true} />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard w/ label</Typography>
        <Columns numberOfColumns={3}>
            <ControlledInput label='Label at start' value={true} labelPlacement='start' />
            <div></div>
            <ControlledInput label='Label at end' value={false} labelPlacement='end' />
        </Columns>
      <CodeBlock code={`
        import { Switch } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
            <ControlledInput label='Label at start' value={true} labelPlacement='start' />
            <div></div>
            <ControlledInput label='Label at end' value={false} labelPlacement='end' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Disabled</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput label='I am disabled' value={false} disabled={true} />
      </Columns>
      <CodeBlock code={`
        import { Switch } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput label='I am disabled' value={false} disabled={true} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='Switch does not take inputHandler, required, error or showError, and it renders no hidden checkbox - it will not take part in a native form submission. Enter activates it; Space does not.'
        rows={[
          { name: 'value', type: 'boolean', description: 'The controlled state. Note this is value, not checked.' },
          { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial state when uncontrolled.' },
          { name: 'onChange', type: '(value: boolean) => void', description: 'Called with the new state.' },
          { name: 'label', type: 'string', description: 'Text beside the track.' },
          { name: 'labelPlacement', type: '\'start\' | \'end\'', default: '\'start\'', description: 'Which side the label sits on.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Fades the control and blocks interaction.' },
          { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Merged into the container.' },
        ]}
      />
    </div>
  );
}
