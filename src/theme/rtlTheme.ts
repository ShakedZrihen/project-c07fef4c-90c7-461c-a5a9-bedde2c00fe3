import { createTheme } from '@mui/material/styles';

const rtlTheme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: {
      main: '#00BFA5',
      light: '#5df2d6',
      dark: '#008e76',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF6B35',
      light: '#ff9d64',
      dark: '#c53a00',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f1fffa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2b2d42',
      secondary: '#5a5d75',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    success: {
      main: '#10b981',
    },
    info: {
      main: '#3b82f6',
    },
    divider: 'rgba(43, 45, 66, 0.12)',
  },
  typography: {
    fontFamily: '"Heebo", "Rubik", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.125rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 191, 165, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(43, 45, 66, 0.12)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(43, 45, 66, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(43, 45, 66, 0.35)',
            },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.95rem',
          minWidth: 100,
        },
      },
    },
  },
});

export default rtlTheme;
