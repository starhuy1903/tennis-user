import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import NoData from 'components/Common/NoData';

import ServiceItem from './ServiceItem';

export default function Services() {
  const navigate = useNavigate();

  const { services } = useAppSelector((state) => state.app);
  const { isLoggedIn } = useAppSelector((state) => state.user);

  const handleGotoService = (servicePath: string) => {
    if (isLoggedIn) {
      navigate(servicePath);
    } else {
      navigate('/login');
    }
  };

  if (services.length === 0) {
    return <NoData />;
  }

  return (
    <Box mt={2}>
      <Grid
        container
        spacing={3}
      >
        {services.map((service) => (
          <Grid
            xs={3}
            item
            key={service.id}
          >
            <ServiceItem
              service={service}
              onGotoService={handleGotoService}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
