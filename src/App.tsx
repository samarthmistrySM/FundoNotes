import React from 'react';
import NoteState from './context/NoteState';
import ThemeState from './context/ThemeState.tsx';
import Navigator from './navigation/Navigator.tsx';
import AuthState from "./context/AuthState.tsx";

const App = () => {
  return (
    <AuthState>
      <NoteState>
        <ThemeState>
          <Navigator />
        </ThemeState>
      </NoteState>
    </AuthState>
  );
};

export default App;
