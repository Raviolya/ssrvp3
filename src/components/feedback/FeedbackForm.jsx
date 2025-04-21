import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  FormHelperText
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../context/ThemeContext';
import { createFeedbackAsync } from '../../actions/Requests';
import { useDispatch, useSelector } from 'react-redux';

function FeedbackForm() {
  const { isDarkMode } = useTheme();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.feedback);

  const onSubmit = async (data) => {
    try {
      await dispatch(createFeedbackAsync({
        email: data.email,
        message: data.message,
        rating: data.rating,
        date: new Date().toLocaleString(),
        user_id: profile.id,
      })).unwrap();
      reset();
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    }
  };

  const commonInputStyles = {
    input: { color: isDarkMode ? '#fff' : '#000' },
    label: { color: isDarkMode ? '#aaa' : '#000' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: isDarkMode ? '#555' : '#ccc',
      },
      '&:hover fieldset': {
        borderColor: isDarkMode ? '#777' : '#888',
      },
      '&.Mui-focused fieldset': {
        borderColor: isDarkMode ? '#888' : '#1976d2',
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
        p: 3,
        borderRadius: 2,
        mb: 4,
        boxShadow: isDarkMode ? '0 0 10px rgba(0,0,0,0.5)' : '0 0 10px rgba(0,0,0,0.1)',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: isDarkMode ? '#fff' : '#000' }}
      >
        Оставить отзыв
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Ваш email"
          variant="outlined"
          margin="normal"
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат email'
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={commonInputStyles}
        />

        <TextField
          fullWidth
          label="Ваш отзыв"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          {...register('message', {
            required: 'Сообщение обязательно',
            minLength: {
              value: 10,
              message: 'Сообщение должно содержать минимум 10 символов'
            }
          })}
          error={!!errors.message}
          helperText={errors.message?.message}
          sx={commonInputStyles}
        />

        <FormControl
          fullWidth
          margin="normal"
          error={!!errors.rating}
          sx={commonInputStyles}
        >
          <InputLabel sx={{ color: isDarkMode ? '#aaa' : '#000' }}>
            Оценка
          </InputLabel>
          <Select
            defaultValue=""
            {...register('rating', { required: 'Выберите оценку' })}
            label="Оценка"
            sx={{
              color: isDarkMode ? '#fff' : '#000',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? '#555' : '#ccc',
              },
            }}
          >
            <MenuItem value="">Выберите оценку</MenuItem>
            <MenuItem value="5">Отлично</MenuItem>
            <MenuItem value="4">Хорошо</MenuItem>
            <MenuItem value="3">Удовлетворительно</MenuItem>
            <MenuItem value="2">Плохо</MenuItem>
            <MenuItem value="1">Очень плохо</MenuItem>
          </Select>
          <FormHelperText>{errors.rating?.message}</FormHelperText>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Отправить отзыв
        </Button>
      </form>
    </Box>
  );
}

export default FeedbackForm;