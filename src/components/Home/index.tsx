import { Box, Button, Typography } from '@mui/material';

import MyGroup from './MyGroup';
import News from './News';

export default function Home() {
  return (
    <Box>
      <Box>
        <Typography variant="h4">Quick Actions</Typography>
        <Button onClick={() => ({})}>Affiliate sponsorship</Button>
      </Box>
      <Box>
        <Typography variant="h4">News</Typography>
        <News />
      </Box>
      <Box>
        <Typography variant="h4">My Group</Typography>
        <MyGroup />
      </Box>
    </Box>
  );
}
