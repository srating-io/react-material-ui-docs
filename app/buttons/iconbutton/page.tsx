'use client';

import AssessmentIcon from '@esmalley/react-material-icons/Assessment';
import { CodeBlock, Columns, Divider, getToaster, IconButton, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';

export default function Page() {
  return (
    <div>
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

        <IconButton icon={<AssessmentIcon style={{ fontSize: 24 }} />} value={1} onClick={onClick} />
        <IconButton icon={<AssessmentIcon style={{ fontSize: 20 }} />} value={1} type='circle' onClick={onClick} />
      `} />
      <Divider style={{ margin: '10px 0px' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Badge Counter</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>A badge of 0 is hidden, and anything over 99 renders as <code>99+</code>.</Typography>
      <Columns>
        <div style={{ textAlign: 'center' }}>
          <Typography type='caption'>Standard</Typography>
          <IconButton icon={<AssessmentIcon style={{ fontSize: 24 }} />} value={1} onClick={() => getToaster().add('clicked standard', 'success')} badge={5} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Typography type='caption'>Circle</Typography>
          <IconButton icon={<AssessmentIcon style={{ fontSize: 20 }} />} value={1} onClick={() => getToaster().add('clicked circle', 'success')} type='circle' badge={2} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Typography type='caption'>Overflow</Typography>
          <IconButton icon={<AssessmentIcon style={{ fontSize: 24 }} />} value={1} onClick={() => getToaster().add('clicked overflow', 'success')} badge={1200} />
        </div>
      </Columns>
      <CodeBlock code={`
        import { IconButton, getToaster } from '@esmalley/react-material-ui';
        import AssessmentIcon from '@esmalley/react-material-icons/Assessment';

        <IconButton icon={<AssessmentIcon style={{ fontSize: 24 }} />} value={1} badge={5} onClick={onClick} />
        <IconButton icon={<AssessmentIcon style={{ fontSize: 20 }} />} value={1} type='circle' badge={2} onClick={onClick} />
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
        import AssessmentIcon from '@esmalley/react-material-icons/Assessment';

        <IconButton icon={<AssessmentIcon style={{ fontSize: 24 }} />} value={1} onClick={onClick} disabled />
        <IconButton icon={<AssessmentIcon style={{ fontSize: 20 }} />} value={1} type='circle' onClick={onClick} disabled />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='IconButtonProps extends the div attributes, so anything else you pass lands on the wrapper. className and onClick are the two it will not let you override.'
        rows={[
          { name: 'icon', type: 'React.JSX.Element', required: true, description: 'The icon to render. Size it with the icon style prop.' },
          { name: 'value', type: 'string | number', required: true, description: 'Passed back as the second argument to onClick.' },
          { name: 'onClick', type: '(e: React.SyntheticEvent, value) => void', required: true, description: 'Click handler.' },
          { name: 'type', type: '\'standard\' | \'circle\'', default: '\'standard\'', description: '\'circle\' gives a 40px filled round button.' },
          { name: 'htmlType', type: '\'button\' | \'submit\' | \'reset\'', default: '\'button\'', description: 'The native type attribute.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Blocks pointer events and removes the hover treatment.' },
          { name: 'autoFocus', type: 'boolean', default: 'false', description: 'Focuses the button on mount.' },
          { name: 'badge', type: 'number', default: '0', description: 'Count bubble on the bottom right. 0 hides it, anything over 99 shows 99+.' },
          { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Applied to the inner button.' },
          { name: 'containerStyle', type: 'React.CSSProperties', default: '{}', description: 'Applied to the wrapper. Accepts a nested hover block.' },
          { name: 'ref', type: 'RefObject<HTMLDivElement> | null', default: 'null', description: 'Attaches to the wrapper.' },
        ]}
      />
    </div>
  );
}
