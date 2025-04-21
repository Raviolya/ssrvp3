import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TableCell, TableSortLabel } from '@mui/material';

const DRAG_TYPE = 'column';

export function DraggableHeaderCell({ column, index, moveColumn, isDarkMode, refEl }) {
  const [, drag] = useDrag({
    type: DRAG_TYPE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: DRAG_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveColumn(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <TableCell
      {...column.getHeaderProps(column.getSortByToggleProps())}
      ref={(node) => {
        drag(drop(node));
        if (refEl) refEl(node);
      }}
      sx={{
        backgroundColor: isDarkMode ? '#3a3a3a' : '#f5f5f5',
        color: isDarkMode ? '#fff' : '#000',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        cursor: 'move',
      }}
    >
      <TableSortLabel
        active={column.isSorted}
        direction={column.isSortedDesc ? 'desc' : 'asc'}
      >
        {column.render('Header')}
      </TableSortLabel>
    </TableCell>
  );
}