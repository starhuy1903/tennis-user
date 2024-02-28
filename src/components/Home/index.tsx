import { Box, Button, Typography } from '@mui/material';

import NoData from 'components/Common/NoData';

import News from './News';

export default function Home() {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <Box>
      <Box>
        <Typography variant="h4">Quick Actions</Typography>
        <Button onClick={handleClick}>Affiliate sponsorship</Button>
        <NoData />
      </Box>
      <Box>
        <Typography variant="h4">News</Typography>
        <News />
      </Box>
      <Box>
        <Typography variant="h4">My Group</Typography>
        <Button onClick={handleClick}>Create group</Button>
      </Box>
    </Box>
  );
}
