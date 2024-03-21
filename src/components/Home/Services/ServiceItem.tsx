import { Box, Button, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';

import { Service } from 'types/app';

interface ServiceItemProps {
  service: Service;
  onGotoService: (servicePath: string) => void;
}

export default function ServiceItem({ service, onGotoService }: ServiceItemProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => onGotoService(service.path)}
          sx={{ mt: 4 }}
          fullWidth
        >
          Explore
        </Button>
      </CardContent>
    </Card>
  );
}
