import { Box, BoxProps } from '@mui/material';
import { Link } from 'react-router-dom';

import logo from 'assets/images/app-logo.png';

function Logo(props: BoxProps) {
  return (
    <Box {...props}>
      <Link
        to="/"
        style={{ display: 'inline-block', height: '100%' }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ maxHeight: '100%' }}
        />
      </Link>
    </Box>
  );
}

export default Logo;
