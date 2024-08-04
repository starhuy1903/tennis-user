import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  'color': theme.palette.primary.main,
  'padding': '5px',
  'borderRadius': '10px',
  'background': theme.palette.primary.light,
  'transition': 'all 0.5s ease',
  '&:hover': {
    color: theme.palette.common.white,
    background: theme.palette.primary.dark,
  },
  '& .MuiTouchRipple-child': {
    borderRadius: '10px !important',
  },
}));

export default CustomIconButton;
