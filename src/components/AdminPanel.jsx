import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  Paper, Table, TableHead, TableRow, TableCell, TableSortLabel,
  Tooltip, IconButton, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { FixedSizeList } from 'react-window';
import { useTable, useSortBy } from 'react-table';
import { useTheme } from '../context/ThemeContext';
import { DraggableHeaderCell } from './DraggableCell';

const ROW_HEIGHT = 52;
const VISIBLE_HEIGHT = 520;

export default function AdminUsersTable({ data, onDelete, onBlock, onUnblock, currentUserId }) {
  const { isDarkMode } = useTheme();
  const headerCellRefs = useRef([]);

  const defaultColumns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Роль', accessor: 'role' },
    {
      Header: 'Статус',
      accessor: 'status',
      disableSortBy: true,
      Cell: ({ row }) => {
        const isBlocked = row.original.blocked;
        return (
          <span style={{ color: isBlocked ? 'red' : 'green', fontWeight: 500 }}>
            {isBlocked ? 'Заблокирован' : 'Активен'}
          </span>
        );
      }
    },
    {
      Header: 'Действия',
      accessor: 'actions',
      disableSortBy: true,
      Cell: ({ row }) => {
        const { id, blocked } = row.original;
        const isSelf = id === currentUserId;

        return (
          <>
            {!isSelf && (
              <Tooltip title={blocked ? 'Разблокировать' : 'Заблокировать'}>
                <IconButton
                  onClick={() =>
                    (!blocked ? onBlock(id) : onUnblock(id)).catch(() =>
                      console.error('Ошибка обновления')
                    )
                  }
                  color={blocked ? 'success' : 'warning'}
                >
                  {blocked ? <LockOpenIcon /> : <LockIcon />}
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Удалить пользователя">
              <IconButton
                onClick={() =>
                  onDelete(id).catch(() => console.error('Ошибка удаления'))
                }
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      }
    }
  ], [onDelete, onBlock, onUnblock, currentUserId]);

  const [columns, setColumns] = useState(defaultColumns);
  const [columnWidths, setColumnWidths] = useState([]);

  const moveColumn = (dragIndex, hoverIndex) => {
    const updated = [...columns];
    const [dragged] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, dragged);
    setColumns(updated);
  };

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  useEffect(() => {
    if (headerCellRefs.current.length > 0) {
      const widths = headerCellRefs.current.map(cell => cell?.offsetWidth || 0);
      setColumnWidths(widths);
    }
  }, [headerGroups, columns]);

  return (
    <Paper sx={{ mt: 4, overflow: 'hidden' }}>
      <Table {...getTableProps()} sx={{ tableLayout: 'fixed', width: '100%' }}>
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                <DraggableHeaderCell
                  key={j}
                  column={column}
                  index={j}
                  moveColumn={moveColumn}
                  isDarkMode={isDarkMode}
                  refEl={el => headerCellRefs.current[j] = el}
                />
              ))}
            </TableRow>
          ))}
        </TableHead>
      </Table>

      <Box sx={{ height: VISIBLE_HEIGHT, overflow: 'auto' }}>
        <FixedSizeList
          height={VISIBLE_HEIGHT}
          itemCount={rows.length}
          itemSize={ROW_HEIGHT}
          width="100%"
          itemData={{ rows, prepareRow, columnWidths }}
        >
          {({ index, style, data }) => {
            const { rows, prepareRow, columnWidths } = data;
            const row = rows[index];
            prepareRow(row);

            return (
              <Table {...getTableProps()} sx={{ tableLayout: 'fixed', width: '100%' }}>
              <TableRow
                {...row.getRowProps({ style })}
                sx={{
                  backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
                }}
              >
                {row.cells.map((cell, k) => (
                  <TableCell
                    {...cell.getCellProps()}
                    key={k}
                    sx={{
                      width: columnWidths[k] || 'auto',
                      maxWidth: columnWidths[k] || 'auto',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      padding: '0px 20px',
                      backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
                      color: isDarkMode ? '#fff' : '#000',
                      borderBottom: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
                    }}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            </Table>
            );
          }}
        </FixedSizeList>
      </Box>
    </Paper>
  );
}