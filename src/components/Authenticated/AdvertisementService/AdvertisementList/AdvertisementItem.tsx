import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
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

          <CardContent sx={{ paddingTop: 0, minHeight: 80 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                minHeight: 44,
              }}
            >
              {item.title}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  );
}
