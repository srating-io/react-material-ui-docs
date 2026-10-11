'use client';

import { CodeBlock, Divider, TableColumnsType, Typography, VirtualTable } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';
import { useMemo } from 'react';

export default function Page() {
  const columns: TableColumnsType={
    id: { id: 'id', numeric: false, getLabel: () => 'ID', getTooltip: () => 'Tooltip for ID', organization_ids: [], getViews: () => [], graphable: false },
    name: { id: 'name', numeric: false, getLabel: () => 'Name', getTooltip: () => 'Tooltip for Name', organization_ids: [], getViews: () => [], graphable: false },
    email: { id: 'email', numeric: false, getLabel: () => 'Email', getTooltip: () => 'Tooltip for Email', organization_ids: [], getViews: () => [], graphable: false },
    role: { id: 'role', numeric: false, getLabel: () => 'Role', getTooltip: () => 'Tooltip for Role', organization_ids: [], getViews: () => [], graphable: false },
  };

  const displayColumns = ['id', 'name', 'email', 'role'];

  const rows = useMemo(() => {
    return Array.from({ length: 100000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : 'User',
    }));
  }, []);

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>VirtualTable</Typography>

      <Typography type='body1' style={{ marginBottom: 10 }}>This component allows you to display a lot of rows in a single table by virtualizing the results. It will also handling sorting by column!</Typography>
      <Typography type='h6' style={{ marginBottom: 10 }}>Large Dataset (100,000 rows)</Typography>
      <VirtualTable
        rows={rows}
        columns={columns}
        displayColumns={displayColumns}
        rowKey="id"
        defaultSortOrder="asc"
        defaultSortOrderBy="id"
        height={500}
        rowHeight={30}
      />

      <CodeBlock code={`
        import { useMemo } from 'react';
        import { TableColumnsType, VirtualTable } from '@esmalley/react-material-ui';

        const columns: TableColumnsType={
          id: { id: 'id', numeric: false, getLabel: () => 'ID', getTooltip: () => 'Tooltip for ID', organization_ids: [], getViews: () => [], graphable: false },
          name: { id: 'name', numeric: false, getLabel: () => 'Name', getTooltip: () => 'Tooltip for Name', organization_ids: [], getViews: () => [], graphable: false },
          email: { id: 'email', numeric: false, getLabel: () => 'Email', getTooltip: () => 'Tooltip for Email', organization_ids: [], getViews: () => [], graphable: false },
          role: { id: 'role', numeric: false, getLabel: () => 'Role', getTooltip: () => 'Tooltip for Role', organization_ids: [], getViews: () => [], graphable: false },
        };

        const displayColumns = ['id', 'name', 'email', 'role'];

        const rows = useMemo(() => {
          return Array.from({ length: 100000 }, (_, i) => ({
            id: i + 1,
            name: \`User \${i + 1}\`,
            email: \`user\${i + 1}@example.com\`,
            role: i % 3 === 0 ? 'Admin' : 'User',
          }));
        }, []);

        <VirtualTable
          rows={rows}
          columns={columns}
          displayColumns={displayColumns}
          rowKey="id"
          defaultSortOrder="asc"
          defaultSortOrderBy="id"
          height={500}
          rowHeight={30}
        />
      `} />

      <Divider style={{ margin: '40px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Small Dataset</Typography>
      <VirtualTable
        rows={rows.slice(0, 10)}
        columns={columns}
        displayColumns={displayColumns}
        rowKey='id'
        defaultSortOrder='asc'
        defaultSortOrderBy='id'
        height={200}
        rowHeight={30}
      />
      <CodeBlock code={`
        <VirtualTable
          rows={rows.slice(0, 10)}
          columns={columns}
          displayColumns={displayColumns}
          rowKey='id'
          defaultSortOrder='asc'
          defaultSortOrderBy='id'
          height={200}
          rowHeight={30}
        />
      `} />
      <Divider style={{ margin: '40px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>TableColumn</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The column definition is deliberately open-ended &mdash; applications hang their own metadata off
        it and the table never looks at those fields. That means the type requires more than the component
        reads. The table itself only uses <code>id</code>, <code>getLabel</code>, <code>getTooltip</code>,{' '}
        <code>numeric</code>{' '}and <code>sort</code>; the rest are required by the type but ignored, so
        pass empty values for them.
      </Typography>
      <PropsTable
        note='organization_ids, graphable and getViews are required by the type but never read. The optional fields below are declared on the type and also unread - they exist for consuming apps to use in their own decorators.'
        rows={[
          { name: 'id', type: 'string', required: true, description: 'Column key. Also the property read off each row by the default renderer.' },
          { name: 'getLabel', type: '() => string', required: true, description: 'Header text.' },
          { name: 'getTooltip', type: '() => string', required: true, description: 'Header tooltip text.' },
          { name: 'numeric', type: 'boolean', required: true, description: 'Marks the column as numeric.' },
          { name: 'organization_ids', type: 'string[]', required: true, description: 'Required by the type, never read. Pass [].' },
          { name: 'graphable', type: 'boolean', required: true, description: 'Required by the type, never read. Pass false.' },
          { name: 'getViews', type: '() => string[]', required: true, description: 'Required by the type, never read. Pass () => [].' },
          { name: 'sort', type: "'lower' | 'higher'", description: 'Passed to the comparator to control where empty values land.' },
          { name: 'getAltLabel', type: '() => string', description: 'Used for the header instead of getLabel when useAlternateLabel is set.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Merged into every cell in the column.' },
        ]}
      />
      <Typography type='body2' style={{ marginBottom: 10 }}>
        The default row renderer reads <code>row[column.id]</code>{' '}directly &mdash; it does not call{' '}
        <code>getValue</code>{' '}or <code>getDisplayValue</code>. To format a cell, supply{' '}
        <code>decorateRows</code>{' '}and render the rows yourself.
      </Typography>
      <Divider style={{ margin: '40px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <PropsTable
        note='Sorting is done in-memory over the whole rows array, so the component is virtualised for rendering but not for data size.'
        rows={[
          { name: 'rows', type: 'T[]', required: true, description: 'The full dataset. Only the visible window is rendered.' },
          { name: 'columns', type: 'TableColumnsType', required: true, description: 'A map of column id to TableColumn.' },
          { name: 'displayColumns', type: 'string[]', required: true, description: 'Which columns to show, in order. A missing definition logs a warning and renders nothing.' },
          { name: 'rowKey', type: 'string', required: true, description: 'The row property that uniquely identifies a row.' },
          { name: 'defaultSortOrder', type: "'asc' | 'desc'", required: true, description: 'Initial sort direction.' },
          { name: 'defaultSortOrderBy', type: 'string', required: true, description: 'Initial sort column id.' },
          { name: 'height', type: 'number', default: '500', description: 'Viewport height in pixels.' },
          { name: 'rowHeight', type: 'number', default: '26', description: 'Fixed row height. The virtualiser relies on every row being this tall.' },
          { name: 'overscan', type: 'number', default: '50', description: 'Extra rows rendered above and below the viewport.' },
          { name: 'initialScrollTop', type: 'number', default: '0', description: 'Restore a previous scroll position on mount.' },
          { name: 'defaultEmpty', type: 'string | number', default: '0', description: 'Rendered in place of a missing cell value.' },
          { name: 'sessionStorageKey', type: 'string', description: 'Persists the sort column and direction under this key, restored after mount.' },
          { name: 'secondaryKey', type: 'string', description: 'Appends row[id_secondaryKey] after each cell value in a muted span.' },
          { name: 'handleRowClick', type: '(row: T) => void', description: 'Row click handler.' },
          { name: 'customHandleSort', type: '(id: string) => void', description: 'Runs after the internal sort state updates.' },
          { name: 'customSortComparator', type: '(order, orderBy, direction?) => comparator', description: 'Replaces the built-in comparator.' },
          { name: 'useAlternateLabel', type: 'boolean', default: 'false', description: 'Render headers from getAltLabel.' },
          { name: 'decorateRows', type: '(args: CustomDecorateRows<T>) => JSX.Element[]', description: 'Take over row rendering. Receives the visible slice plus the theme, widths and column config.' },
          { name: 'decorateHeaderRow', type: '(args: CustomDecorateHeaderRow) => JSX.Element', description: 'Take over header rendering, including the sort handler.' },
          { name: 'ref', type: 'RefObject<HTMLTableElement | null>', description: 'Attaches to the table element. The scroll container is its parent.' },
        ]}
      />

      <Typography type='h6' style={{ marginBottom: 10 }}>Exported types</Typography>
      <PropsTable
        rows={[
          { name: 'TableColumn', type: 'object', description: 'One column definition.' },
          { name: 'TableColumnsType', type: '{ [id: string]: TableColumn }', description: 'The columns map.' },
          { name: 'VirtualTableProps<T>', type: 'interface', description: 'The full props type, for typing a wrapper around VirtualTable.' },
          { name: 'defaultSortOrderType', type: "'asc' | 'desc'", description: 'The sort direction union. Note the lowercase name - every other exported type is PascalCase.' },
          { name: 'CustomDecorateRows<T>', type: 'object', description: 'The argument handed to decorateRows: the visible rows, start index, theme, width, breakPoint, rowHeight, displayColumns, columns, handleRowClick and rowKey.' },
          { name: 'CustomDecorateHeaderRow', type: 'object', description: 'The argument handed to decorateHeaderRow: theme, width, breakPoint, displayColumns, columns, order, orderBy, handleSort and useAlternateLabel.' },
        ]}
      />
    </div>
  );
}
