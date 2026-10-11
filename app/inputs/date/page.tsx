'use client';

import { useState } from 'react';
import SearchIcon from '@esmalley/react-material-icons/Search';
import { CodeBlock, Columns, DateInput, DateInputProps, Divider, Inputs, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';

// Helper component isolated to this page
const ControlledInput = (props: DateInputProps) => {
  const { value: propsValue, ...otherProps } = props;
  const [value, setValue] = useState<string | Date | null>(propsValue || '');
  const inputHandler = new Inputs();

  return (
    <DateInput
      inputHandler={inputHandler}
      value={value}
      onChange={(val) => setValue(val)}
      {...otherProps}
    />
  );
};

export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>DateInput</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        A masked date field with a Calendar in an anchored popover. Typing is masked to m/d/Y, and to m/d/Y h:i a when enableTime is set. An unparseable or out-of-range entry calls onChange with null.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>The wrapper used below</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Every example on this page renders through this small page-local wrapper, so each one is a real
        controlled input with its own state and its own form handler. Swap it for your own state and the
        snippets work as written.
      </Typography>
      <CodeBlock code={`
        import { useState } from 'react';
        import { DateInput, DateInputProps, Inputs } from '@esmalley/react-material-ui';

        const ControlledInput = (props: DateInputProps) => {
          const { value: propsValue, ...otherProps } = props;
          const [value, setValue] = useState(propsValue || '');
          const inputHandler = new Inputs();

          return (
            <DateInput
              inputHandler={inputHandler}
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
        <ControlledInput placeholder='Outlined' variant='outlined' />
        <ControlledInput placeholder='Filled' variant='filled' />
        <ControlledInput placeholder='Standard' variant='standard' />
      </Columns>
      <CodeBlock code={`
        import { Columns, DateInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='Outlined' variant='outlined' />
          <ControlledInput placeholder='Filled' variant='filled' />
          <ControlledInput placeholder='Standard' variant='standard' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Date and time</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput placeholder='Outlined' variant='outlined' enableTime />
        <ControlledInput placeholder='Filled' variant='filled' enableTime />
        <ControlledInput placeholder='Standard' variant='standard' enableTime />
      </Columns>
      <CodeBlock code={`
        import { Columns, DateInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='Outlined' variant='outlined' enableTime />
          <ControlledInput placeholder='Filled' variant='filled' enableTime />
          <ControlledInput placeholder='Standard' variant='standard' enableTime />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard w/ label</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput label='Outlined label' placeholder='Outlined' variant='outlined' />
        <ControlledInput label='Filled label' placeholder='Filled' variant='filled' />
        <ControlledInput label='Standard label' placeholder='Standard' variant='standard' />
      </Columns>
      <CodeBlock code={`
        import { Columns, DateInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput label='Outlined label' placeholder='Outlined' variant='outlined' />
          <ControlledInput label='Filled label' placeholder='Filled' variant='filled' />
          <ControlledInput label='Standard label' placeholder='Standard' variant='standard' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Errors</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput placeholder='Outlined' variant='outlined' error={true} errorMessage='Outlined error message!' />
        <ControlledInput placeholder='Filled' variant='filled' error={true} errorMessage='Filled error message!' />
        <ControlledInput placeholder='Standard' variant='standard' error={true} errorMessage='Standard error message!' />
      </Columns>
      <CodeBlock code={`
        import { Columns, DateInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='Outlined' variant='outlined' error={true} errorMessage='Outlined error message!' />
          <ControlledInput placeholder='Filled' variant='filled' error={true} errorMessage='Filled error message!' />
          <ControlledInput placeholder='Standard' variant='standard' error={true} errorMessage='Standard error message!' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Disabled</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput value='I am disabled' placeholder='Outlined' variant='outlined' disabled={true} />
        <ControlledInput value='I am disabled' placeholder='Filled' variant='filled' disabled={true} />
        <ControlledInput value='I am disabled' placeholder='Standard' variant='standard' disabled={true} />
      </Columns>
      <CodeBlock code={`
        import { Columns, DateInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput value='I am disabled' placeholder='Outlined' variant='outlined' disabled={true} />
          <ControlledInput value='I am disabled' placeholder='Filled' variant='filled' disabled={true} />
          <ControlledInput value='I am disabled' placeholder='Standard' variant='standard' disabled={true} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Required</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput placeholder='Required' variant='outlined' required={true} />
        <ControlledInput placeholder='Required' variant='filled' required={true} />
        <ControlledInput placeholder='Required' variant='standard' required={true} />
      </Columns>
      <CodeBlock code={`
        import { Columns, DateInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='Required' variant='outlined' required={true} />
          <ControlledInput placeholder='Required' variant='filled' required={true} />
          <ControlledInput placeholder='Required' variant='standard' required={true} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Min / Max</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput placeholder='Min date' variant='outlined' value={'2011-04-20'} minDate={'2011-05-01'} />
        <ControlledInput placeholder='Max date' variant='filled' value={'2026-04-05'} maxDate={'2026-04-01'} />
        <ControlledInput placeholder='Min + max date' variant='standard' value='2023-02-10' minDate='2023-02-01' maxDate='2023-02-15' />
      </Columns>
      <CodeBlock code={`
        import { Columns, DateInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='Min date' variant='outlined' value={'2011-04-20'} minDate={'2011-05-01'} />
          <ControlledInput placeholder='Max date' variant='filled' value={'2026-04-05'} maxDate={'2026-04-01'} />
          <ControlledInput placeholder='Min + max date' variant='standard' value='2023-02-10' minDate='2023-02-01' maxDate='2023-02-15' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Icons</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='outlined' />
        <ControlledInput icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='filled' />
        <ControlledInput icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='standard' />
      </Columns>
      <CodeBlock code={`
        import { Columns, DateInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='outlined' />
          <ControlledInput icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='filled' />
          <ControlledInput icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='standard' />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Clear input</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput placeholder='Clear' variant='outlined' value='clear input value' clear={true} />
        <ControlledInput placeholder='Clear' variant='filled' value='clear input value' clear={true} />
        <ControlledInput placeholder='Clear' variant='standard' value='clear input value' clear={true} />
      </Columns>
      <CodeBlock code={`
        import { Columns, DateInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='Clear' variant='outlined' value='clear input value' clear={true} />
          <ControlledInput placeholder='Clear' variant='filled' value='clear input value' clear={true} />
          <ControlledInput placeholder='Clear' variant='standard' value='clear input value' clear={true} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Hide Error msg</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput placeholder='Hidden error message' variant='outlined' value='text' showError={false} />
        <ControlledInput placeholder='Hidden error message' variant='filled' value='text' showError={false} />
        <ControlledInput placeholder='Hidden error message' variant='standard' value='text' showError={false} />
      </Columns>
      <CodeBlock code={`
        import { Columns, DateInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='Hidden error message' variant='outlined' value='text' showError={false} />
          <ControlledInput placeholder='Hidden error message' variant='filled' value='text' showError={false} />
          <ControlledInput placeholder='Hidden error message' variant='standard' value='text' showError={false} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Hide placeholder transform</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput placeholder='Hide placeholder' variant='outlined' transformPlaceholder={false} />
        <ControlledInput placeholder='Hide placeholder' variant='filled' transformPlaceholder={false} />
        <ControlledInput placeholder='Hide placeholder' variant='standard' transformPlaceholder={false} />
      </Columns>
      <CodeBlock code={`
        import { Columns, DateInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='Hide placeholder' variant='outlined' transformPlaceholder={false} />
          <ControlledInput placeholder='Hide placeholder' variant='filled' transformPlaceholder={false} />
          <ControlledInput placeholder='Hide placeholder' variant='standard' transformPlaceholder={false} />
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
        note='DateInput ignores defaultValue, validator, transformOnBlur, min and max even though the type accepts them, and always renders a calendar icon rather than the rightIcon you pass.'
        rows={[
          { name: 'value', type: 'string | Date | null', description: 'The selected date.' },
          { name: 'enableTime', type: 'boolean', default: 'false', description: 'Adds an hour, minute and meridiem column. Minutes step by 5.' },
          { name: 'minDate', type: 'string', default: '\'1900-01-01\'', description: 'Earliest allowed date. A value below it sets an error rather than clamping.' },
          { name: 'maxDate', type: 'string', default: '\'2100-01-01\'', description: 'Latest allowed date.' },
          { name: 'ref', type: 'RefObject<HTMLInputElement | null>', default: 'null', description: 'Attaches to the input element.' },
        ]}
      />
    </div>
  );
}
