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
  palette: {
    primary: {
      main: '#7F56D9',
      light: '#EDE7F6',
    },
    background: {
      paper: '#F4F4F4',
      default: '#F7F9F9',
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
