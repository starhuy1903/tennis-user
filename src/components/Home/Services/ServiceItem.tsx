import ExploreIcon from '@mui/icons-material/Explore';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { Service } from 'types/app';

import advertisementImg from 'assets/images/home/advertisement.jpg';
import groupManagementImg from 'assets/images/home/group-management.jpg';
import tournamentImg from 'assets/images/home/tournament.jpg';

interface ServiceItemProps {
  service: Service;
  onGotoService: (servicePath: string) => void;
}

export default function ServiceItem({ service, onGotoService }: ServiceItemProps) {
  const getCardImage = () => {
    if (service.path === 'groups') {
      return groupManagementImg;
    } else if (service.path === 'tournaments') {
      return tournamentImg;
    }
    return advertisementImg;
  };

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
        image={getCardImage()}
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
