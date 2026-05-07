'use client';

import SendIcon from '@esmalley/react-material-icons/Send';
import { Button, CodeBlock, Columns, Divider, Typography } from '@esmalley/react-material-ui';
import { toaster } from '@esmalley/ts-utils';


export default function Page() {
  return (
    <div style={{ padding: 20 }}>
      <Typography type='h5' style={{ marginBottom: 20 }}>Button</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        The Button component is a fundamental interactive element. It supports various types, styles (ink), and states (disabled).
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Types</Typography>
      <Columns>
        <Button title='Standard' value={1} onClick={() => toaster.add('clicked standard', 'success')} />
        <Button title='Select' value={1} type='select' onClick={() => toaster.add('clicked select', 'success')} />
      </Columns>
      <CodeBlock code={`
        import { toaster } from '@esmalley/ts-utils';
        import { Button } from '@esmalley/react-material-ui';

        <Button title='Standard' value={1} onClick={() => toaster.add('clicked standard', 'success')} />
        <Button title='Select' value={1} type='select' onClick={() => toaster.add('clicked select', 'success')} />
      `} />
      <Divider style={{ margin: '10px 0px' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Ink</Typography>
      <Columns>
        <Button title='Standard ink' value={1} onClick={() => toaster.add('clicked standard ink', 'success')} ink />
        <Button title='Select ink' value={1} type='select' onClick={() => toaster.add('clicked select ink', 'success')} ink />
      </Columns>
      <CodeBlock code={`
        import { toaster } from '@esmalley/ts-utils';
        import { Button } from '@esmalley/react-material-ui';

        <Button title='Standard ink' value={1} onClick={() => toaster.add('clicked standard ink', 'success')} ink />
        <Button title='Select ink' value={1} type='select' onClick={() => toaster.add('clicked select ink', 'success')} ink />
      `} />
      <Divider style={{ margin: '10px 0px' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Disabled</Typography>
      <Columns numberOfColumns={4}>
        <Button title='Standard' value={1} onClick={() => toaster.add('clicked standard', 'success')} disabled />
        <Button title='Select' value={1} type='select' onClick={() => toaster.add('clicked select', 'success')} disabled />
        <Button title='Standard ink' value={1} onClick={() => toaster.add('clicked standard ink', 'success')} ink disabled />
        <Button title='Select ink' value={1} type='select' onClick={() => toaster.add('clicked select ink', 'success')} ink disabled />
      </Columns>
      <CodeBlock code={`
        import { toaster } from '@esmalley/ts-utils';
        import { Button } from '@esmalley/react-material-ui';

        <Button
          title='Standard'
          value={1}
          onClick={() => toaster.add('clicked standard', 'success')}
          disabled
        />`
      } />
      <Divider style={{ margin: '10px 0px' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>End icon</Typography>
      <Columns numberOfColumns={4}>
        <Button title='Standard' value={1} onClick={() => toaster.add('clicked standard', 'success')} endIcon={<SendIcon style={{ fontSize: 20, marginLeft: 5 }} />} />
        <Button title='Select' value={1} type='select' onClick={() => toaster.add('clicked select', 'success')} endIcon={<SendIcon style={{ fontSize: 20, marginLeft: 5 }} />} />
        <Button title='Standard ink' value={1} onClick={() => toaster.add('clicked standard ink', 'success')} ink endIcon={<SendIcon style={{ fontSize: 20, marginLeft: 5 }} />} />
        <Button title='Select ink' value={1} type='select' onClick={() => toaster.add('clicked select ink', 'success')} ink endIcon={<SendIcon style={{ fontSize: 20, marginLeft: 5 }} />} />
      </Columns>
      <CodeBlock code={`
        import { toaster } from '@esmalley/ts-utils';
        import { Button } from '@esmalley/react-material-ui';
        import SendIcon from '@esmalley/react-material-icons/Send';

        <Button
          title='Standard'
          endIcon={<SendIcon style={{ fontSize: 20 }} />}
          value={1}
          onClick={() => toaster.add('clicked', 'success')}
        />
      `} />
      <Divider style={{ margin: '10px 0px' }} />
    </div>
  );
}
