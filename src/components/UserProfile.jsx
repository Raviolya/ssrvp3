import React from 'react';
import { useTheme } from '../context/ThemeContext';

function UserProfile({ userData, onLogout }) {
  const { isDarkMode } = useTheme();

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '60px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <span style={{
        color: isDarkMode ? '#fff' : '#213547'
      }}>
        {userData.name}
      </span>
      <button
        onClick={onLogout}
        style={{
          padding: '5px 10px',
          backgroundColor: isDarkMode ? '#444' : '#e9ecef',
          color: isDarkMode ? '#fff' : '#213547',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Выйти
      </button>
    </div>
  );
}

export default UserProfile; 