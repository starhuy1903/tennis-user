import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import { useState } from 'react';

import { useGetSystemNotificationQuery } from 'store/api/commonApiSlice';

import NotificationItem from './Notification/NotificationItem';

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { data: notiData } = useGetSystemNotificationQuery();

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
          sx={{ minWidth: '300px', maxHeight: '400px', overflowY: 'auto' }}
        >
          {notiData?.notiList.map((noti) => {
            return (
              <NotificationItem
                key={noti.id}
                notification={noti}
                onCloseMenu={handleCloseMenu}
              />
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};

export default NotificationMenu;
