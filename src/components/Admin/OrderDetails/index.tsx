import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { ReadOnlyTextField } from 'components/Common/FormComponents';
import { DetailWrapper } from 'components/Common/Layout/AdminLayout/ScreenWrapper';
import { FormatDateTime } from 'constants/datetime';
import { OrderStatus, OrderStatusChip, OrderType, OrderTypeOptions, PaymentPartnerOptions } from 'constants/order';
import { PackageTypeOptions } from 'constants/package';
import { useLazyGetOrderByIdAdminQuery } from 'store/api/admin/orderApiSlice';
import { Order } from 'types/order';
import { displayDateTime } from 'utils/datetime';
import { displayCurrency } from 'utils/string';

export default function AdminOrderDetails() {
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const { id } = useParams<{ id: string }>();

  const [getOrder, { isLoading }] = useLazyGetOrderByIdAdminQuery();

  const handleInvalidRequest = useCallback(() => {
    setOrder(null);
    navigate('/orders', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!id) {
      handleInvalidRequest();
      return;
    }

    (async () => {
      try {
        const res = await getOrder(id!).unwrap();
        setOrder(res);
      } catch (error) {
        console.log(error);
        handleInvalidRequest();
      }
    })();
  }, [getOrder, handleInvalidRequest, id]);

  if (isLoading || !order) {
    return <CenterLoading />;
  }

  return (
    <DetailWrapper label={`Order ID: ${order?.id}`}>
      <Typography
        variant="h6"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        Order Details
        <Chip
          icon={
            order.status === OrderStatus.NEW ? (
              <AccessTimeIcon />
            ) : order.status === OrderStatus.COMPLETED ? (
              <CheckCircleOutlineIcon />
            ) : (
              <RemoveCircleOutlineIcon />
            )
          }
          label={OrderStatusChip[order.status].label}
          color={OrderStatusChip[order.status].color}
          sx={{
            color: 'white',
          }}
        />
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
          value={order.id}
        />

        <ReadOnlyTextField
          label="Order Time"
          value={displayDateTime({
            dateTime: order.createdAt,
            targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
          })}
        />

        <ReadOnlyTextField
          label="Payment Time"
          value={displayDateTime({
            dateTime: order.updatedAt,
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
          label="Payment Method"
          value={PaymentPartnerOptions[order.partner]}
        />

        <ReadOnlyTextField
          label="Price"
          value={displayCurrency(order.price)}
        />

        <ReadOnlyTextField
          label="Type"
          value={OrderTypeOptions[order.type]}
        />

        {order.type !== OrderType.CREATE && order?.referenceId && (
          <>
            <TextField
              label="Original Order"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={order.referenceId}
            />
            <Button
              variant="contained"
              onClick={() => navigate(`/orders/${order.referenceId}`)}
            >
              <ArrowForwardIcon />
            </Button>
          </>
        )}
      </Stack>

      <Typography variant="h6">Package</Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 1,
        }}
      >
        <ReadOnlyTextField
          label="ID"
          value={order.package.id}
        />

        <ReadOnlyTextField
          label="Name"
          value={order.package.name}
        />

        <ReadOnlyTextField
          label="Type"
          value={PackageTypeOptions[order.package.type]}
        />

        <ReadOnlyTextField
          label="Duration"
          value={`${order.package.duration} months`}
        />

        <ReadOnlyTextField
          label="Price"
          value={displayCurrency(order.price)}
        />

        <Button
          variant="contained"
          onClick={() => navigate(`/packages/${order.package.id}`)}
        >
          <ArrowForwardIcon />
        </Button>
      </Stack>

      <Typography variant="h6">Customer</Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 1,
        }}
      >
        <ReadOnlyTextField
          label="ID"
          value={order.user.id}
        />

        <ReadOnlyTextField
          label="Name"
          value={order.user.name}
        />

        <ReadOnlyTextField
          label="Email"
          value={order.user.email}
        />

        <ReadOnlyTextField
          label="Phone"
          value={order.user.phoneNumber || 'N/A'}
        />

        <Button
          variant="contained"
          onClick={() => navigate(`/users/${order.user.id}`)}
        >
          <ArrowForwardIcon />
        </Button>
      </Stack>
    </DetailWrapper>
  );
}
