import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Sidebar from './SideBar';

function AdminLayout() {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const [sidebarOpen, setSidebarOpen] = useState(matchUpMd);

  return (
    <PerfectScrollbar
      style={{
        height: `100dvh`,
        padding: '0 16px',
      }}
    >
      <Box
        sx={{
          'display': 'flex',
          '~ .ps__rail-y': { zIndex: theme.zIndex.appBar + 10 },
        }}
      >
        <Header onSidebarToggle={() => setSidebarOpen((open) => !open)} />
        <Sidebar
          open={sidebarOpen}
          handleOnClose={() => setSidebarOpen(false)}
        />

        <Main sidebarOpen={sidebarOpen}>
          <Outlet />
        </Main>
      </Box>
    </PerfectScrollbar>
  );
}

export default AdminLayout;
