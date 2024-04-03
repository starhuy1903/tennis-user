import { Box, Button, Card, CardActionArea, CardActions, CardContent, Grid, Typography } from '@mui/material';

import { Service } from 'types/app';

interface ServiceItemProps {
  service: Service;
  onGotoService: (servicePath: string) => void;
}

export default function ServiceItem({ service, onGotoService }: ServiceItemProps) {
  return (
    <Card
      sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
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
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
}
