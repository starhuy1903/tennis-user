import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store';

import Logo from 'assets/images/app-logo.png';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const navItems = ['Home', 'Pricing', 'News', 'About', 'Contact'];

export default function Header() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return (
    <AppBar
      position="static"
      sx={{ background: 'transparent', boxShadow: 'none' }}
    >
      <Container maxWidth={false}>
        <Toolbar
          disableGutters
          sx={{ justifyContent: 'space-between' }}
        >
          <Box
            display="flex"
            flexDirection="row"
            gap={2}
            alignItems="center"
          >
            <Link to="/">
              <img
                src={Logo}
                alt="app-logo"
                width={80}
                height={80}
              />
            </Link>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            gap={25}
            alignItems="center"
          >
            <Box
              display="flex"
              alignItems="center"
              gap={6}
            >
              {navItems.map((navItem, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={`/${navItem.toLowerCase()}`}
                  size="large"
                  sx={{
                    fontSize: '1rem',
                  }}
                >
                  {navItem}
                </Button>
              ))}

              {!isLoggedIn && (
                <>
                  <Button
                    component={Link}
                    to={`/login`}
                    size="large"
                    sx={{
                      fontSize: '1rem',
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    component={Link}
                    to={`/signup`}
                    size="large"
                    color="primary"
                    variant="contained"
                    sx={{
                      fontSize: '1rem',
                    }}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </Box>
            {isLoggedIn && (
              <>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, ml: 2 }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
