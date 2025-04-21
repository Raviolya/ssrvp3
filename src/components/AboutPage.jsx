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
          Привет! Меня зовут Равиль, мне 20 лет. Я студент 3 курса Алтайского государственного университета (АлтГУ).
        </Typography>

        <Typography variant="body1" paragraph>
          Увлекаюсь веб-разработкой, стараюсь развиваться в сфере программирования. Особенно интересны технологии React, Node.js и всё, что связано с созданием современных веб-приложений.
        </Typography>

        <Typography variant="body1" paragraph>
          В свободное время люблю читать, слушать музыку и экспериментировать с новыми фреймворками.
        </Typography>
      </Paper>
    </Box>
  );
}

export default AboutPage;