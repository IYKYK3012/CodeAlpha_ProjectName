import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './navbar.css';
import emojiList from '../utils/emojiList';

const Navbar = ({ darkMode, setDarkMode, mood, setMood }) => {
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleMoodClick = (moodClass) => {
    setMood(moodClass);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo">MoodDo</h1>
      </div>

      <div className="nav-center mood-emojis">
        {emojiList.map((item, index) => (
          <span
            key={index}
            title={item.label}
            onClick={() => handleMoodClick(item.colorClass)}
            className="emoji"
          >
            {item.emoji}
          </span>
        ))}
      </div>

      <div className="nav-right">
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
