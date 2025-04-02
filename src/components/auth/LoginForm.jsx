import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../context/ThemeContext';

function LoginForm({ onLogin, onSwitchToRegister }) {
  const { isDarkMode } = useTheme();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = useCallback((data) => {
    if (data.email === 'admin@example.com' && data.password === 'admin') {
      onLogin({ email: data.email, name: 'Администратор' });
    } else {
      alert('Неверные учетные данные');
    }
  }, [onLogin]);

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2>Вход в систему</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Войти
        </button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Нет аккаунта?{' '}
        <button
          onClick={onSwitchToRegister}
          style={{
            background: 'none',
            border: 'none',
            color: '#646cff',
            cursor: 'pointer',
            padding: '0',
            textDecoration: 'underline'
          }}
        >
          Зарегистрироваться
        </button>
      </p>
    </div>
  );
}

export default LoginForm; 