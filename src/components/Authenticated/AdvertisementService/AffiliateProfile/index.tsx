import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { Avatar, Box, Divider, Grid, Pagination, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { useLazyGetAdvertisementsByUserIdQuery } from 'store/api/advertisement/advertisementApiSlice';
import { useLazyGetUserProfileQuery } from 'store/api/userApiSlice';

import AdvertisementItem from './AdvertisementItem';

export default function AffiliateProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [getUserDetails, { isLoading: isLoadingUser, data: user }] = useLazyGetUserProfileQuery();
  const [getAdvertisements, { isLoading, data }] = useLazyGetAdvertisementsByUserIdQuery();

  const handleInvalidRequest = useCallback(() => {
    navigate('/affiliates', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!id) {
      handleInvalidRequest();
      return;
    }

    (async () => {
      try {
        const res = await Promise.all([
          getUserDetails(id).unwrap(),
          getAdvertisements({
            page,
            userId: id!,
            take: 9,
          }).unwrap(),
        ]);

        if (!res[0] || !res[1]) {
          handleInvalidRequest();
          return;
        }
      } catch (error) {
        handleInvalidRequest();
      }
    })();
  }, [getAdvertisements, getUserDetails, handleInvalidRequest, id, page]);

  const customRoutes = useMemo(
    () => [
      {
        path: '/affiliates/:id',
        breadcrumb: user?.name,
      },
    ],
    [user]
  );

  if (isLoadingUser || isLoading) {
    return <CenterLoading />;
  }

  return (
    <Box paddingBottom={8}>
      <Breadcrumbs customRoutes={customRoutes} />

      <Stack
        direction="row"
        alignItems="center"
        gap={4}
      >
        <Avatar
          src={user?.image}
          alt={user?.name}
          sx={{
            width: 100,
            height: 100,
          }}
        />
        <Stack
          direction="column"
          gap={1}
        >
          <Typography variant="h5">{user?.name}</Typography>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            color="gray"
          >
            <MailIcon fontSize="small" />
            <Typography variant="body2">{user?.email}</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            color="gray"
          >
            <PhoneIcon fontSize="small" />
            <Typography variant="body2">{user?.phoneNumber}</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Divider
        sx={{
          my: 2,
        }}
      />

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
