import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { AdvertisementStatus, AdvertisementStatusChip } from 'constants/advertisement';
import { FormatDateTime } from 'constants/datetime';
import { Advertisement } from 'types/advertisement';
import { displayDateTime } from 'utils/datetime';

export default function AdvertisementItem({ item }: { item: Advertisement }) {
  return (
    <Link
      to={`/affiliates/my-ads/${item.id}`}
      style={{
        textDecoration: 'none',
      }}
    >
      <CardActionArea>
        <Card>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="250"
              image={item.image}
              alt="advertisement"
            />

            <Chip
              icon={
                item.status === AdvertisementStatus.PENDING ? (
                  <PendingActionsIcon />
                ) : item.status === AdvertisementStatus.APPROVED ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <RemoveCircleOutlineIcon />
                )
              }
              label={AdvertisementStatusChip[item.status].label}
              color={AdvertisementStatusChip[item.status].color}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 1,
                color: 'white',
              }}
            />
          </Box>

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
