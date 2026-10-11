'use client';

import { CodeBlock, Columns, Divider, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';
import { Textor } from '@esmalley/ts-utils';


export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Typography</Typography>

      <Columns numberOfColumns={6} style={{ alignItems: 'center' }}>
        <Typography type='h1'>h1</Typography>
        <Typography type='h2'>h2</Typography>
        <Typography type='h3'>h3</Typography>
        <Typography type='h4'>h4</Typography>
        <Typography type='h5'>h5</Typography>
        <Typography type='h6'>h6</Typography>
      </Columns>

      <CodeBlock code={`
        import { Columns, Typography } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={6} style={{ alignItems: 'center' }}>
          <Typography type='h1'>h1</Typography>
          <Typography type='h2'>h2</Typography>
          <Typography type='h3'>h3</Typography>
          <Typography type='h4'>h4</Typography>
          <Typography type='h5'>h5</Typography>
          <Typography type='h6'>h6</Typography>
        </Columns>
      `} />
      <Divider />

      <Typography type='subtitle1'>subtitle1</Typography>
      <Typography type='subtitle1'>{Textor.generateLoremIpsum(1, 1)}</Typography>
      <CodeBlock code={`
        import { Typography } from '@esmalley/react-material-ui';

        <Typography type='subtitle1'>subtitle1</Typography>
      `} />
      <Divider style={{ marginBottom: 10 }} />

      <Typography type='subtitle2'>subtitle2</Typography>
      <Typography type='subtitle2'>{Textor.generateLoremIpsum(1, 1)}</Typography>
      <CodeBlock code={`
        import { Typography } from '@esmalley/react-material-ui';

        <Typography type='subtitle2'>subtitle2</Typography>
      `} />
      <Divider style={{ marginBottom: 10 }} />

      <Typography type='body1'>body1</Typography>
      <Typography type='body1'>{Textor.generateLoremIpsum(1, 1)}</Typography>
      <CodeBlock code={`
        import { Typography } from '@esmalley/react-material-ui';

        <Typography type='body1'>body1</Typography>
      `} />
      <Divider style={{ marginBottom: 10 }} />

      <Typography type='body2'>body2</Typography>
      <Typography type='body2'>{Textor.generateLoremIpsum(1, 1)}</Typography>
      <CodeBlock code={`
        import { Typography } from '@esmalley/react-material-ui';

        <Typography type='body2'>body2</Typography>
      `} />
      <Divider style={{ marginBottom: 10 }} />

      <Typography type='caption'>caption</Typography>
      <Typography type='caption'>{Textor.generateLoremIpsum(1, 1)}</Typography>
      <CodeBlock code={`
        import { Typography } from '@esmalley/react-material-ui';

        <Typography type='caption'>caption</Typography>
      `} />
      <Divider style={{ marginBottom: 10 }} />

      <Typography type='overline'>overline</Typography>
      <Typography type='overline'>{Textor.generateLoremIpsum(1, 1)}</Typography>
      <CodeBlock code={`
        import { Typography } from '@esmalley/react-material-ui';

        <Typography type='overline'>overline</Typography>
      `} />
      <Divider style={{ marginBottom: 10 }} />

      <Typography type='body1'>a</Typography>
      <Typography type='a'>{Textor.generateLoremIpsum(1, 1)}</Typography>
      <CodeBlock code={`
        import { Typography } from '@esmalley/react-material-ui';

        <Typography type='body1'>a</Typography>
      `} />
      <Divider style={{ marginBottom: 10 }} />

      <Typography type='inherit'>inherit</Typography>
      <Typography type='inherit'>{Textor.generateLoremIpsum(1, 1)}</Typography>
      <CodeBlock code={`
        import { Typography } from '@esmalley/react-material-ui';

        <Typography type='inherit'>inherit</Typography>
      `} />
      <Divider style={{ marginBottom: 10 }} />


      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='The props type is a discriminated union on type, so the native attributes you can pass follow the rendered element - href is accepted only when type is a.'
        rows={[
          { name: 'type', type: 'TypographyType', required: true, description: 'Which style and element to render. One of a, h1 to h6, subtitle1, subtitle2, body1, body2, caption, overline, inherit.' },
          { name: 'children', type: 'React.ReactNode', required: true, description: 'The content.' },
          { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Merged over the per-type base style.' },
          { name: 'ref', type: 'React.Ref', description: 'Forwarded to the rendered element. Typography is the only forwardRef component in the library.' },
        ]}
      />

      <Typography type='h6' style={{ marginBottom: 10 }}>Exported types</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Use these when you wrap <code>Typography</code>{' '}in a component of your own and need to pass its
        props straight through.
      </Typography>
      <PropsTable
        rows={[
          { name: 'TypographyType', type: "'a' | 'h1'...'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit'", description: 'The union of valid type values.' },
          { name: 'TypographyProps', type: 'discriminated union', description: 'The full props type. Because it is a union over type, a wrapper usually needs to be generic rather than destructuring it.' },
          { name: 'TypographyBaseProps<T>', type: '{ children, type, style?, ref? }', description: 'The common half, without the per-element native attributes.' },
          { name: 'TypographyElementType<T>', type: 'HTMLElement subtype', description: 'Resolves a type value to the element it renders, for typing a ref.' },
        ]}
      />
      <CodeBlock code={`
        import { Typography, TypographyProps } from '@esmalley/react-material-ui';

        const Heading = (props: TypographyProps) => <Typography {...props} />;
      `} />
    </div>
  );
}

