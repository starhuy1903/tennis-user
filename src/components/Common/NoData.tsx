/// <reference types="vite-plugin-svgr/client" />
import { Stack, Typography } from '@mui/material';

import NoDataLogo from 'assets/icons/no-data.svg?react';

const NoData = () => {
  return (
    <Stack
      alignItems="center"
      gap={1}
    >
      <NoDataLogo
        width={80}
        height={80}
      />
      <Typography variant="caption">No Data</Typography>
    </Stack>
  );
};

export default NoData;
