import React, { createContext, useContext, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from '../hooks/use-color-scheme';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isManual: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const deviceTheme = useDeviceColorScheme();
  const [manualTheme, setManualTheme] = useState<Theme | null>(null);
  
  const theme = manualTheme || deviceTheme || 'light';
  const isManual = manualTheme !== null;

  const toggleTheme = () => {
    setManualTheme(current => {
      if (current === null) {
        // Si no hay tema manual, empezar con el opuesto al del dispositivo
        return deviceTheme === 'dark' ? 'light' : 'dark';
      }
      // Alternar entre light y dark
      return current === 'dark' ? 'light' : 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isManual }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
}

