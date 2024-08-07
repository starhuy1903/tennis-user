import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import EqualizerIcon from '@mui/icons-material/Equalizer';
import FeedIcon from '@mui/icons-material/Feed';
// import PaidIcon from '@mui/icons-material/Paid';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StyleIcon from '@mui/icons-material/Style';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Logo from 'components/Common/Logo';

import NavGroupWrapper from './NavGroupItem';
import NavItem from './NavItem';

type SidebarProps = {
  open: boolean;
  handleOnClose: () => void;
};

function Sidebar({ open, handleOnClose }: SidebarProps) {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box component="nav">
      <Drawer
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={open}
        onClose={handleOnClose}
        PaperProps={{
          sx: {
            width: theme.layout.drawerWidth,
            top: matchUpMd ? theme.layout.headerHeight : 0,
            border: 0,
          },
        }}
      >
        <Box
          sx={{
            height: theme.layout.headerHeight,
            display: {
              xs: 'flex',
              md: 'none',
            },
            alignItems: 'center',
            flexShrink: 0,
            paddingLeft: {
              xs: '16px',
              sm: '24px',
            },
          }}
        >
          <Logo sx={{ height: '60px' }} />
        </Box>
        <PerfectScrollbar
          style={{
            height: `calc(100dvh - ${theme.layout.headerHeight})`,
            padding: '0 16px',
          }}
          options={{ swipeEasing: true }}
        >
          <NavGroupWrapper>
            <NavItem
              title="Dashboard"
              icon={<DashboardIcon />}
              href="/"
            />
          </NavGroupWrapper>
          <NavGroupWrapper title="Revenue Management">
            {/* <NavItem
              title="Statistics"
              icon={<EqualizerIcon />}
              href="/revenue-statistics"
            /> */}
            <NavItem
              title="Orders"
              icon={<ShoppingCartIcon />}
              href="/orders"
            />
            {/* <NavItem
              title="Service Usages"
              icon={<PaidIcon />}
              href="/service-usages"
            /> */}
          </NavGroupWrapper>
          <NavGroupWrapper title="Advertisement Management">
            <NavItem
              title="Pending"
              icon={<PendingActionsIcon />}
              href="/pending-advertisements"
            />
            <NavItem
              title="Advertisements"
              icon={<PermMediaIcon />}
              href="/advertisements"
            />
          </NavGroupWrapper>
          <NavGroupWrapper title="System Management">
            <NavItem
              title="Services"
              icon={<CategoryIcon />}
              href="/services"
            />
            <NavItem
              title="Packages"
              icon={<StyleIcon />}
              href="/packages"
            />
            <NavItem
              title="News"
              icon={<FeedIcon />}
              href="/news"
            />
            <NavItem
              title="Users"
              icon={<PersonIcon />}
              href="/users"
            />
          </NavGroupWrapper>
        </PerfectScrollbar>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
