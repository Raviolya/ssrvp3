import React from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../context/ThemeContext';
import { createFeedbackAsync } from '../../actions/Requests';
import { useDispatch } from 'react-redux';
function FeedbackForm() {
  const { isDarkMode } = useTheme();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => { 
      try {
        await dispatch(createFeedbackAsync({email : data.email, message: data.message, rating: data.rating, date: new Date().toLocaleString() + ''})).unwrap();
        reset();
      } catch (error) {
        console.error("Ошибка при отправке:", error);
      }
  };
  

  return (
    <div style={{
      backgroundColor: isDarkMode ? '#333' : '#fff',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h3>Оставить отзыв</h3>
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
            placeholder="Ваш email"
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
          <textarea
            {...register('message', { 
              required: 'Сообщение обязательно',
              minLength: {
                value: 10,
                message: 'Сообщение должно содержать минимум 10 символов'
              }
            })}
            placeholder="Ваш отзыв"
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '5px',
              backgroundColor: isDarkMode ? '#444' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
              border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
              minHeight: '100px',
              resize: 'vertical'
            }}
          />
          {errors.message && <span style={{ color: 'red' }}>{errors.message.message}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <select
            {...register('rating', { required: 'Выберите оценку' })}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '5px',
              backgroundColor: isDarkMode ? '#444' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
              border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`
            }}
          >
            <option value="">Выберите оценку</option>
            <option value="5">Отлично</option>
            <option value="4">Хорошо</option>
            <option value="3">Удовлетворительно</option>
            <option value="2">Плохо</option>
            <option value="1">Очень плохо</option>
          </select>
          {errors.rating && <span style={{ color: 'red' }}>{errors.rating.message}</span>}
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
          Отправить отзыв
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm; 