import { Box, Button, Typography } from '@mui/material';

export default function Home() {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <Box>
      <Box>
        <Typography>Quick Actions</Typography>
        <Button onClick={handleClick}>Affiliate sponsorship</Button>
      </Box>
      <Box>
        <Typography>News</Typography>
      </Box>
      <Box>
        <Typography>My Group</Typography>
        <Button onClick={handleClick}>Create group</Button>
      </Box>
    </Box>
  );
}
