'use client';

import { useMemo, useState } from 'react';
import { CodeBlock, Divider, getToaster, Table, Tbody, Td, Tfoot, Th, Thead, Tr, Typography } from '@esmalley/react-material-ui';
import PropsTable from '../../../components/PropsTable';


export default function Page() {
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (accessor: string) => {
    if (orderBy === accessor) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
      return;
    }
    setOrderBy(accessor);
    setOrder('asc');
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User' },
    { id: 6, name: 'Eve White', email: 'eve@example.com', role: 'Admin' },
    { id: 7, name: 'Frank Miller', email: 'frank@example.com', role: 'User' },
    { id: 8, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor' },
  ];

  const sortedData = useMemo(() => {
    const key = orderBy as keyof (typeof data)[number];

    return [...data].sort((a, b) => {
      const left = a[key];
      const right = b[key];
      if (left === right) return 0;
      const result = left > right ? 1 : -1;
      return order === 'asc' ? result : -result;
    });
    // data is a literal rebuilt each render, so it is intentionally not a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy]);

  const roleCounts = useMemo(() => {
    const counts = new Map<string, number>();
    data.forEach((row) => counts.set(row.role, (counts.get(row.role) ?? 0) + 1));
    return [...counts.entries()];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Typography type='h5' style={{ marginBottom: 20 }}>Table</Typography>

      <Typography type='h6' style={{ marginBottom: 10 }}>Standard Table</Typography>
      <Table style={{ padding: 5 }}>
        <Thead>
          <Tr>
            {columns.map((col) => <Th key={col.accessor}>{col.header}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id} onClick={() => getToaster().add('Clicked row', 'info')}>
              <Td>{row.id}</Td>
              <Td>{row.name}</Td>
              <Td>{row.email}</Td>
              <Td>{row.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <CodeBlock code={`
        import { Table, Tbody, Td, Th, Thead, Tr, getToaster } from '@esmalley/react-material-ui';
        const columns = [
          { header: 'ID', accessor: 'id' },
          { header: 'Name', accessor: 'name' },
          { header: 'Email', accessor: 'email' },
          { header: 'Role', accessor: 'role' },
        ];

        const data = [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
          { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor' },
          { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User' },
          { id: 6, name: 'Eve White', email: 'eve@example.com', role: 'Admin' },
          { id: 7, name: 'Frank Miller', email: 'frank@example.com', role: 'User' },
          { id: 8, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor' },
        ];

        <Table style={{ padding: 5 }}>
          <Thead>
            <Tr>
              {columns.map((col) => <Th key={col.accessor}>{col.header}</Th>)}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => (
              <Tr key={row.id} onClick={() => getToaster().add('Clicked row', 'info')}>
                <Td>{row.id}</Td>
                <Td>{row.name}</Td>
                <Td>{row.email}</Td>
                <Td>{row.role}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      `} />

      <Divider style={{ margin: '40px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Empty Table</Typography>
      <Table>
        <Thead>
          <Tr>
            {columns.map((col) => <Th key={col.accessor}>{col.header}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
              No data available
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <CodeBlock code={`
        <Table>
          <Thead>
            <Tr>
              {columns.map((col) => <Th key={col.accessor}>{col.header}</Th>)}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                No data available
              </Td>
            </Tr>
          </Tbody>
        </Table>
      `} />

      <Divider style={{ margin: '40px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Sortable headers</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>Th</code>{' '}draws its own sort affordance. Pass <code>sortable</code>{' '}to get a pointer cursor
        and a ghost arrow that fades in on hover, and <code>sortDirection</code>{' '}to show the committed
        direction. <code>Th</code>{' '}does not sort anything itself &mdash; you own the ordering and just
        tell it what to draw.
      </Typography>
      <Table style={{ padding: 5 }}>
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th
                key={col.accessor}
                sortable
                sortDirection={orderBy === col.accessor ? order : false}
                onClick={() => handleSort(col.accessor)}
              >
                {col.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((row) => (
            <Tr key={row.id}>
              <Td>{row.id}</Td>
              <Td>{row.name}</Td>
              <Td>{row.email}</Td>
              <Td>{row.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <CodeBlock code={`
        const [orderBy, setOrderBy] = useState('name');
        const [order, setOrder] = useState<'asc' | 'desc'>('asc');

        const handleSort = (accessor: string) => {
          if (orderBy === accessor) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
            return;
          }
          setOrderBy(accessor);
          setOrder('asc');
        };

        <Th
          sortable
          sortDirection={orderBy === col.accessor ? order : false}
          onClick={() => handleSort(col.accessor)}
        >
          {col.header}
        </Th>
      `} />

      <Divider style={{ margin: '40px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Footer</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        <code>Tfoot</code>{' '}is the <code>tfoot</code>{' '}wrapper, for totals and summary rows.
      </Typography>
      <Table style={{ padding: 5 }}>
        <Thead>
          <Tr>
            <Th>Role</Th>
            <Th>People</Th>
          </Tr>
        </Thead>
        <Tbody>
          {roleCounts.map(([role, count]) => (
            <Tr key={role}>
              <Td>{role}</Td>
              <Td>{count}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td style={{ fontWeight: 600 }}>Total</Td>
            <Td style={{ fontWeight: 600 }}>{data.length}</Td>
          </Tr>
        </Tfoot>
      </Table>
      <CodeBlock code={`
        <Table>
          <Thead>...</Thead>
          <Tbody>...</Tbody>
          <Tfoot>
            <Tr>
              <Td style={{ fontWeight: 600 }}>Total</Td>
              <Td style={{ fontWeight: 600 }}>{data.length}</Td>
            </Tr>
          </Tfoot>
        </Table>
      `} />

      <Divider style={{ margin: '40px 0' }} />

      <Typography type='h6' style={{ marginBottom: 10 }}>Props</Typography>
      <Typography type='body2' style={{ marginBottom: 10 }}>
        These are thin wrappers over the real table elements. Each one spreads any extra props onto the
        element it renders, and <code>style</code>{' '}goes through the style helper, so nested selectors
        such as <code>{"'&:hover td'"}</code>{' '}work.
      </Typography>
      <PropsTable
        note='Table, Thead, Tbody, Tfoot and Tr all take { style?, children } plus any native attributes of the element they render.'
        rows={[
          { name: 'Table', type: '{ style?, overlayStyle?, ref?, children }', description: 'Renders a Paper, a scroll wrapper and the table. overlayStyle targets the scroll wrapper; style targets the table.' },
          { name: 'Thead / Tbody / Tfoot', type: '{ style?, children }', description: 'The three row-group wrappers.' },
          { name: 'Tr', type: '{ onClick?, style?, children }', description: 'A row. Supplying onClick switches the cursor to a pointer.' },
          { name: 'Td', type: 'TdProps', description: 'A cell. Extends the native td attributes, so colSpan and the rest pass through. onClick here takes no event argument.' },
          { name: 'Th.sortable', type: 'boolean', default: 'false', description: 'Shows the pointer cursor and the hover sort arrow.' },
          { name: 'Th.sortDirection', type: "'asc' | 'desc' | false", default: 'false', description: 'Which arrow to show. false leaves only the ghost hover arrow.' },
          { name: 'Th.sortIconStyle', type: 'object', default: '{}', description: 'Styles the sort arrow.' },
        ]}
      />

      <Typography type='h6' style={{ marginBottom: 10 }}>Exported types</Typography>
      <PropsTable
        rows={[
          { name: 'TdProps', type: 'Omit<TdHTMLAttributes, onClick | style> & { onClick?, style?, children? }', description: 'The Td props type, for typing a cell wrapper of your own.' },
          { name: 'ThProps', type: 'ThHTMLAttributes & { sortable?, sortDirection?, sortIconStyle?, style?, children, ref? }', description: 'The Th props type.' },
        ]}
      />
    </div>
  );
}
