import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
    <Box>
      <Box>
        <Typography variant="h4">Quick Actions</Typography>
        <Button onClick={handleGoToAffiliateSponsor}>Affiliate sponsorship</Button>
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
