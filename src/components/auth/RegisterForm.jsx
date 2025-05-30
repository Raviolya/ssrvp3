import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../context/ThemeContext';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from '@mui/material';

import { useCreateAccountMutation } from '../../actions/Requests';

function RegisterForm({ onSwitchToLogin }) {
  const { isDarkMode } = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');
  const [createAccount, { isLoading, error, isSuccess, data }] = useCreateAccountMutation();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = useCallback(
    async (data) => {
      try {
        await createAccount({
          name: data.name,
          email: data.email,
          password: data.password,
        }).unwrap();
        setSubmitted(true);
      } catch (err) {
        console.error('Ошибка регистрации:', err);
      }
    },
    [createAccount]
  );

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
        color: isDarkMode ? '#fff' : 'inherit',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Регистрация
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Логин"
          margin="normal"
          variant="outlined"
          {...register('name', {
            required: 'Имя обязательно',
            minLength: {
              value: 2,
              message: 'Логин должен содержать минимум 2 символа',
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат email',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Пароль"
          type="password"
          margin="normal"
          variant="outlined"
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: {
              value: 5,
              message: 'Минимальная длина пароля 5 символов',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          fullWidth
          label="Подтвердите пароль"
          type="password"
          margin="normal"
          variant="outlined"
          {...register('confirmPassword', {
            required: 'Подтвердите пароль',
            validate: (value) => value === password || 'Пароли не совпадают',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#646cff' }}
          disabled={isLoading}
        >
          Зарегистрироваться
        </Button>
      </form>

      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Уже есть аккаунт?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={onSwitchToLogin}
            underline="hover"
            sx={{ color: '#646cff' }}
          >
            Войти
          </Link>
        </Typography>
      </Box>

      {submitted && isSuccess && data?.message && (
        <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
          {data.message}
        </Typography>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          Ошибка регистрации. Попробуйте снова.
        </Typography>
      )}
    </Paper>
  );
}

export default RegisterForm;