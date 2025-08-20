import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState('#8A2BE2');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const moodColors = {
    happy: '#FFD700',
    productive: '#4CAF50',
    calm: '#87CEEB',
    stressed: '#FF6347',
    tired: '#708090',
  };

  const updateTheme = (mood) => {
    setThemeColor(moodColors[mood] || '#8A2BE2');
    addMoodToHistory(mood);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const [moodHistory, setMoodHistory] = useState([]);

  const addMoodToHistory = (mood) => {
    const today = new Date().toISOString().split('T')[0];
    setMoodHistory(prev => {
      const updated = prev.filter(m => m.date !== today);
      return [...updated, { date: today, mood }];
    });
  };

  return (
    <ThemeContext.Provider value={{
      themeColor, updateTheme, isDarkMode, toggleDarkMode, moodHistory
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
