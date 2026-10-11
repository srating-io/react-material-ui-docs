'use client';

import { CodeBlock, Divider, Inputs, MultiPicker, MultiPickerOption, MultiPickerProps, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';
import { useState } from 'react';

type ControlledMultiPickerProps = Omit<MultiPickerProps, 'inputHandler' | 'selected' | 'options'> & {
  selected?: MultiPickerProps['selected'];
  options?: MultiPickerProps['options'];
};

// Helper component isolated to this page
const ControlledInput = (props: ControlledMultiPickerProps) => {
  const {
    selected: propsSelected,
    // inputHandler: _inputHandler,
    options: propsOptions,
    ...otherProps
  } = props;

  const [selected, setSelected] = useState(propsSelected || []);
  const inputHandler = new Inputs();

  const options: MultiPickerOption[] = [
    {
      label: 'Option 1',
      value: 1,
    },
    {
      label: 'Option 2',
      value: 2,
    },
    {
      label: 'Option 3',
      value: 3,
    },
  ];

  return (
    <MultiPicker
      inputHandler={inputHandler}
      options={propsOptions || options}
      selected={selected}
      {...otherProps}
      onChange={(val) => setSelected((props.isRadio ? [val as number | string] : val as (string | number)[]))}
    />
  );
};

export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>MultiPicker</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        A grid of selectable cards for picking several options at once, or exactly one in radio mode. Unlike the other inputs, inputHandler is required rather than optional.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>The wrapper used below</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Every example on this page renders through this small page-local wrapper, so each one is a real
        controlled input with its own state and its own form handler. Swap it for your own state and the
        snippets work as written.
      </Typography>
      <CodeBlock code={`
        import { useState } from 'react';
        import { Inputs, MultiPicker, MultiPickerOption } from '@esmalley/react-material-ui';

        const options: MultiPickerOption[] = [
          { label: 'Option one', value: 1 },
          { label: 'Option two', value: 2 },
        ];

        const ControlledInput = (props) => {
          const [selected, setSelected] = useState<(string | number)[]>([]);
          const inputHandler = new Inputs();

          return (
            <MultiPicker
              inputHandler={inputHandler}
              options={options}
              selected={selected}
              onChange={(val) => setSelected(val as (string | number)[])}
              {...props}
            />
          );
        };
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
        <ControlledInput />
      <CodeBlock code={`
        import { MultiPicker } from '@esmalley/react-material-ui';

        <ControlledInput />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Radio</Typography>
        <ControlledInput label='Radio option, can only select one.' isRadio />
      <CodeBlock code={`
        import { MultiPicker } from '@esmalley/react-material-ui';

        <ControlledInput label='Radio option, can only select one.' isRadio />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Number of columns</Typography>
        <ControlledInput label='Specified 5 columns' numberOfColumns={5} options={[
          {
            label: 'Option 1',
            value: 1,
          },
          {
            label: 'Option 2',
            value: 2,
          },
          {
            label: 'Option 3',
            value: 3,
          },
          {
            label: 'Option 4',
            value: 4,
          },
          {
            label: 'Option 5',
            value: 5,
          },
        ]} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Errors</Typography>
        <ControlledInput error={true} errorMessage='Error message!' />
      <CodeBlock code={`
        import { MultiPicker } from '@esmalley/react-material-ui';

        <ControlledInput error={true} errorMessage='Error message!' />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Disabled</Typography>
        <ControlledInput label='These options are disabled' disabled={true} />
      <CodeBlock code={`
        import { MultiPicker } from '@esmalley/react-material-ui';

        <ControlledInput label='These options are disabled' disabled={true} />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Required</Typography>
        <ControlledInput label='This question is required' required={true} />
      <CodeBlock code={`
        import { MultiPicker } from '@esmalley/react-material-ui';

        <ControlledInput label='This question is required' required={true} />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Hide Error msg</Typography>
        <ControlledInput label='Hidden error message' showError={false} />
      <CodeBlock code={`
        import { MultiPicker } from '@esmalley/react-material-ui';

        <ControlledInput label='Hidden error message' showError={false} />
      `} />
      <Divider />



      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='inputHandler is required here, unlike every other input. Enter and Space both activate an option.'
        rows={[
          { name: 'inputHandler', type: 'Inputs', description: 'Required. The form registry this picker reports to.' },
          { name: 'options', type: 'MultiPickerOption[]', description: 'Required. The choices, each { label, value }.' },
          { name: 'selected', type: '(string | number)[]', description: 'Required. The selected values. Re-synced by a shallow compare, so it behaves as controlled.' },
          { name: 'onChange', type: '(value) => void', description: 'Receives an array in multi mode, or a single value (or null) in radio mode.' },
          { name: 'isRadio', type: 'boolean', default: 'false', description: 'Allow only one selection. Clicking the selected option again clears it.' },
          { name: 'numberOfColumns', type: 'number', default: '2', description: 'Grid width.' },
          { name: 'label', type: 'string', description: 'Caption above the grid.' },
          { name: 'required', type: 'boolean', default: 'false', description: 'Adds the required check.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Blocks interaction on every option.' },
          { name: 'error', type: 'boolean', default: 'false', description: 'Force the error state.' },
          { name: 'errorMessage', type: 'string', default: '\'Selection is required\'', description: 'Message shown under the grid.' },
          { name: 'showError', type: 'boolean', default: 'true', description: 'Hide the message while keeping the reserved space.' },
          { name: 'triggerValidation', type: 'boolean', default: 'false', description: 'Validate as if touched.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Applied to each option card, not the container.' },
        ]}
      />
    </div>
  );
}
