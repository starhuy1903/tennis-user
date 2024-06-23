import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppDispatch } from 'store';

import { ModalKey } from 'constants/modal';
import { ServiceType } from 'constants/service';
import { showModal } from 'store/slice/modalSlice';
import { Service } from 'types/package';
import { displayTimestamp } from 'utils/datetime';
import { isValidService } from 'utils/package';

import { InfoItem } from '../InfoItem';
import BaseModal from './BaseModal';
import { ShowPackageDetailsProps } from './types';

type ServiceConfigProps = {
  [key in ServiceType]: {
    color: 'success' | 'warning';
    value: string;
  };
};

const ServiceConfig: ServiceConfigProps = {
  [ServiceType.GROUP]: {
    color: 'success',
    value: 'groups',
  },
  [ServiceType.TOURNAMENT]: {
    color: 'warning',
    value: 'tournaments',
  },
};

const ServiceCell = ({
  service,
  onNavigate,
  onModalClose,
}: {
  service: Service;
  onNavigate: (serviceName: string) => void;
  onModalClose: () => void;
}) => {
  return (
    <TableRow>
      <TableCell align="center">{service.name}</TableCell>
      {service.type === ServiceType.GROUP && (
        <TableCell align="center">{`${service.config.used}/${service.config.maxGroups}`}</TableCell>
      )}
      {service.type === ServiceType.TOURNAMENT && (
        <TableCell align="center">{`${service.config.used}/${service.config.maxTournaments}`}</TableCell>
      )}
      <TableCell align="center">
        <Button
          variant="contained"
          disabled={!isValidService(service)}
          color={ServiceConfig[service.type].color}
          onClick={() => {
            onNavigate(ServiceConfig[service.type].value);
            onModalClose();
          }}
        >
          Use
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default function ShowPackageDetails({ package: pack, onNavigate, onModalClose }: ShowPackageDetailsProps) {
  const dispatch = useAppDispatch();

  const renderBody = () => {
    if (!pack) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
          }}
        >
          <Typography>Package not founds.</Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Paper>
          <Box
            sx={{
              padding: 2,
            }}
          >
            <InfoItem
              label="Package ID"
              value={pack.id}
              isBold
            />

            <InfoItem
              label="Order ID"
              value={pack.orderId || '--'}
              isBold
              onClickValue={() => {
                if (pack.orderId) {
                  onModalClose();

                  dispatch(
                    showModal(ModalKey.SHOW_ORDER_DETAIL, {
                      orderId: pack.orderId,
                    })
                  );
                }
              }}
            />

            <InfoItem
              label="Package Name"
              value={pack.name}
            />

            <InfoItem
              label="Start Date"
              value={displayTimestamp(pack.startDate, { includeRelativeTimeToPresent: true })}
            />

            <InfoItem
              label="End Date"
              value={displayTimestamp(pack.endDate, { includeRelativeTimeToPresent: true })}
            />
          </Box>
        </Paper>

        <TableContainer component={Paper}>
          <Table aria-label="items">
            <TableHead>
              <TableRow>
                <TableCell align="center">Service Name</TableCell>
                <TableCell align="center">Used</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pack.services.map((service) => (
                <ServiceCell
                  key={service.id}
                  service={service}
                  onNavigate={onNavigate}
                  onModalClose={onModalClose}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <BaseModal
      headerText="Package Detail"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Ok"
      onClickPrimaryButton={() => {
        onModalClose();
      }}
      size="md"
    />
  );
}
