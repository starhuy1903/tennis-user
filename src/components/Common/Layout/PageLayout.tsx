import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './Header';

function PageLayout() {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
}
export default PageLayout;
