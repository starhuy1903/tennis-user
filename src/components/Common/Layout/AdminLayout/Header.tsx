import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Logo from 'components/Common/Logo';

import AvatarMenu from './AvatarMenu';
import CustomIconButton from './CustomIconButton';

type HeaderProps = {
  onSidebarToggle: () => void;
};

function Header({ onSidebarToggle }: HeaderProps) {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: theme.layout.headerHeight,
        justifyContent: 'center',
        backgroundColor: theme.palette.common.white,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: {
              xs: `calc(${theme.layout.drawerWidth} - 16px)`,
              sm: `calc(${theme.layout.drawerWidth} - 24px)`,
            },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Logo sx={{ height: '50px', display: { xs: 'none', md: 'block' } }} />
          <CustomIconButton
            className="h-fit"
            onClick={onSidebarToggle}
          >
            <MenuIcon />
          </CustomIconButton>
        </Box>
        <Box sx={{ flex: 1 }} />
        <AvatarMenu />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
