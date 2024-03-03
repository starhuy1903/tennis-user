import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';

const MessageMenu = () => {
  return (
    <IconButton
      size="large"
      sx={{ 'borderRadius': '10px', '.MuiTouchRipple-child': { borderRadius: '10px !important' } }}
    >
      <ChatIcon />
    </IconButton>
  );
};

export default MessageMenu;
