'use client';

import { CodeBlock, Divider, Typography } from '@esmalley/react-material-ui';


export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>CodeBlock</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        Displays a block of code with lightweight syntax highlighting and a copy button. Indentation is
        stripped automatically, so a template literal can stay indented with the surrounding JSX.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard</Typography>
      <CodeBlock code={`
        <div>hello world</div>
      `} />
      <CodeBlock code={`
        import { CodeBlock } from '@esmalley/react-material-ui';

        <CodeBlock code={\`
          <div>hello world</div>
        \`} />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Languages</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        <code>lang</code>{' '}accepts <code>ts</code>, <code>js</code>, <code>py</code>{' '}and <code>sh</code>, and
        defaults to <code>ts</code>. Highlighting is deliberately simple &mdash; keywords, strings and
        comments only. There is no separate <code>ts</code>{' '}pattern set, so <code>ts</code>{' '}is highlighted
        with the JavaScript keywords.
      </Typography>
      <CodeBlock lang='js' code={`
        const sum = (a, b) => a + b;

        // strings and comments are highlighted in every language
        console.log(\`total: \${sum(2, 3)}\`);
      `} />
      <CodeBlock lang='py' code={`
        import time
        start_time = time.time()

        stuff={}

        for s in stuff:
          print(s)

        print(f"Time taken stats: {time.time() - start_time} seconds")
      `} />
      <CodeBlock lang='sh' code={`
        # install the library and its peers
        npm install @esmalley/react-material-ui @esmalley/ts-utils
      `} />
      <CodeBlock code={`
        import { CodeBlock } from '@esmalley/react-material-ui';

        <CodeBlock lang='py' code={\`
          print('hello')
        \`} />
      `} />
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Copying</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        The copy button writes to the clipboard, swaps to a green check for two seconds, and raises a toast.
        That toast only appears if a <code>&lt;Toast /&gt;</code>{' '}is mounted somewhere in the app.
      </Typography>
      <Divider />

      <Typography type='h6' style={{ marginBottom: 10 }}>Browser support</Typography>
      <Typography type='body1' style={{ marginBottom: 10 }}>
        Highlighting uses the CSS Custom Highlight API rather than wrapping tokens in elements, which keeps
        the markup a single text node. In a browser without it the code still renders, just unhighlighted.
      </Typography>
      <Divider />
    </div>
  );
}
