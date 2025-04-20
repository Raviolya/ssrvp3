import React from 'react';
import {
  Drawer, List, ListItem, ListItemText, ListItemButton,
  useTheme, useMediaQuery, Divider, Box, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import { useTheme as useCustomTheme } from '../context/ThemeContext';

const mainLinks = [
  { path: '/', label: 'Главная' },
  { path: '/about', label: 'О себе' },
  { path: '/counter', label: 'Counter Demo' },
];

const labItems = [
  { path: '/lab1', label: 'Лабораторная работа №1' },
  { path: '/lab2', label: 'Лабораторная работа №2' },
  { path: '/lab3', label: 'Лабораторная работа №3' },
  { path: '/counter', label: 'Лабораторная работа №4' },
];

function DrawerMenu({ open, onClose }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:700px)');
  const { isDarkMode, toggleTheme } = useCustomTheme();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{
        keepMounted: true,
        BackdropProps: {
          sx: { backgroundColor: 'transparent' },
        },
      }}
      PaperProps={{
        sx: {
          width: 250,
          top: 73,
          height: 'calc(100vh - 73px)',
          backgroundColor: isDarkMode ? '#2c2c2c' : '#f8f9fa',
          color: isDarkMode ? '#fff' : '#000',
          boxShadow: theme.shadows[1],
          position: 'fixed',
          left: 0,
        },
      }}
    >
      {isMobile ? (
        <List>
          {mainLinks.map(({ path, label }) => (
            <ListItem key={path} disablePadding>
              <ListItemButton onClick={() => handleNavigate(path)}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ my: 1, backgroundColor: isDarkMode ? '#444' : undefined }} />

          {labItems.map(({ path, label }) => (
            <ListItem key={path} disablePadding>
              <ListItemButton onClick={() => handleNavigate(path)}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ my: 2, backgroundColor: isDarkMode ? '#444' : undefined }} />

          <Box sx={{ px: 2 }}>
            <UserProfile />
            <Button
              onClick={toggleTheme}
              variant="outlined"
              fullWidth
              sx={{
                mt: 5,
                color: isDarkMode ? '#fff' : undefined,
                borderColor: isDarkMode ? '#888' : undefined,
                '&:hover': {
                  borderColor: isDarkMode ? '#aaa' : undefined,
                },
              }}
            >
              {isDarkMode ? '🌞 Светлая тема' : '🌙 Тёмная тема'}
            </Button>
          </Box>
        </List>
      ) : (
        <List>
          {labItems.map(({ path, label }) => (
            <ListItem key={path} disablePadding>
              <ListItemButton onClick={() => handleNavigate(path)}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Drawer>
  );
}

export default DrawerMenu;