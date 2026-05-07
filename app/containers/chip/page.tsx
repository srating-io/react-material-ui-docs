'use client';

import { Chip, CodeBlock, Divider, Typography } from '@esmalley/react-material-ui';
import { useState } from 'react';



export default function Page() {
  const [clickableFilled, setClickableFilled] = useState(false);
  return (
    <div style={{ padding: 20 }}>
      <Typography type='h5' style={{ marginBottom: 20 }}>Chip</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        Chips are compact elements that represent an attribute, entity, or action.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
      <Chip title='Standard chip' value={1} />
      <CodeBlock code={`
        import { Chip } from '@esmalley/react-material-ui';

        <Chip title='Standard chip' value={1} />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Filled</Typography>
      <Chip title='Filled chip' value={1} filled />
      <CodeBlock code={`
        import { Chip } from '@esmalley/react-material-ui';

        <Chip title='Filled chip' value={1} filled />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Clickable</Typography>
      <Chip
        title='Clickable'
        value={1}
        filled={clickableFilled}
        onClick={() => setClickableFilled(!clickableFilled)}
      />
      <CodeBlock code={`
        import { useState } from 'react';
        import { Chip } from '@esmalley/react-material-ui';

        const [isActive, setIsActive] = useState(false);

        <Chip
          title='Clickable'
          value={1}
          filled={isActive}
          onClick={() => setIsActive(!isActive)}
        />
      `} />
      <Divider />
    </div>
  );
}
