import {
  Box,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { FormatDateTime } from 'constants/datetime';
import { ModalKey } from 'constants/modal';
import { OrderStatus, OrderStatusOptions } from 'constants/order';
import { useGetOrdersQuery } from 'store/api/order/orderApiSlice';
import { showModal } from 'store/slice/modalSlice';
import { displayDateTime } from 'utils/datetime';
import { displayCurrency } from 'utils/string';

const titles = ['Order ID', 'Total Price', 'Status', 'Created At', 'Updated At'];

const formatDateTime = (dateTime: string) => {
  return displayDateTime({
    dateTime,
    targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
  });
};

const Badge = ({ color, text }: { color: string; text: string }) => (
  <Typography
    sx={{
      color: 'white',
      fontWeight: 500,
      backgroundColor: color,
      borderRadius: '5px',
      padding: '5px',
    }}
  >
    {text}
  </Typography>
);

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case OrderStatus.NEW:
      return (
        <Badge
          color="#378CE7"
          text={OrderStatusOptions[OrderStatus.NEW]}
        />
      );
    case OrderStatus.COMPLETED:
      return (
        <Badge
          color="#75A47F"
          text={OrderStatusOptions[OrderStatus.COMPLETED]}
        />
      );
    case OrderStatus.CANCELLED:
      return (
        <Badge
          color="#F7418F"
          text={OrderStatusOptions[OrderStatus.CANCELLED]}
        />
      );
    default:
      return null;
  }
};

export default function PaymentSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState(OrderStatus.COMPLETED);
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useGetOrdersQuery({
    page,
    take: 5,
    status,
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{
          width: '100%',
        }}
      >
        <Select
          value={status}
          onChange={(event) => setStatus(event.target.value as OrderStatus)}
          sx={{
            mb: 2,
          }}
          size="small"
        >
          <MenuItem value={OrderStatus.COMPLETED}>{OrderStatusOptions[OrderStatus.COMPLETED]}</MenuItem>
          <MenuItem value={OrderStatus.CANCELLED}>{OrderStatusOptions[OrderStatus.CANCELLED]}</MenuItem>
        </Select>
      </Stack>

      {data && data.data.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="locations"
            >
              <TableHead>
                <TableRow>
                  {titles.map((title) => (
                    <TableCell
                      align="center"
                      key={title}
                    >
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((order) => (
                  <TableRow
                    key={order.id}
                    onClick={() => {
                      dispatch(
                        showModal(ModalKey.SHOW_ORDER_DETAIL, {
                          orderId: order.id,
                          onNavigate: () => navigate(`/pricing`),
                        })
                      );
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell align="center">{order.id}</TableCell>
                    <TableCell align="center">{displayCurrency(order.price)}</TableCell>
                    <TableCell align="center">
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell align="center">{formatDateTime(order.createdAt)}</TableCell>
                    <TableCell align="center">{formatDateTime(order.updatedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={data?.totalPages || 1}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            sx={{
              mt: 2,
            }}
          />
        </>
      ) : (
        <NoData message="You don't have any orders." />
      )}
    </Box>
  );
}
