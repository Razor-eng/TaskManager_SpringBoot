import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import TaskList from './components/TaskList';
import ErrorBoundary from './components/ErrorBoundary';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <AuthProvider>
          <div className="App">
            <AuthenticatedApp />
          </div>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

function AuthenticatedApp() {
  const { user } = useAuth();

  return user ? <TaskList /> : <Login />;
}

export default App;

