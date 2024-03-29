import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import AvatarMenu from 'components/Common/Layout/AuthenticatedLayout/AvatarMenu';
import MessageMenu from 'components/Common/Layout/AuthenticatedLayout/MessageMenu';
import NotificationMenu from 'components/Common/Layout/AuthenticatedLayout/NotificationMenu';
import LinkButton from 'components/Common/LinkButton';
import Logo from 'components/Common/Logo';
import { setActions } from 'store/slice/userSlice';
import { ScrollbarStyle } from 'utils/style';

const TournamentLayout = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  // const [initialized, setInitialized] = useState(false);

  // const packages = useAppSelector((state) => state.user.packages);

  // const validPackages = useMemo(() => packages?.filter((servicePackage) => !servicePackage.hasExpired), [packages]);

  // useEffect(() => {
  //   const unusedPackages = validPackages?.filter((servicePackage) => {
  //     return servicePackage.services.find(
  //       (service) => service.type === ServiceType.TOURNAMENT && service.used < service.maxTournaments
  //     );
  //   });
  //   dispatch(setActions({ canCreateTournament: !!unusedPackages?.length }));
  //   setInitialized(true);
  // }, [validPackages, dispatch]);

  // if (!initialized) return <CenterLoading />;

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          height: theme.layout.headerHeight,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Toolbar disableGutters>
          <Container
            maxWidth="xl"
            sx={{ height: '100%', display: 'flex', alignItems: 'center', columnGap: '10px' }}
          >
            <Logo sx={{ height: '100%' }} />
            <Box sx={{ flex: 1 }} />
            <Box sx={{ display: 'flex', columnGap: '5px' }}>
              {/* <LinkButton to="feeds">Feeds</LinkButton>
              <LinkButton to="tournaments">Tournaments</LinkButton>
              <LinkButton to="/news">News</LinkButton>
              <LinkButton to="/about">About</LinkButton>
              <LinkButton to="/contact">Contact</LinkButton> */}
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
        maxWidth="xl"
        component="main"
        sx={{
          height: `calc(100dvh - 10px - ${theme.layout.headerHeight})`,
          marginTop: '10px',
          overflow: 'auto',
          scrollbarGutter: 'stable',
          ...ScrollbarStyle,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default TournamentLayout;
