import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinkIcon from '@mui/icons-material/Link';
import { Avatar, Box, Divider, Link, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import { AdvertisementStatus } from 'constants/advertisement';
import { FormatDateTime } from 'constants/datetime';
import { useLazyGetAdvertisementByIdQuery } from 'store/api/advertisement/advertisementApiSlice';
import { Advertisement } from 'types/advertisement';
import { displayDateTime } from 'utils/datetime';

export default function AdvertisementDetails() {
  const navigate = useNavigate();

  const [advertisement, setAdvertisement] = useState<Advertisement | null>(null);
  const { id } = useParams<{ id: string }>();

  const [getAdvertisement, { isLoading }] = useLazyGetAdvertisementByIdQuery();

  const handleInvalidRequest = useCallback(() => {
    setAdvertisement(null);
    navigate('/affiliates', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!id) {
      handleInvalidRequest();
      return;
    }

    async function fetchData() {
      try {
        const res = await getAdvertisement(id!).unwrap();

        if (res.status !== AdvertisementStatus.APPROVED) {
          handleInvalidRequest();
          return;
        }

        setAdvertisement(res);
      } catch (error) {
        console.log(error);
        handleInvalidRequest();
      }
    }

    fetchData();
  }, [getAdvertisement, handleInvalidRequest, id]);

  const customRoutes = useMemo(
    () => [
      {
        path: '/affiliates/advertisements',
        breadcrumb: null,
      },
      {
        path: '/affiliates/advertisements/:id',
        breadcrumb: advertisement?.title,
      },
    ],
    [advertisement?.title]
  );

  if (isLoading || !advertisement) {
    return <CenterLoading />;
  }

  return (
    <Stack
      direction="column"
      gap={2}
      pb={8}
    >
      <Breadcrumbs customRoutes={customRoutes} />

      <Typography variant="h4">{advertisement.title}</Typography>

      <Stack
        direction="row"
        gap={4}
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          component={RouterLink}
          to={`/affiliates/${advertisement.user.id}`}
          color="black"
        >
          <Avatar
            src={advertisement.user.image}
            alt={advertisement.user.name}
          />
          <Typography variant="subtitle1">{advertisement.user.name}</Typography>
        </Stack>

        {advertisement.website && (
          <Link
            href={advertisement.website.includes('http') ? advertisement.website : `//${advertisement.website}`}
            target="_blank"
            rel="noreferrer"
            sx={{
              'display': 'flex',
              'alignItems': 'center',
              'gap': 1,
              'textDecoration': 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            <LinkIcon />
            Website
          </Link>
        )}

        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <CalendarMonthIcon
            sx={{
              color: 'gray',
            }}
          />
          <Typography variant="subtitle1">
            {displayDateTime({ dateTime: advertisement.createdAt, targetFormat: FormatDateTime.DATE_AND_FULL_TIME })}
          </Typography>
        </Stack>
      </Stack>

      <Divider />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          width={700}
          height={500}
          alt="advertisement"
          src={advertisement.image}
          loading="lazy"
        />
      </Box>

      <Typography
        variant="body1"
        whiteSpace="pre-line"
      >
        {advertisement.content}
      </Typography>
    </Stack>
  );
}
