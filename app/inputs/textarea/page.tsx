'use client';

import { useState } from 'react';
import SearchIcon from '@esmalley/react-material-icons/Search';
import CasinoIcon from '@esmalley/react-material-icons/Casino';
import { CodeBlock, Columns, Divider, Inputs, Textarea, TextareaProps, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';

// Helper component isolated to this page
const ControlledInput = (props: TextareaProps) => {
  const { value: propsValue, ...otherProps } = props;
  const [value, setValue] = useState(propsValue || '');
  const inputHandler = new Inputs();

  return (
    <Textarea
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
      <Typography type='h5' style={{ marginBottom: 20 }}>Textarea</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        A multi-line text field. It shares the whole TextInput prop surface and adds rows, which sets the starting height. The field is vertically resizable and grows from a 46px minimum.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>The wrapper used below</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Every example on this page renders through this small page-local wrapper, so each one is a real
        controlled input with its own state and its own form handler. Swap it for your own state and the
        snippets work as written.
      </Typography>
      <CodeBlock code={`
        import { useState } from 'react';
        import { Inputs, Textarea, TextareaProps } from '@esmalley/react-material-ui';

        const ControlledInput = (props: TextareaProps) => {
          const { value: propsValue, ...otherProps } = props;
          const [value, setValue] = useState(propsValue || '');
          const inputHandler = new Inputs();

          return (
            <Textarea
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
        import { Columns, Textarea } from '@esmalley/react-material-ui';

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
        import { Columns, Textarea } from '@esmalley/react-material-ui';

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
        import { Columns, Textarea } from '@esmalley/react-material-ui';

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
        import { Columns, Textarea } from '@esmalley/react-material-ui';

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
        import { Columns, Textarea } from '@esmalley/react-material-ui';

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
        import { Columns, Textarea } from '@esmalley/react-material-ui';

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
        import { Columns, Textarea } from '@esmalley/react-material-ui';

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
        import { Columns, Textarea } from '@esmalley/react-material-ui';

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
        import { Columns, Textarea } from '@esmalley/react-material-ui';

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
        import { Columns, Textarea } from '@esmalley/react-material-ui';

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
        import { Columns, Textarea } from '@esmalley/react-material-ui';

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
        note='TextareaProps extends the native textarea attributes. The field has a 46px minimum height and resizes vertically.'
        rows={[
          { name: 'rows', type: 'number', default: '4', description: 'Starting height in rows.' },
          { name: 'formatter', type: '\'text\' | \'number\' | \'money\'', default: '\'text\'', description: 'Same transform and validation as TextInput.' },
          { name: 'min', type: 'number', default: 'null', description: 'Numeric lower bound.' },
          { name: 'max', type: 'number', default: 'null', description: 'Numeric upper bound.' },
          { name: 'maxLength', type: 'number', description: 'Maximum length, validated rather than enforced.' },
          { name: 'rightIcon', type: 'React.JSX.Element', description: 'Icon on the trailing edge.' },
          { name: 'ref', type: 'RefObject<HTMLTextAreaElement | null>', default: 'null', description: 'Attaches to the textarea element.' },
        ]}
      />
    </div>
  );
}
