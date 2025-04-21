import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useTable, useSortBy } from 'react-table';
import { useTheme } from '../context/ThemeContext';
import { DraggableHeaderCell } from './DraggableCell'; // путь поправь под себя

export default function AdminFeedbackTable({ data, onDelete, onToggleBlock, onToggleUnblock }) {
  const { isDarkMode } = useTheme();

  const allColumns = useMemo(() => [
    {
      id: 'name',
      Header: 'Имя',
      accessor: 'name',
    },
    {
      id: 'date',
      Header: 'Дата',
      accessor: 'date',
    },
    {
      id: 'message',
      Header: 'Сообщение',
      accessor: 'message',
    },
    {
      id: 'score',
      Header: 'Оценка',
      accessor: 'score',
      Cell: ({ value }) => (
        <span style={{ color: '#646cff' }}>
          {'★'.repeat(Number(value))}{'☆'.repeat(5 - Number(value))}
        </span>
      ),
    },
    {
      id: 'blocked',
      Header: 'Статус',
      accessor: 'blocked',
      Cell: ({ value }) => (
        <span style={{ color: value ? 'red' : 'green', fontWeight: 500 }}>
          {value ? 'Заблокирован' : 'Активен'}
        </span>
      ),
    },
    {
      id: 'actions',
      Header: 'Действия',
      accessor: 'actions',
      disableSortBy: true,
      Cell: ({ row }) => {
        const { id, blocked } = row.original;
        return (
          <>
            <Tooltip title={blocked ? 'Разблокировать' : 'Заблокировать'}>
              <IconButton
                onClick={!blocked ? () => onToggleBlock(id) : () => onToggleUnblock(id)}
                color={blocked ? 'success' : 'warning'}
              >
                {blocked ? <LockOpenIcon /> : <BlockIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить">
              <IconButton onClick={() => onDelete(id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      }
    },
  ], [onDelete, onToggleBlock, onToggleUnblock]);

  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem('columnOrder');
    if (savedOrder) {
      const order = JSON.parse(savedOrder);
      return order.map(id => allColumns.find(col => col.id === id)).filter(Boolean);
    }
    return allColumns;
  });

  useEffect(() => {
    localStorage.setItem('columnOrder', JSON.stringify(columns.map(col => col.id)));
  }, [columns]);

  const moveColumn = useCallback((dragIndex, hoverIndex) => {
    const updated = [...columns];
    const [dragged] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, dragged);
    setColumns(updated);
  }, [columns]);

  const memoizedColumns = useMemo(() => columns, [columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns: memoizedColumns, data }, useSortBy);

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 4,
        backgroundColor: isDarkMode ? '#2e2e2e' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        border: isDarkMode ? '1px solid #444' : '1px solid #ddd',
      }}
    >
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow
              {...headerGroup.getHeaderGroupProps()}
              sx={{ backgroundColor: isDarkMode ? '#3a3a3a' : '#f5f5f5' }}
            >
              {headerGroup.headers.map((column, index) => (
                <DraggableHeaderCell
                  key={column.id}
                  column={column}
                  index={index}
                  moveColumn={moveColumn}
                  isDarkMode={isDarkMode}
                />
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <TableRow
                key={row.id}
                {...row.getRowProps()}
                sx={{
                  backgroundColor: isDarkMode ? '#1f1f1f' : '#fff',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#333' : '#f1f1f1',
                  }
                }}
              >
                {row.cells.map(cell => (
                  <TableCell
                    key={cell.column.id}
                    {...cell.getCellProps()}
                    sx={{ color: isDarkMode ? '#eee' : '#000' }}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}