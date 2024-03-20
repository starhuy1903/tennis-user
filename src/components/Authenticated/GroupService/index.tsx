import { Box, Typography } from '@mui/material';

import MyGroup from './MyGroup';

export default function GroupService() {
  return (
    <Box>
      <Typography variant="h4">My Group</Typography>
      <MyGroup />
    </Box>
  );
}
