import React, {FC, useState} from 'react';
import ThemeContext from './ThemeContext.tsx';

interface Props {
  children: React.ReactNode;
}

const NoteState: FC<Props> = ({children}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      return;
    }
    setTheme('light');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default NoteState;
