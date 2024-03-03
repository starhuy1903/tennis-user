import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        size="large"
        sx={{ 'borderRadius': '10px', '.MuiTouchRipple-child': { borderRadius: '10px !important' } }}
        onClick={handleOpenMenu}
      >
        <NotificationsIcon color={anchorEl ? 'primary' : 'inherit'} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!anchorEl}
        onClose={handleCloseMenu}
      >
        <MenuList
          disablePadding
          sx={{ minWidth: '150px' }}
        >
          <MenuItem>
            <ListItemText>
              <Typography>Notification 1</Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>
              <Typography>Notification 2</Typography>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default NotificationMenu;
