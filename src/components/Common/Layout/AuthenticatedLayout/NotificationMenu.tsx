import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Box, MenuItem, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import { grey } from '@mui/material/colors';
import { useCallback, useState } from 'react';

import { useGetSystemNotificationQuery, useReadNotificationsMutation } from 'store/api/commonApiSlice';

import NotificationItem from './Notification/NotificationItem';

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [notiItemNumber, setNotiItemNumber] = useState(5);
  const { data: notiData } = useGetSystemNotificationQuery({ take: notiItemNumber }, { pollingInterval: 5000 });

  const [readNotiRequest] = useReadNotificationsMutation();

  const [disableLoadMore, setDisableLoadMore] = useState(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleGetMoreNoti = useCallback(() => {
    setDisableLoadMore(true);
    setNotiItemNumber((prev) => prev + 5);
    setTimeout(() => {
      setDisableLoadMore(false);
    }, 5000);
  }, []);

  const handleReadNoti = useCallback(
    async (notiListId: string[]) => {
      try {
        await readNotiRequest(notiListId).unwrap();
      } catch (error) {
        // handled error
      }
    },
    [readNotiRequest]
  );

  return (
    <>
      <IconButton
        size="large"
        sx={{ 'borderRadius': '10px', '.MuiTouchRipple-child': { borderRadius: '10px !important' } }}
        onClick={handleOpenMenu}
      >
        <Badge
          badgeContent={notiData?.unreadNumber}
          color="primary"
        >
          <NotificationsIcon color={anchorEl ? 'primary' : 'inherit'} />
        </Badge>
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
          {notiData?.notiList && notiData.notiList.length > 0 ? (
            <>
              {notiData?.notiList.map((noti) => {
                return (
                  <NotificationItem
                    key={noti.id}
                    notification={noti}
                    onCloseMenu={handleCloseMenu}
                    onReadNoti={() => handleReadNoti([noti.id])}
                  />
                );
              })}
              <MenuItem
                onClick={handleGetMoreNoti}
                disabled={disableLoadMore}
              >
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: 'pointer' }}
                >
                  Load more
                </Typography>
              </MenuItem>
            </>
          ) : (
            <Box
              height={50}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                fontSize={12}
                color={grey[600]}
              >
                No notification to show!
              </Typography>
            </Box>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default NotificationMenu;
