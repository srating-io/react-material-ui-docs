'use client';

import { useState } from 'react';
import SearchIcon from '@esmalley/react-material-icons/Search';
import CasinoIcon from '@esmalley/react-material-icons/Casino';
import { CodeBlock, Columns, Divider, Inputs, TextInput, TextInputProps, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';

// Helper component isolated to this page
const ControlledInput = (props: TextInputProps) => {
  const { value: propsValue, ...otherProps } = props;
  const [value, setValue] = useState(propsValue || '');
  const inputHandler = new Inputs();

  return (
    <TextInput
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
      <Typography type='h5' style={{ marginBottom: 20 }}>TextInput</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        A single line text field. It is the base every other input is built from, so the variants, label, error and validation behaviour here apply to Textarea, Select and DateInput too.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>The wrapper used below</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Every example on this page renders through this small page-local wrapper, so each one is a real
        controlled input with its own state and its own form handler. Swap it for your own state and the
        snippets work as written.
      </Typography>
      <CodeBlock code={`
        import { useState } from 'react';
        import { Inputs, TextInput, TextInputProps } from '@esmalley/react-material-ui';

        const ControlledInput = (props: TextInputProps) => {
          const { value: propsValue, ...otherProps } = props;
          const [value, setValue] = useState(propsValue || '');
          const inputHandler = new Inputs();

          return (
            <TextInput
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
        import { Columns, TextInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='Outlined' variant='outlined' />
          <ControlledInput placeholder='Filled' variant='filled' />
          <ControlledInput placeholder='Standard' variant='standard' />
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
        import { Columns, TextInput } from '@esmalley/react-material-ui';

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
        import { Columns, TextInput } from '@esmalley/react-material-ui';

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
        import { Columns, TextInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput value='I am disabled' placeholder='Outlined' variant='outlined' disabled={true} />
          <ControlledInput value='I am disabled' placeholder='Filled' variant='filled' disabled={true} />
          <ControlledInput value='I am disabled' placeholder='Standard' variant='standard' disabled={true} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Formatter</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput value='Text' placeholder='Text' variant='outlined' formatter='text' />
        <ControlledInput value={123} placeholder='Numbers only' variant='filled' formatter='number' />
        <ControlledInput value={55.55} placeholder='Money' variant='standard' formatter='money' />
      </Columns>
      <CodeBlock code={`
        import { Columns, TextInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput value='Text' placeholder='Text' variant='outlined' formatter='text' />
          <ControlledInput value={123} placeholder='Numbers only' variant='filled' formatter='number' />
          <ControlledInput value={55.55} placeholder='Money' variant='standard' formatter='money' />
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
        import { Columns, TextInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='Required' variant='outlined' required={true} />
          <ControlledInput placeholder='Required' variant='filled' required={true} />
          <ControlledInput placeholder='Required' variant='standard' required={true} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Min / Max</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput placeholder='5 minimum' variant='outlined' formatter='number' value={1} min={5} />
        <ControlledInput placeholder='5 max' variant='filled' formatter='number' value={6} max={5} />
        <ControlledInput placeholder='Max length' variant='standard' formatter='text' value='a long string' maxLength={10} />
      </Columns>
      <CodeBlock code={`
        import { Columns, TextInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='5 minimum' variant='outlined' formatter='number' value={1} min={5} />
          <ControlledInput placeholder='5 max' variant='filled' formatter='number' value={6} max={5} />
          <ControlledInput placeholder='Max length' variant='standard' formatter='text' value='a long string' maxLength={10} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Icons</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='outlined' />
        <ControlledInput icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='filled' />
        <ControlledInput icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='standard' />
      </Columns>
      <Columns numberOfColumns={3}>
        <ControlledInput rightIcon={<CasinoIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='outlined' />
        <ControlledInput rightIcon={<CasinoIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='filled' />
        <ControlledInput rightIcon={<CasinoIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='standard' />
      </Columns>
      <CodeBlock code={`
        import { Columns, TextInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='outlined' />
          <ControlledInput icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='filled' />
          <ControlledInput icon={<SearchIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='standard' />
        </Columns>
        <Columns numberOfColumns={3}>
          <ControlledInput rightIcon={<CasinoIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='outlined' />
          <ControlledInput rightIcon={<CasinoIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='filled' />
          <ControlledInput rightIcon={<CasinoIcon style={{ fontSize: 20 }} />} placeholder='Icon' variant='standard' />
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
        import { Columns, TextInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='Clear' variant='outlined' value='clear input value' clear={true} />
          <ControlledInput placeholder='Clear' variant='filled' value='clear input value' clear={true} />
          <ControlledInput placeholder='Clear' variant='standard' value='clear input value' clear={true} />
        </Columns>
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Hide Error msg</Typography>
      <Columns numberOfColumns={3}>
        <ControlledInput placeholder='Hidden error message' variant='outlined' value='text' formatter='number' showError={false} />
        <ControlledInput placeholder='Hidden error message' variant='filled' value='text' formatter='number' showError={false} />
        <ControlledInput placeholder='Hidden error message' variant='standard' value='text' formatter='number' showError={false} />
      </Columns>
      <CodeBlock code={`
        import { Columns, TextInput } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3}>
          <ControlledInput placeholder='Hidden error message' variant='outlined' value='text' formatter='number' showError={false} />
          <ControlledInput placeholder='Hidden error message' variant='filled' value='text' formatter='number' showError={false} />
          <ControlledInput placeholder='Hidden error message' variant='standard' value='text' formatter='number' showError={false} />
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
        import { Columns, TextInput } from '@esmalley/react-material-ui';

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
        note='TextInputProps also extends the native input attributes (minus the ones the hook owns), so id, name, autoComplete, readOnly and the rest pass straight through to the input element.'
        rows={[
          { name: 'formatter', type: '\'text\' | \'number\' | \'money\'', default: '\'text\'', description: 'Controls both the blur transform and the validation. money rounds to two decimals on blur.' },
          { name: 'min', type: 'number', default: 'null', description: 'Numeric lower bound. Validated, not enforced while typing.' },
          { name: 'max', type: 'number', default: 'null', description: 'Numeric upper bound.' },
          { name: 'maxLength', type: 'number', description: 'Maximum length. Deliberately not set on the DOM node, so the user can overshoot and see the error rather than being silently truncated.' },
          { name: 'rightIcon', type: 'React.JSX.Element', description: 'Icon on the trailing edge. Shares the slot with the clear button.' },
          { name: 'onKeyDown', type: '(e: React.KeyboardEvent) => void', description: 'Runs after the internal handler.' },
          { name: 'ref', type: 'RefObject<HTMLInputElement | null>', default: 'null', description: 'Attaches to the input element.' },
        ]}
      />
    </div>
  );
}
