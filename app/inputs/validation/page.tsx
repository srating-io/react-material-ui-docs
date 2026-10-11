'use client';

import { useState } from 'react';
import { Button, CodeBlock, Columns, Divider, getToaster, Inputs, Select, TextInput, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';

const ROLES = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

/** One handler per form. Every input in the form registers itself with it. */
const DemoForm = () => {
  const [inputHandler] = useState(() => new Inputs());

  const [name, setName] = useState('');
  const [role, setRole] = useState<string | number | null>(null);
  const [triggerValidation, setTriggerValidation] = useState(false);

  const handleSave = () => {
    const errors = inputHandler.getErrors();

    // Flip triggerValidation so untouched inputs reveal their errors too.
    setTriggerValidation(true);

    if (errors.length) {
      getToaster().add(`${errors.length} field(s) need attention`, 'error');
      return;
    }

    getToaster().add('Saved', 'success');
  };

  return (
    <>
      <Columns numberOfColumns={2}>
        <TextInput
          inputHandler={inputHandler}
          label='Name'
          placeholder='Required'
          required
          value={name}
          onChange={(val) => setName(val as string)}
          triggerValidation={triggerValidation}
        />
        <Select
          inputHandler={inputHandler}
          label='Role'
          placeholder='Required'
          required
          options={ROLES}
          value={role}
          onChange={(val) => setRole(val as string | number | null)}
          triggerValidation={triggerValidation}
        />
      </Columns>
      <Button title='Save' value='save' onClick={handleSave} />
    </>
  );
};

export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Forms and validation</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        Each input owns its own validation state. <code>Inputs</code>{' '}is the small registry that lets a save
        button on the other side of the form read every input&apos;s errors without lifting that state up by
        hand.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>How it fits together</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Create one <code>Inputs</code>{' '}instance per form and pass it to every input as{' '}
        <code>inputHandler</code>. Each input registers a callback on mount and removes it on unmount, so{' '}
        <code>getErrors()</code>{' '}always reflects what is currently on screen.
      </Typography>
      <CodeBlock code={`
        import { useState } from 'react';
        import { Button, Inputs, TextInput, getToaster } from '@esmalley/react-material-ui';

        const Form = () => {
          // useState with an initializer so the instance survives re-renders
          const [inputHandler] = useState(() => new Inputs());

          const [name, setName] = useState('');
          const [triggerValidation, setTriggerValidation] = useState(false);

          const handleSave = () => {
            const errors = inputHandler.getErrors();
            setTriggerValidation(true);

            if (errors.length) {
              getToaster().add(errors[0].validationErrorMessage ?? 'Invalid', 'error');
              return;
            }

            save({ name });
          };

          return (
            <>
              <TextInput
                inputHandler={inputHandler}
                label='Name'
                required
                value={name}
                onChange={(val) => setName(val as string)}
                triggerValidation={triggerValidation}
              />
              <Button title='Save' value='save' onClick={handleSave} />
            </>
          );
        };
      `} />
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Creating the instance with <code>new Inputs()</code>{' '}directly in the component body also works, but
        it builds a fresh registry on every render. The <code>useState</code>{' '}initializer above keeps one.
      </Typography>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Live example</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Both fields are required. Press Save without filling them to see the form-level check fire.
      </Typography>
      <DemoForm />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Why triggerValidation exists</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        An input only shows a required error once it has been touched, so a field the user never visited
        looks clean even though it is invalid. <code>getErrors()</code>{' '}still counts it &mdash; the error is
        real, it is just not displayed. Setting <code>triggerValidation</code>{' '}forces every input to
        validate as if touched, which is what makes the failures visible on submit.
      </Typography>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Controlled and uncontrolled</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Pass <code>value</code>{' '}and the input is controlled. Omit it and pass <code>defaultValue</code>{' '}
        instead and the input keeps its own state. The internal state is seeded once, so switching an input
        from uncontrolled to controlled mid-life will not pick up the new value.
      </Typography>
      <CodeBlock code={`
        // controlled - you own the value
        <TextInput value={name} onChange={(val) => setName(val as string)} />

        // uncontrolled - the input owns it, read it back through inputHandler on submit
        <TextInput defaultValue='Jane' />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Built-in validation messages</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The shared input hooks produce these without any extra configuration. They surface in the error slot
        under the field and in <code>getErrors()</code>.
      </Typography>
      <PropsTable
        note='An externally supplied errorMessage always wins over an internal one.'
        rows={[
          { name: 'This field is required', type: 'required', description: 'The field is required, empty and has been touched.' },
          { name: 'Can only enter numbers', type: "formatter='number' | 'money'", description: 'The value contains characters the formatter strips.' },
          { name: 'Must be >= {min}', type: 'min', description: 'Numeric value below the min.' },
          { name: 'Must be <= {max}', type: 'max', description: 'Numeric value above the max.' },
          { name: 'Max {n} chars. Used: {len}', type: 'maxLength', description: 'Value longer than maxLength. Note maxLength is validated rather than enforced on the DOM node, so the user can type past it and see the error.' },
          { name: 'Please select an option', type: 'required (Select)', description: 'A required Select that is still empty and has been touched.' },
          { name: 'Invalid option selected', type: 'Select', description: 'The current value is not present in options.' },
        ]}
      />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Custom rules</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>validator</code>{' '}replaces the built-in check for that input. It receives the value and whether
        the field has been touched, and returns a <code>ValidationResult</code>.{' '}
        <code>transformOnBlur</code>{' '}reshapes the value when focus leaves.
      </Typography>
      <CodeBlock code={`
        import { ValidationResult } from '@esmalley/react-material-ui';

        <TextInput
          inputHandler={inputHandler}
          label='Email'
          value={email}
          onChange={(val) => setEmail(val as string)}
          validator={(val, isTouched): ValidationResult => {
            if (!isTouched) return { isValid: true };
            if (!String(val).includes('@')) {
              return { isValid: false, errorMessage: 'Enter a valid email' };
            }
            return { isValid: true };
          }}
          transformOnBlur={(val) => String(val).trim().toLowerCase()}
        />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Inputs API</Typography>
      <PropsTable
        note='Inputs takes no constructor arguments. Registration is handled by the inputs themselves - you normally only call getErrors().'
        rows={[
          { name: 'register(id, callback)', type: '(id: string, callback: () => ErrorHandler) => void', description: 'Called by an input on mount. The id is the input generated key.' },
          { name: 'unregister(id)', type: '(id: string) => void', description: 'Called on unmount, so a removed field stops blocking submit.' },
          { name: 'getErrors()', type: '() => ErrorHandler[]', description: 'Invokes every registered callback and returns only the entries that are currently invalid. An empty array means the form is clean.' },
        ]}
      />
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>ErrorHandler</code>{' '}is{' '}
        <code>{'{ validationError: boolean; validationErrorMessage: string | undefined }'}</code>.
      </Typography>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Shared input props</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Every input in the library builds on the same base, so these behave identically on{' '}
        <code>TextInput</code>, <code>Textarea</code>, <code>Select</code>{' '}and <code>DateInput</code>.
      </Typography>
      <PropsTable
        note='MultiPicker and Switch are the exceptions - MultiPicker requires inputHandler, and Switch has no validation integration at all.'
        rows={[
          { name: 'inputHandler', type: 'Inputs', description: 'The form registry this input reports to.' },
          { name: 'variant', type: "'standard' | 'outlined' | 'filled'", default: "'outlined'", description: 'Visual treatment of the field.' },
          { name: 'label', type: 'string', description: 'Caption rendered above the field.' },
          { name: 'placeholder', type: 'string', description: 'Floats up as a small label once the field is focused or filled.' },
          { name: 'transformPlaceholder', type: 'boolean', default: 'true', description: 'Set false to hide the placeholder entirely instead of floating it.' },
          { name: 'value', type: 'V', description: 'Makes the input controlled.' },
          { name: 'defaultValue', type: 'V', description: 'Seeds an uncontrolled input. Read once.' },
          { name: 'onChange', type: '(value: V) => void', description: 'Receives the value, not an event.' },
          { name: 'required', type: 'boolean', default: 'false', description: 'Adds the required check.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Greys the field out and blocks interaction.' },
          { name: 'error', type: 'boolean', default: 'false', description: 'Force the error state from outside, for a server-side failure.' },
          { name: 'errorMessage', type: 'string', description: 'External message. Takes precedence over the internal one.' },
          { name: 'showError', type: 'boolean', default: 'true', description: 'Set false to keep the error styling but hide the message. The 20px slot is reserved either way so the layout does not jump.' },
          { name: 'triggerValidation', type: 'boolean', default: 'false', description: 'Force validation as if the field had been touched.' },
          { name: 'validator', type: '(val, isTouched) => ValidationResult', description: 'Replaces the built-in validation for this input.' },
          { name: 'transformOnBlur', type: '(val: V) => V', description: 'Reshapes the value when focus leaves.' },
          { name: 'clear', type: 'boolean', default: 'false', description: 'Shows a clear button once there is a value.' },
          { name: 'icon', type: 'React.JSX.Element', description: 'Leading icon inside the field.' },
          { name: 'onFocus / onBlur / onClick', type: '(e) => void', description: 'Run in addition to the internal handlers.' },
        ]}
      />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Exported types</Typography>
      <PropsTable
        rows={[
          { name: 'BaseInputProps<V, T>', type: 'interface', description: 'The shared prop surface above. Extend it when building an input of your own.' },
          { name: 'TextInputProps', type: 'BaseInputProps & native input attributes', description: 'TextInput props.' },
          { name: 'TextareaProps', type: 'BaseInputProps & native textarea attributes', description: 'Textarea props.' },
          { name: 'SelectInputProps', type: 'BaseInputProps & { options }', description: 'Select props. Does not extend native attributes, so id and name are not typed on it.' },
          { name: 'DateInputProps', type: 'BaseInputProps & { minDate?, maxDate?, enableTime? }', description: 'DateInput props.' },
          { name: 'InputVariant', type: "'standard' | 'outlined' | 'filled'", description: 'The variant union.' },
          { name: 'InputFormatter', type: "'text' | 'number' | 'money'", description: 'The formatter union.' },
          { name: 'SelectOption', type: '{ label: string; value: string | number }', description: 'One Select option.' },
          { name: 'ValidationResult', type: '{ isValid: boolean; errorMessage?: string }', description: 'What a validator returns.' },
          { name: 'ErrorHandler', type: '{ validationError: boolean; validationErrorMessage?: string }', description: 'What getErrors() returns, and what a registered callback must produce.' },
        ]}
      />
    </div>
  );
}
