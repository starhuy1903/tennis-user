import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    layout: {
      headerHeight: string;
      drawerWidth: string;
    };
  }
  interface ThemeOptions {
    layout?: {
      headerHeight?: string;
      drawerWidth?: string;
    };
  }
}

const defaultTheme = createTheme({
  typography: {
    h1: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h2: {
      fontSize: '1.2rem',
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: '#7F56D9',
      light: '#EDE7F6',
    },
    background: {
      paper: '#F4F4F4',
      default: '#F7F7F7',
    },
    text: {
      primary: '#333333',
      secondary: '#828282',
    },
  },
  layout: {
    headerHeight: '70px',
    drawerWidth: '260px',
  },
});

export { defaultTheme };
