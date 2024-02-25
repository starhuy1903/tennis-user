import { useTheme } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';

function CustomToaster() {
  const theme = useTheme();

  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        success: {
          duration: 3000,
          style: {
            color: theme.palette.common.white,
            background: theme.palette.success.main,
          },
          iconTheme: {
            primary: theme.palette.common.white,
            secondary: theme.palette.success.main,
          },
        },
        error: {
          duration: 5000,
          style: {
            color: theme.palette.common.white,
            background: theme.palette.error.main,
          },
          iconTheme: {
            primary: theme.palette.common.white,
            secondary: theme.palette.error.main,
          },
        },
      }}
    />
  );
}

export default CustomToaster;
