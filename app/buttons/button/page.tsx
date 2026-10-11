'use client';

import SearchIcon from '@esmalley/react-material-icons/Search';
import SendIcon from '@esmalley/react-material-icons/Send';
import { Button, CodeBlock, Columns, Divider, getToaster, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';


export default function Page() {
  return (
    <div style={{ padding: 20 }}>
      <Typography type='h5' style={{ marginBottom: 20 }}>Button</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        The Button component is a fundamental interactive element. It supports various types, styles (ink), and states (disabled).
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Types</Typography>
      <Columns>
        <Button title='Standard' value={1} onClick={() => getToaster().add('clicked standard', 'success')} />
        <Button title='Select' value={1} type='select' onClick={() => getToaster().add('clicked select', 'success')} />
      </Columns>
      <CodeBlock code={`
        import { Button, getToaster } from '@esmalley/react-material-ui';

        <Button title='Standard' value={1} onClick={() => getToaster().add('clicked standard', 'success')} />
        <Button title='Select' value={1} type='select' onClick={() => getToaster().add('clicked select', 'success')} />
      `} />
      <Divider style={{ margin: '10px 0px' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Ink</Typography>
      <Columns>
        <Button title='Standard ink' value={1} onClick={() => getToaster().add('clicked standard ink', 'success')} ink />
        <Button title='Select ink' value={1} type='select' onClick={() => getToaster().add('clicked select ink', 'success')} ink />
      </Columns>
      <CodeBlock code={`
        import { Button, getToaster } from '@esmalley/react-material-ui';

        <Button title='Standard ink' value={1} onClick={() => getToaster().add('clicked standard ink', 'success')} ink />
        <Button title='Select ink' value={1} type='select' onClick={() => getToaster().add('clicked select ink', 'success')} ink />
      `} />
      <Divider style={{ margin: '10px 0px' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Disabled</Typography>
      <Columns numberOfColumns={4}>
        <Button title='Standard' value={1} onClick={() => getToaster().add('clicked standard', 'success')} disabled />
        <Button title='Select' value={1} type='select' onClick={() => getToaster().add('clicked select', 'success')} disabled />
        <Button title='Standard ink' value={1} onClick={() => getToaster().add('clicked standard ink', 'success')} ink disabled />
        <Button title='Select ink' value={1} type='select' onClick={() => getToaster().add('clicked select ink', 'success')} ink disabled />
      </Columns>
      <CodeBlock code={`
        import { Button, getToaster } from '@esmalley/react-material-ui';

        <Button title='Standard' value={1} onClick={onClick} disabled />
        <Button title='Select' value={1} type='select' onClick={onClick} disabled />
        <Button title='Standard ink' value={1} onClick={onClick} ink disabled />
        <Button title='Select ink' value={1} type='select' onClick={onClick} ink disabled />
      `} />
      <Divider style={{ margin: '10px 0px' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>End icon</Typography>
      <Columns numberOfColumns={4}>
        <Button title='Standard' value={1} onClick={() => getToaster().add('clicked standard', 'success')} endIcon={<SendIcon style={{ fontSize: 20, marginLeft: 5 }} />} />
        <Button title='Select' value={1} type='select' onClick={() => getToaster().add('clicked select', 'success')} endIcon={<SendIcon style={{ fontSize: 20, marginLeft: 5 }} />} />
        <Button title='Standard ink' value={1} onClick={() => getToaster().add('clicked standard ink', 'success')} ink endIcon={<SendIcon style={{ fontSize: 20, marginLeft: 5 }} />} />
        <Button title='Select ink' value={1} type='select' onClick={() => getToaster().add('clicked select ink', 'success')} ink endIcon={<SendIcon style={{ fontSize: 20, marginLeft: 5 }} />} />
      </Columns>
      <CodeBlock code={`
        import { Button, getToaster } from '@esmalley/react-material-ui';
        import SendIcon from '@esmalley/react-material-icons/Send';

        <Button
          title='Standard'
          endIcon={<SendIcon style={{ fontSize: 20 }} />}
          value={1}
          onClick={() => getToaster().add('clicked', 'success')}
        />
      `} />
      <Divider style={{ margin: '10px 0px' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Start icon</Typography>
      <Columns numberOfColumns={2}>
        <Button title='Search' value={1} onClick={() => getToaster().add('clicked search', 'success')} startIcon={<SearchIcon style={{ fontSize: 20, marginRight: 5 }} />} />
        <Button title='Search ink' value={1} onClick={() => getToaster().add('clicked search ink', 'success')} ink startIcon={<SearchIcon style={{ fontSize: 20, marginRight: 5 }} />} />
      </Columns>
      <CodeBlock code={`
        import SearchIcon from '@esmalley/react-material-icons/Search';
        import { Button } from '@esmalley/react-material-ui';

        <Button
          title='Search'
          value={1}
          onClick={onClick}
          startIcon={<SearchIcon style={{ fontSize: 20, marginRight: 5 }} />}
        />
      `} />
      <Divider style={{ margin: '10px 0px' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Inside a form</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The rendered button is <code>type=&apos;button&apos;</code>{' '}by default, so dropping one into a form will
        not submit it by accident. Pass <code>htmlType</code>{' '}when you do want submit or reset behaviour.
      </Typography>
      <CodeBlock code={`
        <form onSubmit={handleSubmit}>
          <Button title='Save' value='save' htmlType='submit' onClick={() => {}} />
          <Button title='Reset' value='reset' htmlType='reset' onClick={() => {}} />
        </form>
      `} />
      <Divider style={{ margin: '10px 0px' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note={"onClick is bound to the wrapping element rather than the button itself. A disabled button swallows its own clicks, but if containerStyle gives the wrapper area beyond the button, a click there still fires onClick."}
        rows={[
          { name: 'title', type: 'string', required: true, description: 'Button label.' },
          { name: 'value', type: 'string | number | null | undefined', required: true, description: 'Passed back as the second argument to onClick, so one handler can serve several buttons.' },
          { name: 'onClick', type: '(e: React.SyntheticEvent, value) => void', required: true, description: 'Click handler. Receives the event and the button value.' },
          { name: 'type', type: "'standard' | 'select'", default: "'standard'", description: "Visual role. 'select' is narrower and auto-appends a dropdown arrow when no endIcon is given." },
          { name: 'htmlType', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'The native type attribute. Defaults to button so the component never submits a form unintentionally.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Greys the button out and removes the hover treatment.' },
          { name: 'ink', type: 'boolean', default: 'false', description: 'Renders a transparent, text-only button instead of a filled one.' },
          { name: 'autoFocus', type: 'boolean', default: 'false', description: 'Focuses the button on mount.' },
          { name: 'startIcon', type: 'React.JSX.Element | null', default: 'null', description: 'Rendered before the title.' },
          { name: 'endIcon', type: 'React.JSX.Element | null', default: 'null', description: "Rendered after the title. Replaces the arrow that type='select' would add." },
          { name: 'containerStyle', type: 'React.CSSProperties', default: '{}', description: 'Applied to the wrapping element. Spread last, so it wins.' },
          { name: 'buttonStyle', type: 'React.CSSProperties', default: '{}', description: 'Applied to the button element. Spread last, so it wins.' },
          { name: 'ref', type: 'RefObject<HTMLDivElement> | null', default: 'null', description: 'Attaches to the wrapping element, not the button.' },
        ]}
      />
    </div>
  );
}
