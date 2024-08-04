import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { ReadOnlyTextField } from 'components/Common/FormComponents';
import { DetailWrapper } from 'components/Common/Layout/AdminLayout/ScreenWrapper';
import NoData from 'components/Common/NoData';
import { FormatDateTime } from 'constants/datetime';
import { PackageTypeOptions } from 'constants/package';
import { ServiceLevelOptions, ServiceType, ServiceTypeOptions } from 'constants/service';
import { useLazyGetPackageByIdAdminQuery } from 'store/api/admin/packageApiSlice';
import { Package } from 'types/package';
import { displayDateTime } from 'utils/datetime';
import { displayCurrency } from 'utils/string';

export default function PackageDetails() {
  const navigate = useNavigate();

  const [pack, setPack] = useState<Package | null>(null);
  const { id } = useParams<{ id: string }>();

  const [getPackage, { isLoading }] = useLazyGetPackageByIdAdminQuery();

  const handleInvalidRequest = useCallback(() => {
    setPack(null);
    navigate('/packages', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!id) {
      handleInvalidRequest();
      return;
    }

    (async () => {
      try {
        const res = await getPackage(id!).unwrap();
        setPack(res);
      } catch (error) {
        console.log(error);
        handleInvalidRequest();
      }
    })();
  }, [getPackage, handleInvalidRequest, id]);

  if (isLoading || !pack) {
    return <CenterLoading />;
  }

  return (
    <DetailWrapper label={`Package ID: ${pack?.id}`}>
      <Typography
        variant="h6"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        Package Details
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
          value={pack.id}
        />

        <ReadOnlyTextField
          label="Created At"
          value={displayDateTime({
            dateTime: pack.createdAt,
            targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
          })}
        />

        <ReadOnlyTextField
          label="Updated At"
          value={displayDateTime({
            dateTime: pack.updatedAt,
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
          value={pack.name}
        />

        <ReadOnlyTextField
          label="Type"
          value={PackageTypeOptions[pack.type]}
        />

        <ReadOnlyTextField
          label="Duration"
          value={`${pack.duration} ${pack.duration > 1 ? 'months' : 'month'}`}
        />

        <ReadOnlyTextField
          label="Price"
          value={displayCurrency(pack.price)}
        />
      </Stack>

      <TextField
        label="Description"
        value={pack.description}
        multiline
        rows={4}
        fullWidth
        InputProps={{
          readOnly: true,
        }}
      />

      <Typography variant="h6">Features</Typography>
      {pack.features && pack.features.length > 0 ? (
        pack.features.map((feature, featureIndex) => (
          <Box
            key={featureIndex}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CheckCircleOutlineIcon color="primary" />
            <Typography
              variant="body2"
              color="text.primary"
            >
              {feature}
            </Typography>
          </Box>
        ))
      ) : (
        <NoData message="No features found" />
      )}

      <Typography variant="h6">Services</Typography>
      {pack.services && pack.services.length > 0 ? (
        pack.services.map((service, index) => (
          <Stack
            key={index}
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

            <Button
              variant="contained"
              color="warning"
              onClick={() => navigate(`/services/${service.id}`)}
            >
              <ArrowForwardIcon />
            </Button>
          </Stack>
        ))
      ) : (
        <NoData message="No services found" />
      )}
    </DetailWrapper>
  );
}
