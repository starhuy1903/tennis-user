import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { FormatDateTime } from 'constants/datetime';
import { Advertisement } from 'types/advertisement';
import { displayDateTime } from 'utils/datetime';

export default function AdvertisementItem({ item }: { item: Advertisement }) {
  return (
    <Link
      to={`/affiliates/advertisements/${item.id}`}
      style={{
        textDecoration: 'none',
      }}
    >
      <CardActionArea>
        <Card>
          <CardMedia
            component="img"
            height="250"
            image={item.image}
            alt="advertisement"
          />

          <CardHeader
            avatar={
              <Avatar
                src={item.user.image}
                alt={item.user.name}
              />
            }
            title={item.user.name}
            subheader={displayDateTime({
              dateTime: item.createdAt,
              targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
            })}
          />

          <CardContent sx={{ paddingTop: 0 }}>
            <Tooltip title={item.title}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                noWrap
              >
                {item.title}
              </Typography>
            </Tooltip>
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  );
}
