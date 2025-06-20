import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFB959', 
      contrastText: '#0D0D0D', 
    },
    secondary: {
      main: '#0D0D0D', 
      contrastText: '#FAFFFD',  
    },
    background: {
      default: '#FAFFFD',  
    },
    text: {
      primary: '#0D0D0D',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: `'Outfit', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif`,
  },
  shape: {
    borderRadius: 8, 
  },
});

export default theme;
