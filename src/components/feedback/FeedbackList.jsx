import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  Divider,
  useMediaQuery
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '../../context/ThemeContext';
import {
  useFetchFeedbackQuery,
  useDeleteFeedbackMutation,
  useFetchProfileQuery
} from '../../actions/Requests';
import { useEffect } from 'react';

function FeedbackList({onRefetch}) {
  const { isDarkMode } = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  const { data: feedbacks = [], isLoading, refetch: refetchFeedbacks } = useFetchFeedbackQuery();
  const { data: profile } = useFetchProfileQuery();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const onDelete = async (id) => {
    try {
      await deleteFeedback(id).unwrap();
      refetchFeedbacks();
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  useEffect(() => {
    if (onRefetch) onRefetch(refetchFeedbacks);
  }, [onRefetch, refetchFeedbacks]);

  return (
    <Box mt={4}>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        gutterBottom
        sx={{ color: isDarkMode ? '#fff' : '#000' }}
      >
        Отзывы
      </Typography>

      {isLoading ? (
        <Typography variant="body2" align="center">
          Загрузка...
        </Typography>
      ) : feedbacks.length === 0 ? (
        <Typography variant="body2" align="center" color="textSecondary">
          Пока нет отзывов
        </Typography>
      ) : (
        <Stack spacing={2}>
          {feedbacks.map((feedback) => {
            const isOwnFeedback = profile && feedback.user_id === profile.id;
            const isBlocked = feedback.blocked;

            return (
              <Paper
                key={feedback.id}
                elevation={3}
                sx={{
                  p: 2,
                  backgroundColor: isDarkMode ? '#2e2e2e' : '#f9f9f9',
                  border: isDarkMode ? '1px solid #444' : '1px solid #ddd',
                  color: isDarkMode ? '#fff' : '#000',
                  opacity: isBlocked ? 0.6 : 1,
                }}
              >
                <Box
                  display="flex"
                  flexDirection={isMobile ? 'column' : 'row'}
                  justifyContent="space-between"
                  alignItems={isMobile ? 'flex-start' : 'center'}
                >
                  <Typography fontWeight="bold">
                    {feedback.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={isDarkMode ? 'grey.400' : 'textSecondary'}
                    sx={{ mt: isMobile ? 0.5 : 0 }}
                  >
                    {feedback.date}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1, borderColor: isDarkMode ? '#555' : '#ccc' }} />

                <Typography sx={{ mb: 1 }}>
                  {isBlocked ? (
                    <i style={{ color: 'gray' }}>Комментарий заблокирован</i>
                  ) : (
                    feedback.message
                  )}
                </Typography>

                <Box
                  display="flex"
                  flexDirection={isMobile ? 'column' : 'row'}
                  justifyContent="space-between"
                  alignItems={isMobile ? 'flex-start' : 'center'}
                  gap={isMobile ? 1 : 0}
                >
                  <Typography variant="body2" color={isDarkMode ? 'grey.400' : 'textSecondary'}>
                    Оценка:&nbsp;
                    <span style={{ color: '#646cff' }}>
                      {'★'.repeat(Number(feedback.score))}
                      {'☆'.repeat(5 - Number(feedback.score))}
                    </span>
                  </Typography>

                  {isOwnFeedback && (
                    <IconButton
                      onClick={() => onDelete(feedback.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Paper>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}

export default FeedbackList;