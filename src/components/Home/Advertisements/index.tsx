import { Box, Grid, Stack } from '@mui/material';

import AdvertisementItem from 'components/Authenticated/AdvertisementService/AdvertisementList/AdvertisementItem';
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
    <Box marginTop={1}>
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
                <AdvertisementItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      ) : (
        <NoData message="There is no advertisement." />
      )}
    </Box>
  );
}
