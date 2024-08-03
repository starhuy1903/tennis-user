import { Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { ReadOnlyTextField } from 'components/Common/FormComponents';
import { DetailWrapper } from 'components/Common/Layout/AdminLayout/ScreenWrapper';
import { FormatDateTime } from 'constants/datetime';
import { ServiceLevelOptions, ServiceType, ServiceTypeOptions } from 'constants/service';
import { useLazyGetServiceByIdAdminQuery } from 'store/api/admin/serviceApiSlice';
import { Service } from 'types/package';
import { displayDateTime } from 'utils/datetime';

export default function ServiceDetails() {
  const navigate = useNavigate();

  const [service, setService] = useState<Service | null>(null);
  const { id } = useParams<{ id: string }>();

  const [getService, { isLoading }] = useLazyGetServiceByIdAdminQuery();

  const handleInvalidRequest = useCallback(() => {
    setService(null);
    navigate('/services', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!id) {
      handleInvalidRequest();
      return;
    }

    (async () => {
      try {
        const res = await getService(id!).unwrap();
        setService(res);
      } catch (error) {
        console.log(error);
        handleInvalidRequest();
      }
    })();
  }, [getService, handleInvalidRequest, id]);

  if (isLoading || !service) {
    return <CenterLoading />;
  }

  return (
    <DetailWrapper label={`Service ID: ${service.id}`}>
      <Typography
        variant="h6"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        Service Details
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
          value={service.id}
        />

        <ReadOnlyTextField
          label="Created At"
          value={displayDateTime({
            dateTime: service.createdAt,
            targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
          })}
        />

        <ReadOnlyTextField
          label="Updated At"
          value={displayDateTime({
            dateTime: service.updatedAt,
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
          label="Name"
          value={service.name}
        />

        <ReadOnlyTextField
          label="Type"
          value={ServiceTypeOptions[service.type]}
        />

        <ReadOnlyTextField
          label="Level"
          value={ServiceLevelOptions[service.level]}
        />

        {service.type === ServiceType.GROUP && (
          <>
            <ReadOnlyTextField
              label="Max Groups"
              value={service.config.maxGroups}
            />

            <ReadOnlyTextField
              label="Max Members"
              value={service.config.maxMembers}
            />
          </>
        )}

        {service.type === ServiceType.TOURNAMENT && (
          <ReadOnlyTextField
            label="Max Tournaments"
            value={service.config.maxTournaments}
          />
        )}

        {service.type === ServiceType.ADVERTISEMENT && (
          <ReadOnlyTextField
            label="Max Advertisements"
            value={service.config.maxAdvertisements}
          />
        )}
      </Stack>
    </DetailWrapper>
  );
}
