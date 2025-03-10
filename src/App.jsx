import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Content from './components/Content';
import './App.css';

function App() {
  const [selectedLab, setSelectedLab] = useState(1);

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Menu selectedLab={selectedLab} onLabSelect={setSelectedLab} />
        <Content labId={selectedLab} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
