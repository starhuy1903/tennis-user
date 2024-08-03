import { Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { ImageListField, ReadOnlyTextField } from 'components/Common/FormComponents';
import { DetailWrapper } from 'components/Common/Layout/AdminLayout/ScreenWrapper';
import { FormatDateTime } from 'constants/datetime';
import { GenderOptions } from 'constants/tournament';
import { UserRoleOptions } from 'constants/user';
import { useLazyGetUserByIdAdminQuery } from 'store/api/admin/userApiSlice';
import { UserProfile } from 'types/user';
import { displayDateTime } from 'utils/datetime';

export default function AdminUserDetails() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);
  const { id } = useParams<{ id: string }>();

  const [getUser, { isLoading }] = useLazyGetUserByIdAdminQuery();

  const handleInvalidRequest = useCallback(() => {
    setUser(null);
    navigate('/users', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!id) {
      handleInvalidRequest();
      return;
    }

    (async () => {
      try {
        const res = await getUser(id!).unwrap();
        setUser(res);
      } catch (error) {
        console.log(error);
        handleInvalidRequest();
      }
    })();
  }, [getUser, handleInvalidRequest, id]);

  if (isLoading || !user) {
    return <CenterLoading />;
  }

  return (
    <DetailWrapper label={`User ID: ${user.id}`}>
      <Typography
        variant="h6"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        User Details
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
          value={user.id}
        />

        <ReadOnlyTextField
          label="Name"
          value={user.name}
        />

        <ReadOnlyTextField
          label="Email"
          value={user.email}
        />

        <ReadOnlyTextField
          label="Phone Number"
          value={user?.phoneNumber || 'N/A'}
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
          label="Date of Birth"
          value={
            user.dob
              ? displayDateTime({
                  dateTime: user.dob,
                  targetFormat: FormatDateTime.DATE_1,
                })
              : 'N/A'
          }
        />

        <ReadOnlyTextField
          label="Gender"
          value={GenderOptions[user.gender]}
        />

        <ReadOnlyTextField
          label="ELO"
          value={user.elo ?? 'No ELO'}
        />

        <ReadOnlyTextField
          label="Role"
          value={UserRoleOptions[user.role]}
        />
      </Stack>

      <ImageListField
        label="Image"
        images={user?.image ? [user.image] : undefined}
      />
    </DetailWrapper>
  );
}
