'use client';

import { Columns, Divider, Switch, SwitchProps, Typography } from '@esmalley/react-material-ui';
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
      <Typography type='h5' style={{ marginBottom: 20 }}>Toggle Inputs</Typography>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
        <ControlledInput value = {true} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard w/ label</Typography>
        <Columns numberOfColumns={3}>
            <ControlledInput label='Label at start' value = {true} labelPlacement='start' />
            <div></div>
            <ControlledInput label='Label at end' value = {false} labelPlacement='end' />
        </Columns>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Disabled</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput label = 'I am disabled' value={false} disabled={true} />
      </Columns>
      <Divider />
    </div>
  );
}
