// Font from MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import CustomToaster from 'components/Common/CustomToaster';
import GlobalLoading from 'components/Common/GlobalLoading';
import { ModalContainer } from 'components/Common/Modal';
import { defaultTheme } from 'constants/themes';

import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <CustomToaster />
        <ModalContainer />
        <GlobalLoading />
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
