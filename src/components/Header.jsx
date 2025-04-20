import React from 'react';
import { useTheme as useMuiTheme, useMediaQuery, IconButton, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import UserProfile from './UserProfile';

function Header({ onMenuClick }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery('(max-width:700px)'); // <= 700px

  return (
    <header style={{
      backgroundColor: isDarkMode ? '#333' : '#f8f9fa',
      padding: '1rem',
      borderBottom: `1px solid ${isDarkMode ? '#555' : '#e7e7e7'}`,
      color: isDarkMode ? '#fff' : '#213547',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      width: '100%',
    }}>
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ display: { sm: 'inline-flex' } }}
        >
          <MenuIcon />
        </IconButton>

        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Лабораторные работы</h1>
      </Box>

      {/* Эти элементы отображаются ТОЛЬКО на экранах >700px */}
      {!isMobile && (
        <Box display="flex" alignItems="center" gap={2} flex={1} ml={2}>
          <Link to="/" style={{ textDecoration: 'none', color: isDarkMode ? '#ccc' : '#007bff' }}>
            Главная
          </Link>
          <Link to="/about" style={{ textDecoration: 'none', color: isDarkMode ? '#ccc' : '#007bff' }}>
            О себе
          </Link>

          <UserProfile />
          <Button
            onClick={toggleTheme}
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
          >
            {isDarkMode ? '🌞' : '🌙'}
          </Button>
        </Box>
      )}
    </header>
  );
}

export default Header;