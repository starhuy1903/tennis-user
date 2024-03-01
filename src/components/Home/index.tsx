import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import MyGroup from './MyGroup';
import News from './News';

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.user);

  const handleGoToAffiliateSponsor = () => {
    if (isLoggedIn) {
      navigate('/affiliate-sponsor');
    } else {
      navigate('/login');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
      }}
    >
      <Box>
        <Typography variant="h4">Quick Actions</Typography>
        <Button onClick={handleGoToAffiliateSponsor}>Affiliate sponsorship</Button>
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4">News</Typography>
          <Button
            component={Link}
            to="/news"
          >
            More
          </Button>
        </Box>
        <News />
      </Box>
      <Box>
        <Typography variant="h4">My Group</Typography>
        <MyGroup />
      </Box>
    </Box>
  );
}
