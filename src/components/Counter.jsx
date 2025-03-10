import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store/counterSlice';
import { useTheme } from '../context/ThemeContext';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  return (
    <div>
      <h2>Redux Counter Demo</h2>
      <div style={{ margin: '20px' }}>
        <button 
          onClick={() => dispatch(decrement())}
          style={{
            backgroundColor: isDarkMode ? '#333' : '#f9f9f9',
            color: isDarkMode ? '#fff' : '#213547'
          }}
        >
          -
        </button>
        <span style={{ margin: '0 20px' }}>{count}</span>
        <button 
          onClick={() => dispatch(increment())}
          style={{
            backgroundColor: isDarkMode ? '#333' : '#f9f9f9',
            color: isDarkMode ? '#fff' : '#213547'
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter; 