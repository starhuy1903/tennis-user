import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { Link, Outlet } from 'react-router-dom';

import LinkButton from 'components/Common/LinkButton';
import Logo from 'components/Common/Logo';

import Footer from '../Footer';

const UnauthenticatedLayout = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        overflowX: 'hidden',
      }}
    >
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
              <LinkButton to="/">Home</LinkButton>
              <LinkButton to="/pricing">Pricing</LinkButton>
              <LinkButton to="/news">News</LinkButton>
              <LinkButton to="/about">About</LinkButton>
              <LinkButton to="/contact">Contact</LinkButton>
              <LinkButton to="/login">Log in</LinkButton>
              <Button
                component={Link}
                to="/signup"
                size="large"
                color="primary"
                variant="contained"
                sx={{
                  marginLeft: 2,
                }}
              >
                Sign up
              </Button>
            </Box>
            <Box></Box>
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

export default UnauthenticatedLayout;
