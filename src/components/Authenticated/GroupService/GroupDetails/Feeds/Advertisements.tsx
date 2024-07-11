import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { useGetAdvertisementsQuery } from 'store/api/advertisement/advertisementApiSlice';

export default function Advertisements() {
  const { data, isLoading } = useGetAdvertisementsQuery({
    page: 1,
    take: 3,
  });

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold' }}
        gutterBottom
      >
        Advertisements
      </Typography>

      {data && data.data.length > 0 ? (
        <Grid
          container
          spacing={4}
        >
          {data.data.map((item) => (
            <Grid
              item
              key={item.id}
              xs={12}
            >
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

                    <CardContent>
                      <Typography
                        noWrap
                        variant="subtitle1"
                        sx={{
                          color: 'text.primary',
                          fontWeight: 'bold',
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
      ) : (
        <NoData message="There is no advertisement." />
      )}
    </Box>
  );
}
