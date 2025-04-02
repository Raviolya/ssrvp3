import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Content from './components/Content';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import store from './store';
import { useLoginState } from './hooks/useLoginState';
import './App.css';

function App() {
  const { isLoggedIn, login, logout, getUserData } = useLoginState();
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (userData) => {
    login(userData);
  };

  const handleRegister = (userData) => {
    login(userData);
  };

  if (!isLoggedIn) {
    return (
      <ThemeProvider>
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
      </ThemeProvider>
    );
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="app-container">
            <Header userData={getUserData()} onLogout={logout} />
            <div className="main-content">
              <Menu />
              <Content />
            </div>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
