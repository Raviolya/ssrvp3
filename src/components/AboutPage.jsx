import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '../context/ThemeContext';

function AboutPage() {
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        <Typography variant="h4" gutterBottom>
          О себе
        </Typography>

        <Typography variant="body1" paragraph>
          Ганибаев Равиль, студент 3 курса Алтайского государственного университета.
        </Typography>

        <Typography variant="body1" paragraph>
          21 год.
        </Typography>

        <Typography variant="body1" paragraph>
          Сделал лабораторную работу №7
        </Typography>
      </Paper>
    </Box>
  );
}

export default AboutPage;