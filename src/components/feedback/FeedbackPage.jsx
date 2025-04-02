import React, { useState, useCallback } from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import { useTheme } from '../../context/ThemeContext';

function FeedbackPage() {
  const { isDarkMode } = useTheme();
  const [feedbacks, setFeedbacks] = useState(() => {
    const savedFeedbacks = localStorage.getItem('feedbacks');
    return savedFeedbacks ? JSON.parse(savedFeedbacks) : [];
  });

  const handleSubmitFeedback = useCallback((newFeedback) => {
    setFeedbacks(prevFeedbacks => {
      const updatedFeedbacks = [newFeedback, ...prevFeedbacks];
      localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
      return updatedFeedbacks;
    });
  }, []);

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <h2 style={{ 
        textAlign: 'center',
        color: isDarkMode ? '#fff' : '#213547',
        marginBottom: '30px'
      }}>
        Обратная связь
      </h2>
      <FeedbackForm onSubmit={handleSubmitFeedback} />
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
}

export default FeedbackPage; 