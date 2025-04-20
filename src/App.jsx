import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { checkSessionAsync, fetchProfile } from './actions/Requests';
import {
  Box,
  Container,
  CssBaseline,
  GlobalStyles,
} from '@mui/material';
import DrawerMenu from './components/DrawerMenu';
import { useTheme } from './context/ThemeContext';



function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.feedback);
  const drawerWidth = 240;

  const { isDarkMode } = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    dispatch(checkSessionAsync());
    dispatch(fetchProfile());
  }, [dispatch]);

  if (!isAuthenticated) {
    return (
        <Router>
          <CssBaseline />
          <GlobalStyles
            styles={{
              body: {
                backgroundColor: isDarkMode ? '#242424' : '#ffffff',
                color: isDarkMode ? '#ffffff' : '#000000',
                transition: 'background-color 0.3s ease, color 0.3s ease',
              },
            }}
          />
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            {showLogin ? (
              <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
            )}
          </Box>
        </Router>
    );
  }

  return (
      <Router>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: isDarkMode ? '#242424' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#000000',
              transition: 'background-color 0.3s ease, color 0.3s ease',
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            overflowX: 'hidden',
          }}
        >
          <Header onMenuClick={handleDrawerToggle} />

          <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>
            <DrawerMenu
              open={mobileOpen}
              onClose={handleDrawerToggle}
              containerWidth={drawerWidth}
            />

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                px: { xs: 1, sm: 2 },
                py: 2,
                width: '100%',
              }}
            >
              <Container maxWidth="xl" disableGutters>
                <Content drawerWidth={drawerWidth} />
              </Container>
            </Box>
          </Box>

          <Footer />
        </Box>
      </Router>
  );
}

export default App;