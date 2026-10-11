'use client';

import SearchIcon from '@esmalley/react-material-icons/Search';
import { CodeBlock, Columns, Divider, Inputs, Select, SelectInputProps, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';
import { useState } from 'react';

type ControlledSelectProps = Omit<SelectInputProps, 'options'>;

const ControlledSelect = (props: ControlledSelectProps) => {
  const { value: propsValue, ...otherProps } = props;
  const [value, setValue] = useState<string | number | null>(propsValue || '');
  const inputHandler = new Inputs();

  const options = [
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
  ];

  return (
    <Select
      inputHandler={inputHandler}
      value={value}
      onChange={(val) => setValue(val)}
      options={options}
      {...otherProps}
    />
  );
};

export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Select</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        A single-choice dropdown. It is not a native select - the trigger is a styled element and the list is a Menu, so it themes and positions like the rest of the library.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>The wrapper used below</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Every example on this page renders through this small page-local wrapper, so each one is a real
        controlled input with its own state and its own form handler. Swap it for your own state and the
        snippets work as written.
      </Typography>
      <CodeBlock code={`
        import { useState } from 'react';
        import { Inputs, Select, SelectInputProps } from '@esmalley/react-material-ui';

        const options = [
          { label: 'Option one', value: 1 },
          { label: 'Option two', value: 2 },
        ];

        const ControlledSelect = (props: Omit<SelectInputProps, 'options'>) => {
          const { value: propsValue, ...otherProps } = props;
          const [value, setValue] = useState(propsValue ?? null);
          const inputHandler = new Inputs();

          return (
            <Select
              inputHandler={inputHandler}
              options={options}
              value={value}
              onChange={(val) => setValue(val)}
              {...otherProps}
            />
          );
        };
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
      <Columns numberOfColumns={3}>
        <ControlledSelect placeholder='Outlined' variant='outlined' />
        <ControlledSelect placeholder='Filled' variant='filled' />
        <ControlledSelect placeholder='Standard' variant='standard' />
      </Columns>
      <CodeBlock code={`
        import { Columns, Select } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledSelect placeholder='Outlined' variant='outlined' />
          <ControlledSelect placeholder='Filled' variant='filled' />
          <ControlledSelect placeholder='Standard' variant='standard' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard w/ label</Typography>
      <Columns numberOfColumns={3}>
        <ControlledSelect label='Outlined label' placeholder='Outlined' variant='outlined' />
        <ControlledSelect label='Filled label' placeholder='Filled' variant='filled' />
        <ControlledSelect label='Standard label' placeholder='Standard' variant='standard' />
      </Columns>
      <CodeBlock code={`
        import { Columns, Select } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledSelect label='Outlined label' placeholder='Outlined' variant='outlined' />
          <ControlledSelect label='Filled label' placeholder='Filled' variant='filled' />
          <ControlledSelect label='Standard label' placeholder='Standard' variant='standard' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Errors</Typography>
      <Columns numberOfColumns={3}>
        <ControlledSelect placeholder='Outlined' variant='outlined' error={true} errorMessage='Outlined error message!' />
        <ControlledSelect placeholder='Filled' variant='filled' error={true} errorMessage='Filled error message!' />
        <ControlledSelect placeholder='Standard' variant='standard' error={true} errorMessage='Standard error message!' />
      </Columns>
      <CodeBlock code={`
        import { Columns, Select } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledSelect placeholder='Outlined' variant='outlined' error={true} errorMessage='Outlined error message!' />
          <ControlledSelect placeholder='Filled' variant='filled' error={true} errorMessage='Filled error message!' />
          <ControlledSelect placeholder='Standard' variant='standard' error={true} errorMessage='Standard error message!' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Disabled</Typography>
      <Columns numberOfColumns={3}>
        <ControlledSelect placeholder='Outlined' variant='outlined' disabled={true} />
        <ControlledSelect placeholder='Filled' variant='filled' disabled={true} />
        <ControlledSelect placeholder='Standard' variant='standard' disabled={true} />
      </Columns>
      <CodeBlock code={`
        import { Columns, Select } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledSelect placeholder='Outlined' variant='outlined' disabled={true} />
          <ControlledSelect placeholder='Filled' variant='filled' disabled={true} />
          <ControlledSelect placeholder='Standard' variant='standard' disabled={true} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Required</Typography>
      <Columns numberOfColumns={3}>
        <ControlledSelect placeholder='Outlined' variant='outlined' required={true} />
        <ControlledSelect placeholder='Filled' variant='filled' required={true} />
        <ControlledSelect placeholder='Standard' variant='standard' required={true} />
      </Columns>
      <CodeBlock code={`
        import { Columns, Select } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledSelect placeholder='Outlined' variant='outlined' required={true} />
          <ControlledSelect placeholder='Filled' variant='filled' required={true} />
          <ControlledSelect placeholder='Standard' variant='standard' required={true} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Icons</Typography>
      <Columns numberOfColumns={3}>
        <ControlledSelect icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='outlined' />
        <ControlledSelect icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='filled' />
        <ControlledSelect icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='standard' />
      </Columns>
      <CodeBlock code={`
        import { Columns, Select } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledSelect icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='outlined' />
          <ControlledSelect icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='filled' />
          <ControlledSelect icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='standard' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Clear input</Typography>
      <Columns numberOfColumns={3}>
        <ControlledSelect placeholder='Clear' variant='outlined' clear={true} value={1} />
        <ControlledSelect placeholder='Clear' variant='filled' clear={true} value={2} />
        <ControlledSelect placeholder='Clear' variant='standard' clear={true} value={3} />
      </Columns>
      <CodeBlock code={`
        import { Columns, Select } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledSelect placeholder='Clear' variant='outlined' clear={true} value={1} />
          <ControlledSelect placeholder='Clear' variant='filled' clear={true} value={2} />
          <ControlledSelect placeholder='Clear' variant='standard' clear={true} value={3} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Hide Error msg</Typography>
      <Columns numberOfColumns={3}>
        <ControlledSelect placeholder='Hidden error message' variant='outlined' showError={false} />
        <ControlledSelect placeholder='Hidden error message' variant='filled' showError={false} />
        <ControlledSelect placeholder='Hidden error message' variant='standard' showError={false} />
      </Columns>
      <CodeBlock code={`
        import { Columns, Select } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledSelect placeholder='Hidden error message' variant='outlined' showError={false} />
          <ControlledSelect placeholder='Hidden error message' variant='filled' showError={false} />
          <ControlledSelect placeholder='Hidden error message' variant='standard' showError={false} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Hide placeholder transform</Typography>
      <Columns numberOfColumns={3}>
        <ControlledSelect placeholder='Hide placeholder' variant='outlined' transformPlaceholder={false} />
        <ControlledSelect placeholder='Hide placeholder' variant='filled' transformPlaceholder={false} />
        <ControlledSelect placeholder='Hide placeholder' variant='standard' transformPlaceholder={false} />
      </Columns>
      <CodeBlock code={`
        import { Columns, Select } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledSelect placeholder='Hide placeholder' variant='outlined' transformPlaceholder={false} />
          <ControlledSelect placeholder='Hide placeholder' variant='filled' transformPlaceholder={false} />
          <ControlledSelect placeholder='Hide placeholder' variant='standard' transformPlaceholder={false} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The shared base props &mdash; variant, label, placeholder, value, defaultValue, onChange, required,
        disabled, error, errorMessage, showError, triggerValidation, validator, transformOnBlur, clear and
        icon &mdash; are documented once on the{' '}
        <Typography type='a' href='/inputs/validation'>Forms and validation</Typography>{' '}page. Listed
        below are the props specific to this component.
      </Typography>
      <PropsTable
        note='Focus opens the menu, and so does a click. Enter and Space do not, so this is not a drop-in replacement for a native select in a keyboard-only flow.'
        rows={[
          { name: 'options', type: 'SelectOption[]', description: 'The choices, each { label, value }. Required.' },
          { name: 'value', type: 'string | number | null', description: 'The selected value. null means nothing selected.' },
          { name: 'ref', type: 'RefObject<HTMLDivElement | null>', default: 'null', description: 'Attaches to the trigger element.' },
        ]}
      />
    </div>
  );
}
