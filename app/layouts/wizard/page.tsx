'use client';

import { CodeBlock, Columns, Divider, Inputs, Paper, TextInput, Typography, useKontororu, Wizard, WizardStep } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';
import { useState } from 'react';

export default function Page() {
  const Kontororu = useKontororu();
  const stepOneInputHandler = new Inputs();
  const steps: WizardStep[] = [];

  const initialFormData = Object.freeze({
    question_one: '',
    question_two: '',
  });
  type FormData = {
    question_one: string;
    question_two: string;
  }

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [triggerValidation, setTriggerValidation] = useState(false);
  const onChange = <K extends keyof FormData>(column: K, value: FormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  const stepOne = {
    title: 'Step 1 title',
    id: 'step_1',
    isValid: () => {
      const errors = stepOneInputHandler.getErrors();
      if (errors.length) {
        return false;
      }
      return true;
    },
    content: (
      <>
        <Columns>
          <TextInput
            inputHandler={stepOneInputHandler}
            placeholder='Example question 1'
            required
            value={formData.question_one}
            onChange={(val) => onChange('question_one', val as string)}
            triggerValidation={triggerValidation}
            />
          <TextInput
            inputHandler={stepOneInputHandler}
            placeholder='Example question 2'
            value={formData.question_two}
            onChange={(val) => onChange('question_two', val as string)}
            triggerValidation={triggerValidation}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                Kontororu.dispatchEvent(new CustomEvent('next'));
              }
            }}
          />

        </Columns>
      </>
    ),
  };

  const stepTwo = {
    title: 'Step 2',
    id: 'easy',
    isValid: () => {
      return true;
    },
    content: (
      <>
      <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography type='body1'>You made it to the end of the wizard!</Typography>
      </Paper>
      </>
    ),
  };

  steps.push(stepOne);
  steps.push(stepTwo);

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Wizard</Typography>
      <Typography type='body1' style={{ marginBottom: 20 }}>
        A step-by-step flow. Wizard owns the current step and the slide transition between steps, and
        refuses to advance until the current step reports itself valid.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Each step supplies its own <code>content</code>{' '}and an <code>isValid</code>{' '}callback. The
        example below wires the step validity to a form handler, so the Next button will not move on
        until the required field is filled. Pressing Enter in a field advances it too, through the
        event bus described further down.
      </Typography>

      <Wizard
        steps={steps}
        validationTrigger={setTriggerValidation}
      />

      <CodeBlock code={`
        import { useState } from 'react';
        import {
          Columns, Inputs, TextInput, Wizard, WizardStep, useKontororu,
        } from '@esmalley/react-material-ui';

        const Kontororu = useKontororu();
        const stepOneInputHandler = new Inputs();

        const [triggerValidation, setTriggerValidation] = useState(false);
        const [formData, setFormData] = useState({ question_one: '', question_two: '' });

        const steps: WizardStep[] = [
          {
            title: 'Step 1 title',
            id: 'step_1',
            isValid: () => stepOneInputHandler.getErrors().length === 0,
            content: (
              <Columns>
                <TextInput
                  inputHandler={stepOneInputHandler}
                  placeholder='Example question 1'
                  required
                  value={formData.question_one}
                  onChange={(val) => onChange('question_one', val as string)}
                  triggerValidation={triggerValidation}
                />
              </Columns>
            ),
          },
          {
            title: 'Step 2',
            id: 'easy',
            isValid: () => true,
            content: <Paper>You made it to the end of the wizard!</Paper>,
          },
        ];

        <Wizard steps={steps} validationTrigger={setTriggerValidation} />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Validation</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>isValid</code>{' '}runs on every attempt to advance. When it returns false the wizard stays
        put and calls <code>validationTrigger(true)</code>, which is how you flip{' '}
        <code>triggerValidation</code>{' '}on the step&apos;s inputs so their errors become visible. On a
        successful step it is called with <code>false</code>{' '}again.
      </Typography>
      <CodeBlock code={`
        const stepOneInputHandler = new Inputs();

        isValid: () => stepOneInputHandler.getErrors().length === 0,

        // wizard calls this with true on a failed attempt, false on a successful one
        <Wizard steps={steps} validationTrigger={setTriggerValidation} />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Saving and going back</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        On the last step the Next button becomes a save button, labelled by{' '}
        <code>saveButtonText</code>{' '}and calling <code>onSave</code>. Without an{' '}
        <code>onSave</code>{' '}the button is simply hidden on the last step. Going back calls the
        step&apos;s own <code>onBack</code>{' '}first, then the wizard-level one.
      </Typography>
      <CodeBlock code={`
        <Wizard
          steps={steps}
          validationTrigger={setTriggerValidation}
          onSave={() => submit(formData)}
          onBack={() => console.log('moved back a step')}
          saveButtonText='Submit application'
        />

        // per step, for cleanup when that particular step is left
        const step: WizardStep={
          title: 'Step 1',
          id: 'step_1',
          isValid: () => true,
          onBack: () => resetStepOne(),
          content: <StepOne />,
        };
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Progress and arrow buttons</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>showProgress</code>{' '}adds a numbered stepper above the content, ticking off completed
        steps. <code>useArrowButton</code>{' '}swaps the text buttons for compact arrow icon buttons, which
        suits a narrow container.
      </Typography>
      <CodeBlock code={`
        <Wizard steps={steps} showProgress useArrowButton />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Advancing from outside</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Wizard has no current-step prop, so it cannot be driven by state you own. The one way in is the
        shared event bus: dispatch a <code>next</code>{' '}event and the wizard advances, running the
        step&apos;s <code>isValid</code>{' '}check first exactly as the button does.
      </Typography>
      <CodeBlock code={`
        import { useKontororu } from '@esmalley/react-material-ui';

        const Kontororu = useKontororu();

        <TextInput
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              Kontororu.dispatchEvent(new CustomEvent('next'));
            }
          }}
        />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>WizardStep</Typography>
      <PropsTable
        rows={[
          { name: 'title', type: 'string', required: true, description: 'Step heading, and the label in the progress stepper.' },
          { name: 'id', type: 'string', required: true, description: 'Stable identifier for the step.' },
          { name: 'isValid', type: '() => boolean', required: true, description: 'Checked before advancing. Return false to stay on this step.' },
          { name: 'content', type: 'React.JSX.Element', required: true, description: 'What the step renders.' },
          { name: 'onBack', type: '() => void', description: 'Runs when leaving this step backwards, before the wizard-level onBack.' },
        ]}
      />

      <Typography type='h6' style={{ marginBottom: 10 }}>Wizard props</Typography>
      <PropsTable
        note='isLoading and style are accepted by the type but currently have no effect - the wizard hard-codes its own max width and centring, and does not pass isLoading through to its buttons.'
        rows={[
          { name: 'steps', type: 'WizardStep[]', required: true, description: 'The steps, in order.' },
          { name: 'validationTrigger', type: '(valid: boolean) => void', description: 'Called with true when a step fails its check and false when it passes. Wire it to the triggerValidation prop on that step inputs.' },
          { name: 'onSave', type: '() => void', description: 'Called by the last step button. Without it that button is hidden.' },
          { name: 'onBack', type: '() => void', description: 'Called after the step own onBack when moving backwards.' },
          { name: 'saveButtonText', type: 'string', default: "'Save'", description: 'Label for the final button.' },
          { name: 'showProgress', type: 'boolean', default: 'false', description: 'Show the numbered step indicator.' },
          { name: 'useArrowButton', type: 'boolean', default: 'false', description: 'Use arrow icon buttons instead of text buttons.' },
          { name: 'isLoading', type: 'boolean', description: 'Accepted but unused.' },
          { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Accepted but never applied.' },
        ]}
      />
    </div>
  );
}
