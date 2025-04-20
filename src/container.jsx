import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

function Container({ children, ...props }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflowX: 'auto', // предотвращает горизонтальный скролл
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default Container;