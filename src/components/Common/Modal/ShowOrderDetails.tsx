import {
  Box,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { FormatDateTime } from 'constants/datetime';
import { OrderStatus, PaymentPartnerOptions } from 'constants/order';
import { useGetOrderDetailQuery } from 'store/api/order/orderApiSlice';
import { displayDateTime } from 'utils/datetime';
import { displayCurrency } from 'utils/string';

import CenterLoading from '../CenterLoading';
import BaseModal from './BaseModal';
import { ShowOrderDetailProps } from './types';

const formatDateTime = (dateTime: string) => {
  return displayDateTime({
    dateTime,
    targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
  });
};

const InfoItem = ({ label, value, isBold = false }: { label: string; value: string; isBold?: boolean }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
  >
    <Typography sx={{ fontWeight: isBold ? 'bold' : 'normal' }}>{label}</Typography>
    <Typography sx={{ fontWeight: isBold ? 'bold' : 'normal' }}>{value}</Typography>
  </Stack>
);

export default function ShowOrderDetail({ orderId, onNavigate, onModalClose }: ShowOrderDetailProps) {
  const { data, isLoading } = useGetOrderDetailQuery(orderId);

  const renderBody = () => {
    if (isLoading) {
      return <CenterLoading />;
    }

    if (!data) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
          }}
        >
          <Typography>Order not founds.</Typography>
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
              label="Customer"
              value={data.user.name}
              isBold
            />

            <InfoItem
              label="Email"
              value={data.user.email}
            />

            <InfoItem
              label="Phone Number"
              value={data.user.phoneNumber || '--'}
            />
          </Box>

          <Divider />

          <Box sx={{ padding: 2 }}>
            <InfoItem
              label="Order ID"
              value={data.id}
              isBold
            />

            <InfoItem
              label="Order Time"
              value={formatDateTime(data.createdAt)}
            />

            {data.status === OrderStatus.COMPLETED && (
              <>
                <InfoItem
                  label="Payment Time"
                  value={formatDateTime(data.updatedAt)}
                />
                <InfoItem
                  label="Payment Method"
                  value={PaymentPartnerOptions[data.paymentMethod]}
                />
              </>
            )}
            {data.status === OrderStatus.CANCELLED && (
              <InfoItem
                label="Cancelled Time"
                value={formatDateTime(data.updatedAt)}
              />
            )}
          </Box>
        </Paper>

        <TableContainer component={Paper}>
          <Table aria-label="items">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Package Name</TableCell>
                <TableCell align="center">Duration</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell align="center">{data.package.id}</TableCell>
              <TableCell align="center">{data.package.name}</TableCell>
              <TableCell align="center">{data.package.duration} months</TableCell>
              <TableCell align="center">{displayCurrency(data.package.price)}</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <BaseModal
      headerText="Order Detail"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Buy Again"
      onClickPrimaryButton={() => {
        onNavigate();
        onModalClose();
      }}
      size="md"
    />
  );
}
