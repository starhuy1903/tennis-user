/// <reference types="vite-plugin-svgr/client" />
import { Box } from '@mui/material';

import NoDataLogo from 'assets/icons/no-data.svg?react';

const NoData = () => {
  return (
    <Box>
      <NoDataLogo />
    </Box>
  );
};

export default NoData;
