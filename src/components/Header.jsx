import React from 'react';
import { useTheme } from '../context/ThemeContext';
import UserProfile from './UserProfile';

function Header({ userData, onLogout }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header style={{
      backgroundColor: isDarkMode ? '#333' : '#f8f9fa',
      padding: '1rem',
      borderBottom: `1px solid ${isDarkMode ? '#555' : '#e7e7e7'}`,
      color: isDarkMode ? '#fff' : '#213547',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Лабораторные работы</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {userData && <UserProfile userData={userData} onLogout={onLogout} />}
        <button 
          onClick={toggleTheme}
          style={{
            backgroundColor: isDarkMode ? '#444' : '#e9ecef',
            color: isDarkMode ? '#fff' : '#213547',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>
    </header>
  );
}

export default Header; 