'use client';

import { CodeBlock, Columns, Divider, Paper, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';


export default function Page() {
  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Columns</Typography>
      <Typography type='body1' style={{ marginBottom: 20 }}>
        The Columns component provides a responsive grid system. You can specify the number of columns on different screen sizes using a breakpoint.
      </Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>2 columns (default)</Typography>
      <Columns>
        <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>1</Paper>
        <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>2</Paper>
      </Columns>
      <CodeBlock code={`
        import { Columns, Paper } from '@esmalley/react-material-ui';

        <Columns>
          <Paper>1</Paper>
          <Paper>2</Paper>
        </Columns>
      `} />
      <Divider style={{ margin: '20px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>5 columns</Typography>
      <Columns numberOfColumns={5}>
        <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>1</Paper>
        <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>2</Paper>
        <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>3</Paper>
        <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>4</Paper>
        <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>5</Paper>
      </Columns>
      <CodeBlock code={`
        import { Columns, Paper } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={5}>
          <Paper>1</Paper>
          <Paper>2</Paper>
          <Paper>3</Paper>
          <Paper>4</Paper>
          <Paper>5</Paper>
        </Columns>
      `} />
      <Divider style={{ margin: '20px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>3 columns, 600px breakpoint</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        Below the breakPoint the grid collapses to a single stacked column. The default is 475px.
      </Typography>
      <Columns numberOfColumns={3} breakPoint={600}>
        <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>1</Paper>
        <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>2</Paper>
        <Paper style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>3</Paper>
      </Columns>
      <CodeBlock code={`
        import { Columns, Paper } from '@esmalley/react-material-ui';

        <Columns numberOfColumns={3} breakPoint={600}>
          <Paper>1</Paper>
          <Paper>2</Paper>
          <Paper>3</Paper>
        </Columns>
      `} />
      <Divider style={{ margin: '20px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='Columns reads the window width through useWindowDimensions, which reports 0 until mount - so the first paint is always the stacked layout.'
        rows={[
          { name: 'children', type: 'React.ReactNode', required: true, description: 'The items to lay out. Each child becomes one grid cell.' },
          { name: 'numberOfColumns', type: 'number', default: '2', description: 'Columns above the breakpoint.' },
          { name: 'breakPoint', type: 'number', default: '475', description: 'Width at or below which the grid collapses to a single stacked column.' },
          { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Merged into the grid container.' },
        ]}
      />
    </div>
  );
}
