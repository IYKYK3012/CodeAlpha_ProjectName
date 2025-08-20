import React, { useState } from 'react';
import Navbar from './components/navbar';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mood, setMood] = useState('');

  const getThemeClass = () => {
    return `${darkMode ? 'dark-mode' : 'light-mode'} ${mood}`;
  };

  return (
    <div className={`app-container ${getThemeClass()}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} mood={mood} setMood={setMood} />
      <div className="page-content">
        {/* Your content */}
        <h2>Geetanjali Vishwakarma</h2>
      </div>
    </div>
  );
}

export default App;
