import React, { useState, useCallback } from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Typography,
  Paper,
  Box
} from '@mui/material';

function FeedbackPage() {
  const { isDarkMode } = useTheme();

  const [feedbacks, setFeedbacks] = useState(() => {
    const savedFeedbacks = localStorage.getItem('feedbacks');
    return savedFeedbacks ? JSON.parse(savedFeedbacks) : [];
  });

  const handleSubmitFeedback = useCallback((newFeedback) => {
    setFeedbacks(prevFeedbacks => {
      const updatedFeedbacks = [newFeedback, ...prevFeedbacks];
      localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
      return updatedFeedbacks;
    });
  }, []);

  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        py: { xs: 0, sm: 4 }, // без вертикальных отступов на xs
        px: { xs: 0, sm: 2 }, // горизонтальные отступы если нужно
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
          color: isDarkMode ? '#fff' : 'inherit',
          borderRadius: 2,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Обратная связь
          </Typography>
        </Box>

        <FeedbackForm onSubmit={handleSubmitFeedback} />
        <FeedbackList feedbacks={feedbacks} />
      </Paper>
    </Container>
  );
}

export default FeedbackPage;