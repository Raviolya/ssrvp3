import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Menu() {
  const { isDarkMode } = useTheme();
  const labWorks = [
    { id: 1, title: 'Лабораторная работа №1' },
    { id: 2, title: 'Лабораторная работа №2' },
    { id: 3, title: 'Лабораторная работа №3' },
  ];

  return (
    <nav style={{
      width: '250px',
      padding: '1rem',
      backgroundColor: isDarkMode ? '#333' : '#f8f9fa',
      borderRight: `1px solid ${isDarkMode ? '#555' : '#e7e7e7'}`,
      height: 'calc(100vh - 140px)'
    }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {labWorks.map(lab => (
          <li key={lab.id} style={{ marginBottom: '0.5rem' }}>
            <NavLink 
              to={`/lab${lab.id}`}
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isDarkMode ? '#fff' : '#333',
                padding: '0.5rem',
                display: 'block',
                borderRadius: '4px',
                backgroundColor: isActive ? (isDarkMode ? '#444' : '#e9ecef') : 'transparent'
              })}
            >
              {lab.title}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink 
            to="/counter"
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isDarkMode ? '#fff' : '#333',
              padding: '0.5rem',
              display: 'block',
              borderRadius: '4px',
              backgroundColor: isActive ? (isDarkMode ? '#444' : '#e9ecef') : 'transparent'
            })}
          >
            Counter Demo
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/feedback"
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isDarkMode ? '#fff' : '#333',
              padding: '0.5rem',
              display: 'block',
              borderRadius: '4px',
              backgroundColor: isActive ? (isDarkMode ? '#444' : '#e9ecef') : 'transparent'
            })}
          >
            Обратная связь
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu; 