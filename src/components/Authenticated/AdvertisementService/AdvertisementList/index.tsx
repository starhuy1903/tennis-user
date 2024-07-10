import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { FormatDateTime } from 'constants/datetime';
import { useGetAdvertisementsQuery } from 'store/api/advertisement/advertisementApiSlice';
import { displayDateTime } from 'utils/datetime';

export default function AdvertisementList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useGetAdvertisementsQuery({
    page,
    take: 5,
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Box paddingBottom={8}>
      <Breadcrumbs />

      {data && data.data.length > 0 ? (
        <Stack
          direction="column"
          alignItems="center"
          gap={4}
        >
          <Grid
            container
            spacing={4}
          >
            {data.data.map((item) => (
              <Grid
                item
                key={item.id}
                xs={12}
                sm={6}
                md={4}
              >
                <Link
                  to={`/advertisements/${item.id}`}
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
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={data?.totalPages || 1}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      ) : (
        <NoData message="There is no advertisement." />
      )}
    </Box>
  );
}
