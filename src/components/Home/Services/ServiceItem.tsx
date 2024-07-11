import ExploreIcon from '@mui/icons-material/Explore';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { Service } from 'types/app';

import affiliateImg from 'assets/images/home/affiliate-sponsor.jpg';
import groupManagementImg from 'assets/images/home/group-management.jpg';
import tournamentImg from 'assets/images/home/tournament.jpg';

const getCardImage = (serviceName: string) => {
  if (serviceName === 'groups') {
    return groupManagementImg;
  }
  if (serviceName === 'tournaments') {
    return tournamentImg;
  }
  if (serviceName === 'affiliates') {
    return affiliateImg;
  }
  return affiliateImg;
};

interface ServiceItemProps {
  service: Service;
  onGotoService: (servicePath: string) => void;
}

export default function ServiceItem({ service, onGotoService }: ServiceItemProps) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={getCardImage(service.path)}
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
        >
          {service.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {service.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onGotoService(service.path)}
          fullWidth
          startIcon={<ExploreIcon />}
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
}
