// ThemeContext.js

import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('claro'); // Defina o tema inicial como 'claro'

  const toggleTheme = () => {
    setTheme(theme === 'claro' ? 'escuro' : 'claro');
  };

  const logout = () => {
    // Implemente a lógica de logout aqui
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, logout }}>
      {children}
    </ThemeContext.Provider>
  );
};
