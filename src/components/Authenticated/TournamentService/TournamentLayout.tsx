import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import AvatarMenu from 'components/Common/Layout/AuthenticatedLayout/AvatarMenu';
import Footer from 'components/Common/Layout/Footer';
import LinkButton from 'components/Common/LinkButton';
import Logo from 'components/Common/Logo';

const AdvertisementLayout = () => {
  const theme = useTheme();

  return (
    <Box>
      <AppBar
        position="sticky"
        sx={{
          height: theme.layout.headerHeight,
          backgroundColor: 'white',
        }}
      >
        <Toolbar disableGutters>
          <Container
            maxWidth="lg"
            sx={{ height: '100%', display: 'flex', alignItems: 'center', columnGap: '10px' }}
          >
            <Logo sx={{ height: '70%' }} />
            <Box sx={{ flex: 1 }} />
            <Box sx={{ display: 'flex', columnGap: '5px' }}>
              <LinkButton to="/affiliates/manage-advertisements">Manage Advertisements</LinkButton>
            </Box>
            <Box>
              <AvatarMenu />
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="lg"
        component="main"
        sx={{
          minHeight: `calc(100dvh - 10px - ${theme.layout.headerHeight})`,
          height: 'auto',
        }}
      >
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
};

export default AdvertisementLayout;
