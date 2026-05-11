'use client';

import TextFieldsIcon from '@esmalley/react-material-icons/TextFields';
import DownloadingIcon from '@esmalley/react-material-icons/Downloading';
import PhotoIcon from '@esmalley/react-material-icons/Photo';
import { CodeBlock, Columns, Divider, Tile, Typography, useTheme } from '@esmalley/react-material-ui';

export default function Page() {
  const theme = useTheme();

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
            onClick={() => { window.location.href = '/inputs/text'; }}
          />
          <Tile
            primary="Buttons"
            secondary="Standard, Icon, Tabs"
            icon={<PhotoIcon style={{ color: theme.info.main, fontSize: 24 }} />}
            onClick={() => { window.location.href = '/buttons/button'; }}
          />
          <Tile
            primary="Overlays"
            secondary="Toast, Tooltip, Drawer"
            icon={<DownloadingIcon style={{ color: theme.info.main, fontSize: 24 }} />}
            onClick={() => { window.location.href = '/overlay/toast'; }}
          />
          <Tile
            primary="Containers"
            secondary="Tile, Paper, Chip"
            icon={<PhotoIcon style={{ color: theme.info.main, fontSize: 24 }} />}
            onClick={() => { window.location.href = '/containers/tile'; }}
          />
          <Tile
            primary="Tables"
            secondary="Standard, Virtual"
            icon={<TextFieldsIcon style={{ color: theme.info.main, fontSize: 24 }} />}
            onClick={() => { window.location.href = '/tables/table'; }}
          />
           <Tile
            primary="Text"
            secondary="Typography, Code"
            icon={<PhotoIcon style={{ color: theme.info.main, fontSize: 24 }} />}
            onClick={() => { window.location.href = '/text/typography'; }}
          />
        </Columns>
      </section>

      <section style={{ marginTop: 40 }}>
        <Typography type="h6">Implementation Example</Typography>
        <CodeBlock code={`
          import { Button, Typography, Toast, getToaster } from '@esmalley/react-material-ui';

          const MyComponent = () => (
            <div style={{ padding: '20px' }}>
              <Typography type="h4">Hello World</Typography>
              <Button title="Action" onClick={() => getToaster().add('Success!', 'success')} />
              <Toast />
            </div>
          );
        `} />
      </section>
    </div>
  );
}
