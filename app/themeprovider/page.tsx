'use client';

import { CodeBlock, Typography } from '@esmalley/react-material-ui';


export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>ThemeProvider</Typography>

      <Typography type='body1' style={{ marginBottom: 10 }}>The entire app must be wrapped in a theme provider for the UI elements to be drawn correctly.</Typography>
      <CodeBlock code={`
        import { ThemeProvider, UXBaseline, Themes } from '@esmalley/react-material-ui';

        const App = () => {

          const theme = useState<Themes>('dark');

          return (
            <ThemeProvider theme={theme}>
              <UXBaseline />
              {children}
            </ThemeProvider>
          );
        };
      `} />
    </div>
  );
}



