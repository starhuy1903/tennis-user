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
      default: '#F4F4F4',
    },
    text: {
      primary: '#333333',
      secondary: '#828282',
    },
  },
  layout: {
    headerHeight: '80px',
    drawerWidth: '260px',
  },
});

export { defaultTheme };
