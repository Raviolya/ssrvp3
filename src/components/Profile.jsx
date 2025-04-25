import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../context/ThemeContext';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { useFetchProfileQuery, useUpdateProfileMutation } from '../actions/Requests';

const Profile = () => {
  const { isDarkMode } = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  const { data: profile, isLoading, refetch: refetchProfile } = useFetchProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  useEffect(() => {
    if (profile) {
      reset({
        username: profile.username || '',
        email: profile.email || '',
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    try {
      await updateProfile({ id: profile.id, profileData: data }).unwrap();
      refetchProfile();
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h5" textAlign="center">
        Редактирование профиля
      </Typography>

      <TextField
        label="Логин"
        variant="outlined"
        error={!!errors.username}
        helperText={errors.username?.message}
        {...register('username', {
          required: 'Введите логин',
          minLength: {
            value: 5,
            message: 'Логин должен содержать минимум 5 символов',
          },
        })}
        fullWidth
        sx={inputStyle(isDarkMode)}
      />

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email', {
          required: 'Введите email',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Неверный формат email',
          },
        })}
        fullWidth
        sx={inputStyle(isDarkMode)}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ textTransform: 'none', height: 45 }}
        disabled={isUpdating}
      >
        {isUpdating ? <CircularProgress size={24} color="inherit" /> : 'Обновить профиль'}
      </Button>
    </Box>
  );
};

const inputStyle = (isDark) => ({
  '& .MuiInputBase-input': {
    color: isDark ? '#fff' : '#000',
  },
  '& .MuiInputLabel-root': {
    color: isDark ? '#aaa' : '#555',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: isDark ? '#666' : '#ccc',
    },
    '&:hover fieldset': {
      borderColor: isDark ? '#888' : '#888',
    },
    '&.Mui-focused fieldset': {
      borderColor: isDark ? '#fff' : '#1976d2',
    },
  },
});

export default Profile;