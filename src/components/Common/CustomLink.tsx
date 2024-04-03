import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const CustomLink = styled(Link)(({ theme }) => ({
  'color': theme.palette.primary.main,

  ':hover': {
    color: theme.palette.primary.dark,
  },
}));

export default CustomLink;
