/// <reference types="vite-plugin-svgr/client" />
import { Stack, Typography } from '@mui/material';

import NoDataLogo from 'assets/icons/no-data.svg?react';

const NoData = ({ message, gap = 1 }: { message?: string; gap?: number }) => {
  return (
    <Stack
      alignItems="center"
      gap={gap}
    >
      <NoDataLogo
        width={80}
        height={80}
      />
      <Typography variant="caption">{message || 'No data available'}</Typography>
    </Stack>
  );
};

export default NoData;
