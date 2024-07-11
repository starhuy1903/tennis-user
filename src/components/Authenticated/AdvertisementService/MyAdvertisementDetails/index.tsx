import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Avatar, Box, Chip, Divider, Fab, Link, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import { AdvertisementStatus, AdvertisementStatusChip } from 'constants/advertisement';
import { FormatDateTime } from 'constants/datetime';
import { useLazyGetAdvertisementByIdQuery } from 'store/api/advertisement/advertisementApiSlice';
import { selectUser } from 'store/slice/userSlice';
import { Advertisement } from 'types/advertisement';
import { displayDateTime } from 'utils/datetime';

export default function MyAdvertisementDetails() {
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
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

        if (!user || res.userId !== user.id) {
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
  }, [getAdvertisement, handleInvalidRequest, id, user]);

  const customRoutes = useMemo(
    () => [
      {
        path: '/affiliates/my-ads',
        breadcrumb: 'My Advertisements',
      },
      {
        path: '/affiliates/my-ads/:id',
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
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={4}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
          >
            <Avatar
              src={advertisement.user.image}
              alt={advertisement.user.name}
            />
            <Typography variant="subtitle1">{advertisement.user.name}</Typography>
          </Stack>

          {advertisement.website && (
            <Link
              href={`//${advertisement.website}`}
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

          <Chip
            icon={
              advertisement.status === AdvertisementStatus.PENDING ? (
                <PendingActionsIcon />
              ) : advertisement.status === AdvertisementStatus.APPROVED ? (
                <CheckCircleOutlineIcon />
              ) : (
                <RemoveCircleOutlineIcon />
              )
            }
            label={AdvertisementStatusChip[advertisement.status].label}
            color={AdvertisementStatusChip[advertisement.status].color}
          />
        </Stack>

        <Fab
          size="small"
          aria-label="edit-advertisement"
          color="primary"
          onClick={() => navigate(`/affiliates/my-ads/${advertisement.id}/edit`)}
        >
          <EditIcon fontSize="small" />
        </Fab>
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
