import React from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Typography,
  Paper,
  Box
} from '@mui/material';
import { useRef } from 'react';

function FeedbackPage() {
  const { isDarkMode } = useTheme();
  const refetchFeedbacksRef = useRef(null);

  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        py: { xs: 0, sm: 4 },
        px: { xs: 0, sm: 2 },
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

        <FeedbackForm onFeedbackSent={() => refetchFeedbacksRef.current?.()} />
        <FeedbackList onRefetch={(refetch) => { refetchFeedbacksRef.current = refetch }} />
      </Paper>
    </Container>
  );
}

export default FeedbackPage;