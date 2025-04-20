import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../actions/Requests';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Link as MuiLink
} from '@mui/material';

function UserProfile() {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.feedback);

  const onLogout = async () => {
    try {
      await dispatch(Logout()).unwrap();
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        right: '60px',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mr: 2
      }}
    >
      <MuiLink
        component={NavLink}
        to="/profile"
        underline="hover"
        sx={{
          color: isDarkMode ? '#fff' : '#213547',
          fontWeight: 500
        }}
      >
        {profile ? (
          <Typography variant="body1">{profile.username}</Typography>
        ) : (
          <CircularProgress size={20} />
        )}
      </MuiLink>

      <Button
        onClick={onLogout}
        variant="contained"
        size="small"
        sx={{
          backgroundColor: isDarkMode ? '#444' : '#e9ecef',
          color: isDarkMode ? '#fff' : '#213547',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: isDarkMode ? '#555' : '#dcdcdc',
          }
        }}
      >
        Выйти
      </Button>
    </Box>
  );
}

export default UserProfile;