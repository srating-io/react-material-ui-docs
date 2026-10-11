'use client';

import { CodeBlock, Divider, Paper, Typography, useTheme } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';

export default function Page() {
  const theme = useTheme();

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Divider</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        A themed horizontal rule. It renders an <code>&lt;hr&gt;</code>{' '}with the browser default borders
        stripped and a single hairline in <code>theme.grey[600]</code>, so it sits correctly in both light
        and dark mode. Every section break on this documentation site is one.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>Content above.</Typography>
      <Divider />
      <Typography type='body2' style={{ marginTop: 10, marginBottom: 10 }}>Content below.</Typography>
      <CodeBlock code={`
        import { Divider } from '@esmalley/react-material-ui';

        <Divider />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Spacing</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The divider has no margin of its own. Give it one through <code>style</code>{' '}rather than wrapping it
        in a spacer element.
      </Typography>
      <div style={{ border: `1px dashed ${theme.grey[600]}`, padding: 8 }}>
        <Typography type='caption'>no margin</Typography>
        <Divider />
        <Typography type='caption'>20px above and below</Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Typography type='caption'>40px above and below</Typography>
        <Divider style={{ margin: '40px 0' }} />
        <Typography type='caption'>end</Typography>
      </div>
      <CodeBlock code={`
        <Divider />
        <Divider style={{ margin: '20px 0' }} />
        <Divider style={{ margin: '40px 0' }} />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Restyling</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>style</code>{' '}is merged last, so any border property can be replaced &mdash; colour, thickness
        or dash pattern. Pull the colour from the theme rather than hardcoding one.
      </Typography>
      <Paper style={{ padding: 16 }}>
        <Divider style={{ margin: '12px 0', borderBottomWidth: 2, borderColor: theme.info.main }} />
        <Divider style={{ margin: '12px 0', borderBottomStyle: 'dashed', borderColor: theme.success.main }} />
        <Divider style={{ margin: '12px 0', borderBottomWidth: 4, borderColor: theme.error.main }} />
      </Paper>
      <CodeBlock code={`
        const theme = useTheme();

        <Divider style={{ borderBottomWidth: 2, borderColor: theme.info.main }} />
        <Divider style={{ borderBottomStyle: 'dashed', borderColor: theme.success.main }} />
        <Divider style={{ borderBottomWidth: 4, borderColor: theme.error.main }} />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Inside a menu</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        For separating groups of menu items, use <code>MenuDivider</code>{' '}instead. It produces the same
        hairline but is sized for a menu list. See the Menu page.
      </Typography>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='Divider renders an hr, so it is always full width and horizontal. There is no vertical orientation.'
        rows={[
          { name: 'style', type: 'Record<string, unknown>', default: '{}', description: 'Merged last. Use it for margins and for overriding the border colour, width or style.' },
        ]}
      />
    </div>
  );
}
