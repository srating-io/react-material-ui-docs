'use client';

import { Table, Tbody, Td, Tfoot, Th, Thead, Tr, Typography, useTheme } from '@esmalley/react-material-ui';

export type PropRow = {
  /** Prop name. Suffix nothing - mark required with the `required` flag instead. */
  name: string;
  /** Written out in full, including union members: `'standard' | 'outlined' | 'filled'`. */
  type: string;
  /** Omit when the prop has no default. */
  default?: string;
  required?: boolean;
  description: string;
};

/**
 * The API reference table used on every component page.
 *
 * Rows are hand written per page - nothing generates them from the library source, so when a
 * component's props change this table has to change with it, exactly like the code blocks do.
 */
const PropsTable = ({
  rows,
  note,
}: {
  rows: PropRow[];
  /** Rendered in the footer. Use it for rest-prop passthrough and other whole-component notes. */
  note?: string;
}) => {
  const theme = useTheme();

  const hasRequired = rows.some((row) => row.required);

  const cellStyle = {
    verticalAlign: 'top',
    padding: '8px 10px',
    borderBottom: `1px solid ${theme.grey[600]}`,
  };

  return (
    <Table style={{ marginBottom: 16 }}>
      <Thead>
        <Tr>
          <Th style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>Name</Th>
          <Th style={{ padding: '8px 10px' }}>Type</Th>
          <Th style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>Default</Th>
          <Th style={{ padding: '8px 10px', width: '45%' }}>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((row) => (
          <Tr key={row.name}>
            <Td style={{ ...cellStyle, whiteSpace: 'nowrap' }}>
              <code style={{ fontWeight: 600 }}>{row.name}</code>
              {row.required ? (
                <span style={{ color: theme.error.main, marginLeft: 3 }} title='Required'>*</span>
              ) : null}
            </Td>
            <Td style={cellStyle}>
              <code style={{ color: theme.info.main }}>{row.type}</code>
            </Td>
            <Td style={{ ...cellStyle, whiteSpace: 'nowrap' }}>
              {row.default ? <code>{row.default}</code> : <span style={{ color: theme.text.disabled }}>&mdash;</span>}
            </Td>
            <Td style={cellStyle}>{row.description}</Td>
          </Tr>
        ))}
      </Tbody>
      {(hasRequired || note) ? (
        <Tfoot>
          <Tr>
            <Td colSpan={4} style={{ padding: '8px 10px' }}>
              <Typography type='caption' style={{ color: theme.text.secondary }}>
                {hasRequired ? <><code style={{ color: theme.error.main }}>*</code>{' '}required. </> : null}
                {note}
              </Typography>
            </Td>
          </Tr>
        </Tfoot>
      ) : null}
    </Table>
  );
};

export default PropsTable;
