'use client';

import AssessmentIcon from '@esmalley/react-material-icons/Assessment';
import { CodeBlock, Columns, Divider, getToaster, IconButton, Typography } from '@esmalley/react-material-ui';

export default function Page() {
  return (
    <div style={{ padding: 20 }}>
      <Typography type='h5' style={{ marginBottom: 20 }}>IconButton</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        IconButton is a compact, icon-only button designed for quick actions. It supports different shapes (standard, circle) and badges.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Types</Typography>
      <Columns>
        <div style={{ textAlign: 'center' }}>
          <Typography type='caption'>Standard</Typography>
          <IconButton icon={<AssessmentIcon style={{ fontSize: 24 }} />} value={1} onClick={() => getToaster().add('clicked standard', 'success')} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Typography type='caption'>Circle</Typography>
          <IconButton icon={<AssessmentIcon style={{ fontSize: 20 }} />} value={1} onClick={() => getToaster().add('clicked circle', 'success')} type='circle' />
        </div>
      </Columns>
      <CodeBlock code={`
        import { IconButton, getToaster } from '@esmalley/react-material-ui';
        import AssessmentIcon from '@esmalley/react-material-icons/Assessment';

        <IconButton icon={<AssessmentIcon />} value={1} onClick={() => getToaster().add('clicked', 'success')} />
        <IconButton icon={<AssessmentIcon />} value={1} type='circle' onClick={() => getToaster().add('clicked', 'success')} />
      `} />
      <Divider style={{ margin: '10px 0px' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Badge Counter</Typography>
      <Columns>
        <div style={{ textAlign: 'center' }}>
          <Typography type='caption'>Standard</Typography>
          <IconButton icon={<AssessmentIcon style={{ fontSize: 24 }} />} value={1} onClick={() => getToaster().add('clicked standard', 'success')} badge={5} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Typography type='caption'>Circle</Typography>
          <IconButton icon={<AssessmentIcon style={{ fontSize: 20 }} />} value={1} onClick={() => getToaster().add('clicked circle', 'success')} type='circle' badge={2} />
        </div>
      </Columns>
      <CodeBlock code={`
        import { IconButton, getToaster } from '@esmalley/react-material-ui';

        <IconButton icon={<AssessmentIcon />} value={1} badge={5} onClick={() => getToaster().add('clicked', 'success')} />
        <IconButton icon={<AssessmentIcon />} value={1} type='circle' badge={2} onClick={() => getToaster().add('clicked', 'success')} />
      `} />
      <Divider style={{ margin: '10px 0px' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Disabled</Typography>
      <Columns>
        <div style={{ textAlign: 'center' }}>
          <Typography type='caption'>Standard</Typography>
          <IconButton icon={<AssessmentIcon style={{ fontSize: 24 }} />} value={1} onClick={() => getToaster().add('clicked standard', 'success')} disabled />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Typography type='caption'>Circle</Typography>
          <IconButton icon={<AssessmentIcon style={{ fontSize: 20 }} />} value={1} onClick={() => getToaster().add('clicked circle', 'success')} type='circle' disabled />
        </div>
      </Columns>
      <CodeBlock code={`
        import { IconButton } from '@esmalley/react-material-ui';

        <IconButton icon={<AssessmentIcon />} value={1} disabled />
        <IconButton icon={<AssessmentIcon />} value={1} type='circle' disabled />
      `} />
      <Divider />
    </div>
  );
}
