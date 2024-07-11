import { Box, Grid, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { useGetAdvertisementsQuery } from 'store/api/advertisement/advertisementApiSlice';

import AdvertisementItem from './AdvertisementItem';

export default function AdvertisementList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useGetAdvertisementsQuery({
    page,
    take: 9,
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
          marginTop={3}
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
