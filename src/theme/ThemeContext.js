import React, { createContext, useContext, useState } from 'react';
import { buildTheme } from './colors';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);
  const [accent, setAccent] = useState('lavender');
  const T = buildTheme(dark, accent);

  return (
    <ThemeContext.Provider value={{ T, dark, accent, setDark, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
