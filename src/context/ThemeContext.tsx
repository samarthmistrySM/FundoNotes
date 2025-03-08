import { createContext } from 'react';

export interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const defaultValue: ThemeContextType = {
    theme: 'light',
    toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultValue);

export default ThemeContext;
