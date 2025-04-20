import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Footer() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: isDarkMode ? '#1e1e1e' : '#f8f9fa',
        color: isDarkMode ? '#ffffff' : '#000000',
        p: 2,
        borderTop: isDarkMode ? '1px solid #444' : '1px solid #e7e7e7',
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            display: { xs: 'none', sm: 'block' },
            color: isDarkMode ? '#ccc' : '#000',
            m: 0,
          }}
        >
          © 2025 Лабораторные работы
        </Typography>

        <Button
          onClick={() => navigate('/feedback')}
          variant="outlined"
          size="small"
          sx={{
            borderColor: isDarkMode ? '#aaa' : undefined,
            color: isDarkMode ? '#aaa' : undefined,
            '&:hover': {
              borderColor: isDarkMode ? '#fff' : undefined,
              color: isDarkMode ? '#fff' : undefined,
            },
          }}
        >
          Обратная связь
        </Button>
      </Container>
    </Box>
  );
}

export default Footer;