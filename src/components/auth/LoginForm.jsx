import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../context/ThemeContext';
import { signinAccountAsync } from '../../actions/Requests';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../assets/svg/loadingCircle.svg';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from '@mui/material';

function LoginForm({ onSwitchToRegister }) {
  const { isDarkMode } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, error, isAuthenticated } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dispatch(signinAccountAsync({ email: data.email, password: data.password })).unwrap();
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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
        Вход в систему
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          InputLabelProps={{ style: { color: isDarkMode ? '#fff' : undefined } }}
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
          InputLabelProps={{ style: { color: isDarkMode ? '#fff' : undefined } }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#646cff' }}
        >
          {loading ? (
            <img src={Loader} alt="Загрузка..." style={{ height: 24 }} />
          ) : (
            'Войти'
          )}
        </Button>

        {error && (
          <Typography color="error" align="center" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </form>

      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Нет аккаунта?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={onSwitchToRegister}
            underline="hover"
            sx={{ color: '#646cff' }}
          >
            Зарегистрироваться
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
}

export default LoginForm;