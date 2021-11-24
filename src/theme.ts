import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#89d7da',
      light: '#eaea42',
      dark: '#ffffff',
      contrastText: '#13273d',
    },
    secondary: {
      main: '#c50b7d',
    },
    background: {
      default: '#13273d',
      paper: '#043346'
    },
    text: {
      disabled: 'rgba(255,255,255,0.5)',
      primary: '#ffffff',
      secondary: '#ffffff',
    }
  },
  components: {
    // Name of the component
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
  },
  shape: {
    borderRadius: 5
  }
});

export default theme