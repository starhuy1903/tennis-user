import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import LinkButton from 'components/Common/LinkButton';
import Logo from 'components/Common/Logo';
import { ScrollbarStyle } from 'utils/style';

import Footer from '../Footer';
import AvatarMenu from './AvatarMenu';
import MessageMenu from './MessageMenu';
import NotificationMenu from './NotificationMenu';

const AuthenticatedLayout = () => {
  const theme = useTheme();

  return (
    <Box>
      <AppBar
        position="static"
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
            <Logo sx={{ height: '100%' }} />
            <Box sx={{ flex: 1 }} />
            <Box sx={{ display: 'flex', columnGap: '5px' }}>
              <LinkButton to="/">Home</LinkButton>
              <LinkButton to="/pricing">Pricing</LinkButton>
              <LinkButton to="/news">News</LinkButton>
              <LinkButton to="/about">About</LinkButton>
              <LinkButton to="/contact">Contact</LinkButton>
              <NotificationMenu />
              <MessageMenu />
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
          scrollbarGutter: 'stable',
          ...ScrollbarStyle,
        }}
      >
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
};

export default AuthenticatedLayout;
