import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfileAsync } from '../actions/Requests';
import { useForm } from 'react-hook-form';
import { useTheme } from '../context/ThemeContext';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.feedback);

  const { isDarkMode} = useTheme();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  
  useEffect(() => {
    if (profile) {
      setUsername(profile.username || '');
      setEmail(profile.email || '');
  
      setValue('username', profile.username || '');
      setValue('email', profile.email || '');
    }
  }, [profile, setValue]);
  
  const onSubmit = () => {
    dispatch(updateProfileAsync({ id: profile.id, profileData: { username, email } }));
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
          onChange: (e) => setUsername(e.target.value),
        })}
        fullWidth
        sx={{
          '& .MuiInputBase-input': {
            color: isDarkMode ? '#fff' : '#000',
          },
          '& .MuiInputLabel-root': {
            color: isDarkMode ? '#aaa' : '#555',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: isDarkMode ? '#666' : '#ccc',
            },
            '&:hover fieldset': {
              borderColor: isDarkMode ? '#888' : '#888',
            },
            '&.Mui-focused fieldset': {
              borderColor: isDarkMode ? '#fff' : '#1976d2',
            },
          },
        }}
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
          onChange: (e) => setEmail(e.target.value),
        })}
        fullWidth
        sx={{
          '& .MuiInputBase-input': {
            color: isDarkMode ? '#fff' : '#000',
          },
          '& .MuiInputLabel-root': {
            color: isDarkMode ? '#aaa' : '#555',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: isDarkMode ? '#666' : '#ccc',
            },
            '&:hover fieldset': {
              borderColor: isDarkMode ? '#888' : '#888',
            },
            '&.Mui-focused fieldset': {
              borderColor: isDarkMode ? '#fff' : '#1976d2',
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ textTransform: 'none', height: 45 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Обновить профиль'}
      </Button>
    </Box>
  );
};

export default Profile;