import type { ReactNode } from 'react';
import styled from 'styled-components';

export type DataTableColumn<Row> = {
  key: string;
  header: string;
  render: (row: Row) => ReactNode;
  /** CSS width of the column, e.g. `96px`. */
  width?: string;
};

type DataTableProps<Row> = {
  /** Accessible name of the table. */
  caption: string;
  columns: readonly DataTableColumn<Row>[];
  rows: readonly Row[];
  getRowKey: (row: Row) => string | number;
};

const Scroll = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  inline-size: 100%;
  border-collapse: collapse;
  text-align: start;
`;

const Caption = styled.caption`
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

const HeaderCell = styled.th`
  padding-block: 14px;
  padding-inline: 20px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-weight: 600;
  text-align: start;
  white-space: nowrap;
`;

const Row = styled.tr`
  border-block-start: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

const Cell = styled.td`
  padding-block: 12px;
  padding-inline: 20px;
  vertical-align: middle;
`;

/** Generic, presentational table; callers describe columns and provide rows. */
export function DataTable<Row>({ caption, columns, rows, getRowKey }: DataTableProps<Row>) {
  return (
    <Scroll>
      <Table>
        <Caption>{caption}</Caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <HeaderCell key={column.key} scope="col" style={{ inlineSize: column.width }}>
                {column.header}
              </HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Row key={getRowKey(row)}>
              {columns.map((column) => (
                <Cell key={column.key}>{column.render(row)}</Cell>
              ))}
            </Row>
          ))}
        </tbody>
      </Table>
    </Scroll>
  );
}
