import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Chip, Fab, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { ImageListField, ReadOnlyTextField } from 'components/Common/FormComponents';
import { DetailWrapper } from 'components/Common/Layout/AdminLayout/ScreenWrapper';
import { AdvertisementStatus, AdvertisementStatusChip } from 'constants/advertisement';
import { FormatDateTime } from 'constants/datetime';
import {
  useLazyGetAdvertisementByIdAdminQuery,
  useUpdateAdvertisementAdminMutation,
} from 'store/api/admin/advertisementApiSlice';
import { Advertisement } from 'types/advertisement';
import { displayDateTime } from 'utils/datetime';

export default function AdminAdvertisementDetails() {
  const navigate = useNavigate();

  const [advertisement, setAdvertisement] = useState<Advertisement | null>(null);
  const { id } = useParams<{ id: string }>();

  const [getAdvertisement, { isLoading }] = useLazyGetAdvertisementByIdAdminQuery();

  const handleInvalidRequest = useCallback(() => {
    setAdvertisement(null);
    navigate('/advertisements', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!id) {
      handleInvalidRequest();
      return;
    }

    (async () => {
      try {
        const res = await getAdvertisement(id!).unwrap();
        setAdvertisement(res);
      } catch (error) {
        console.log(error);
        handleInvalidRequest();
      }
    })();
  }, [getAdvertisement, handleInvalidRequest, id]);

  const [updateAdvertisement, { isLoading: isUpdateLoading }] = useUpdateAdvertisementAdminMutation();

  const handleApprove = useCallback(
    async (adsId: string) => {
      const res = await updateAdvertisement({ id: adsId, status: AdvertisementStatus.APPROVED }).unwrap();
      setAdvertisement(res);
    },
    [updateAdvertisement]
  );

  const handleReject = useCallback(
    async (adsId: string) => {
      const res = await updateAdvertisement({ id: adsId, status: AdvertisementStatus.REJECTED }).unwrap();
      setAdvertisement(res);
    },
    [updateAdvertisement]
  );

  if (isLoading || !advertisement) {
    return <CenterLoading />;
  }

  return (
    <DetailWrapper label={`Advertisement ID: ${advertisement?.id}`}>
      <Typography
        variant="h6"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        Advertisement Details
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
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
            sx={{
              color: 'white',
            }}
          />

          {advertisement.status === AdvertisementStatus.PENDING && (
            <>
              <Tooltip title="Approve">
                <Fab
                  color="success"
                  aria-label="approve"
                  size="small"
                  onClick={() => handleApprove(advertisement.id)}
                  disabled={isUpdateLoading}
                >
                  <DoneIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Reject">
                <Fab
                  color="error"
                  aria-label="reject"
                  size="small"
                  onClick={() => handleReject(advertisement.id)}
                  disabled={isUpdateLoading}
                >
                  <CloseIcon />
                </Fab>
              </Tooltip>
            </>
          )}
        </Box>
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 1,
        }}
      >
        <ReadOnlyTextField
          label="ID"
          value={advertisement.id}
        />

        <ReadOnlyTextField
          label="Created Time"
          value={displayDateTime({
            dateTime: advertisement.createdAt,
            targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
          })}
        />

        <ReadOnlyTextField
          label="Updated Time"
          value={displayDateTime({
            dateTime: advertisement.updatedAt,
            targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
          })}
        />
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 1,
        }}
      >
        <ReadOnlyTextField
          label="Title"
          value={advertisement.title}
        />

        <ReadOnlyTextField
          label="Website"
          value={advertisement.website || 'N/A'}
        />
      </Stack>

      <TextField
        label="Content"
        value={advertisement.content}
        multiline
        rows={4}
        fullWidth
        InputProps={{
          readOnly: true,
        }}
      />

      <ImageListField
        label="Image"
        images={advertisement?.image ? [advertisement.image] : undefined}
      />

      <Typography variant="h6">Affiliate</Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 1,
        }}
      >
        <ReadOnlyTextField
          label="Name"
          value={advertisement.user.name}
        />

        <ReadOnlyTextField
          label="Email"
          value={advertisement.user.email}
        />

        <ReadOnlyTextField
          label="Phone Number"
          value={advertisement.user.phoneNumber}
        />
      </Stack>
    </DetailWrapper>
  );
}
