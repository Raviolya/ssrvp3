import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Content from './components/Content';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { ThemeProvider } from './context/ThemeContext';
import { useDispatch ,useSelector} from 'react-redux';
import { useLoginState } from './hooks/useLoginState';
import './App.css';
import { checkSessionAsync, fetchProfile } from './actions/Requests';
import Loader from './assets/svg/loadingCircle.svg';
function App() {
  const [showLogin, setShowLogin] = useState(true);

  const dispatch = useDispatch();
  const { isAuthenticated, loading, error} = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(checkSessionAsync());
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleLogin = (userData) => {
    login(userData);
  };

  const handleRegister = (userData) => {
    login(userData);
  };

  if (!isAuthenticated) {
    return (
        <ThemeProvider>
          <Router>
          <div className="auth-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            {showLogin ? (
              <LoginForm 
                onLogin={handleLogin}
                onSwitchToRegister={() => setShowLogin(false)}
              />
            ) : (
              <RegisterForm
                onRegister={handleRegister}
                onSwitchToLogin={() => setShowLogin(true)}
              />
            )}
          </div>
          </Router>
        </ThemeProvider>
    );
  }

  return (
      <ThemeProvider>
        <Router>
          <div className="app-container">
            <Header />
            <div className="main-content">
              <Menu />
              <Content />
            </div>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
  );
}

export default App;
