import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Tooltip, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { FormatDateTime } from 'constants/datetime';
import { Advertisement } from 'types/advertisement';
import { displayDateTime } from 'utils/datetime';

export default function AdvertisementItem({ item }: { item: Advertisement }) {
  const navigate = useNavigate();
  return (
    <Card>
      <CardActionArea
        component={Link}
        to={`/affiliates/advertisements/${item.id}`}
      >
        <CardMedia
          component="img"
          height="250"
          image={item.image}
          alt="advertisement"
        />
      </CardActionArea>

      <CardHeader
        subheader={
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {displayDateTime({
              dateTime: item.createdAt,
              targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
            })}
          </Typography>
        }
      />

      <CardContent sx={{ paddingTop: 0 }}>
        <Tooltip title={item.title}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            noWrap
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => {
              navigate(`/affiliates/advertisements/${item.id}`);
            }}
          >
            {item.title}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
