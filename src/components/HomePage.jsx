import React from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; 

function HomePage() {
  const { isDarkMode } = useTheme(); 

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          textAlign: 'center',
          backgroundColor: isDarkMode ? '#2e2e2e' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem' } }}
          gutterBottom
        >
          Добро пожаловать!
        </Typography>

        <Typography variant="body1" paragraph>
          Это сайт с лабораторными работами, выполненными в рамках курса. Используются современные технологии: React, Material UI и другие.
        </Typography>

        <Typography variant="body1" paragraph>
          Используй меню слева для навигации между лабораторными работами, а также загляни на страницу "О себе", чтобы узнать немного больше.
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button component={Link} to="/lab1" variant="contained" color="primary">
            Перейти к Лаб. №1
          </Button>

          <Button component={Link} to="/about" variant="outlined">
            О себе
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default HomePage;