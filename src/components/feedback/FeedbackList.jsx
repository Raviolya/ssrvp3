import { useTheme } from '../../context/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchFeedback,deleteFeedbackAsync } from '../../actions/Requests';
function FeedbackList() {
  const { isDarkMode } = useTheme();

  const {feedbacks} = useSelector((state) => state.feedback);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const onDelete = async (id) => { 
      try {
        await dispatch(deleteFeedbackAsync(id)).unwrap();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
  };

  return (
    <div>
      <h3>Отзывы</h3>
      {feedbacks.length === 0 ? (
        <p style={{ textAlign: 'center', color: isDarkMode ? '#888' : '#666' }}>
          Пока нет отзывов
        </p>
      ) : (
        feedbacks.map(feedback => (
          <div
            key={feedback.id}
            style={{
              backgroundColor: isDarkMode ? '#333' : '#f8f9fa',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <strong style={{ color: isDarkMode ? '#fff' : '#000' }}>
                {feedback.name}
              </strong>    
              <span style={{ color: isDarkMode ? '#888' : '#666' }}>
                {feedback.date}
              </span>
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'left'}}>
              {feedback.message}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: isDarkMode ? '#888' : '#666'
            }}>
              <span>Оценка:</span>
              <span style={{ color: '#646cff' }}>
                {'★'.repeat(Number(feedback.score))}
                {'☆'.repeat(5 - Number(feedback.score))}
              </span>
              <button onClick={() => onDelete(feedback.id)} style={{}}>удалить</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FeedbackList; 