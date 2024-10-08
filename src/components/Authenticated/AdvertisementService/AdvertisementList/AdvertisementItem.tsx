import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Tooltip, Typography } from '@mui/material';
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
        avatar={
          <Link to={`/affiliates/${item.user.id}`}>
            <Avatar
              src={item.user.image}
              alt={item.user.name}
            />
          </Link>
        }
        title={
          <Typography
            color="black"
            component={Link}
            to={`/affiliates/${item.user.id}`}
          >
            {item.user.name}
          </Typography>
        }
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
