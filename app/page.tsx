'use client';

import TextFieldsIcon from '@esmalley/react-material-icons/TextFields';
import DownloadingIcon from '@esmalley/react-material-icons/Downloading';
import PhotoIcon from '@esmalley/react-material-icons/Photo';
import FormatPaintIcon from '@esmalley/react-material-icons/FormatPaint';
import { CodeBlock, Columns, Divider, Tile, Typography, useTheme } from '@esmalley/react-material-ui';
import { useRouter } from 'next/navigation';


export default function Page() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <div>
      <Typography type="h3" style={{ fontWeight: 'bold', marginBottom: 10 }}>
        Material UI components for react.
      </Typography>
      <Typography type="h6" style={{ color: theme.text?.secondary, marginBottom: 30, fontWeight: 'normal' }}>
        A high-performance, theme-driven React component library designed for developers who value speed and material design.
      </Typography>

      <Divider />

      <section style={{ marginTop: 40 }}>
        <Typography type="h5">Why choose this library?</Typography>
        <div style={{ marginTop: 20 }}>
          <Columns numberOfColumns={3}>
            <div style={{ padding: '0 10px' }}>
              <Typography type="subtitle1" style={{ fontWeight: 'bold' }}>🚀 Speed</Typography>
              <Typography type="body2">Pre-built, highly optimized components to get your project running in minutes.</Typography>
            </div>
            <div style={{ padding: '0 10px' }}>
              <Typography type="subtitle1" style={{ fontWeight: 'bold' }}>🎨 Themeable</Typography>
              <Typography type="body2">Powerful Theme Context for effortless light/dark mode and custom branding.</Typography>
            </div>
            <div style={{ padding: '0 10px' }}>
              <Typography type="subtitle1" style={{ fontWeight: 'bold' }}>🛠️ Robust</Typography>
              <Typography type="body2">Type-safe, accessible, and easy to extend with our advanced input handlers.</Typography>
            </div>
          </Columns>
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <Typography type="h5">Quick Start</Typography>
        <Typography type="body2" style={{ marginTop: 10 }}>
          Bring powerful components to your React application with one command:
        </Typography>
        <CodeBlock code={`
          npm install @esmalley/react-material-ui @esmally/react-material-icons @esmalley/ts-utils
        `} />
      </section>

      <section style={{ marginTop: 40 }}>
        <Typography type="h5">Explore Components</Typography>
        <Typography type="body2" style={{ marginBottom: 20 }}>
          Browse through our comprehensive collection of ready-to-use UI components.
        </Typography>
        <Columns numberOfColumns={3}>
          <Tile
            primary="Inputs"
            secondary="Text, Select, Pickers"
            icon={<TextFieldsIcon style={{ color: theme.info.main, fontSize: 24 }} />}
            onClick={() => router.push('/inputs/text') }
          />
          <Tile
            primary="Icons"
            secondary="Material design icons"
            icon={<FormatPaintIcon style={{ color: theme.info.main, fontSize: 24 }} />}
            onClick={() => router.push('/icons') }
          />
          <Tile
            primary="Buttons"
            secondary="Standard, Icon, Tabs"
            icon={<PhotoIcon style={{ color: theme.info.main, fontSize: 24 }} />}
            onClick={() => router.push('/buttons/button') }
          />
          <Tile
            primary="Overlays"
            secondary="Toast, Tooltip, Drawer"
            icon={<DownloadingIcon style={{ color: theme.info.main, fontSize: 24 }} />}
            onClick={() => router.push('/overlay/toast') }
          />
          <Tile
            primary="Containers"
            secondary="Tile, Paper, Chip"
            icon={<PhotoIcon style={{ color: theme.info.main, fontSize: 24 }} />}
            onClick={() => router.push('/containers/tile') }
          />
          <Tile
            primary="Tables"
            secondary="Standard, Virtual"
            icon={<TextFieldsIcon style={{ color: theme.info.main, fontSize: 24 }} />}
            onClick={() => router.push('/tables/table') }
          />
           <Tile
            primary="Text"
            secondary="Typography, Code"
            icon={<PhotoIcon style={{ color: theme.info.main, fontSize: 24 }} />}
            onClick={() => router.push('/text/typography') }
          />
        </Columns>
      </section>

      <section style={{ marginTop: 40 }}>
        <Typography type="h6">Set Up Example</Typography>
        <Typography type = 'caption'>Your app must be wrapped in a ThemeProvider.</Typography>
        <CodeBlock code={`
          import { ThemeProvider, UXBaseline, Button, Typography, Toast, getToaster } from '@esmalley/react-material-ui';

          const App = () => (
            <ThemeProvider theme={'dark'}>
              {/* The UXBaseline is optional, it provides you some basic css styling*/}
              <UXBaseline />
              <div style={{ padding: '20px' }}>
                <Typography type="h4">Hello World</Typography>
                <Button title="Action" onClick={() => getToaster().add('Success!', 'success')} />
                <Toast />
              </div>
            </ThemeProvider>
          );
        `} />
      </section>
    </div>
  );
}
