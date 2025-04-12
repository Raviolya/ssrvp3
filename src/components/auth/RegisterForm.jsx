import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../context/ThemeContext';
import { createAccountAsync } from '../../actions/Requests';
import { useDispatch, useSelector } from 'react-redux';


function RegisterForm({ onSwitchToLogin }) {
  const { isDarkMode } = useTheme();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');
  const { user } = useSelector((state) => state.feedback);

  const dispatch = useDispatch();

  const onSubmit = useCallback((data) => {
    dispatch(createAccountAsync({ name: data.name, email: data.email, password: data.password }));
  }, [dispatch]);

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}>
          <input
            {...register('name', { 
              required: 'Имя обязательно',
              minLength: {
                value: 5,
                message: 'Логин должен содержать минимум 2 символа'
              }
            })}
            placeholder="Логин"
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '5px',
              backgroundColor: isDarkMode ? '#444' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
              border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`
            }}
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            {...register('email', { 
              required: 'Email обязателен',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат email'
              }
            })}
            placeholder="Email"
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '5px',
              backgroundColor: isDarkMode ? '#444' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
              border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`
            }}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            {...register('password', { 
              required: 'Пароль обязателен',
              minLength: {
                value: 5,
                message: 'Минимальная длина пароля 5 символов'
              }
            })}
            placeholder="Пароль"
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '5px',
              backgroundColor: isDarkMode ? '#444' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
              border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`
            }}
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            {...register('confirmPassword', { 
              required: 'Подтвердите пароль',
              validate: value => value === password || 'Пароли не совпадают'
            })}
            placeholder="Подтвердите пароль"
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '5px',
              backgroundColor: isDarkMode ? '#444' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
              border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`
            }}
          />
          {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword.message}</span>}
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#646cff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Зарегистрироваться
        </button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Уже есть аккаунт?{' '}
        <button
          onClick={onSwitchToLogin}
          style={{
            background: 'none',
            border: 'none',
            color: '#646cff',
            cursor: 'pointer',
            padding: '0',
            textDecoration: 'underline'
          }}
        >
          Войти
        </button>
      </p>
      {user?.success && <span style={{ color: 'green' }}>{user.message}</span>}
    </div>
  );
}

export default RegisterForm; 