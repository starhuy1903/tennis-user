import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { OrderStatus, OrderStatusOptions } from 'constants/order';
import { useGetOrdersQuery } from 'store/api/order/orderApiSlice';
import { formatDateTime } from 'utils/datetime';
import { displayCurrency } from 'utils/string';

const titles = ['Order ID', 'Total Price', 'Status', 'Created At', 'Updated At'];

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
    case OrderStatus.CANCELED:
      return (
        <Badge
          color="#F7418F"
          text={OrderStatusOptions[OrderStatus.CANCELED]}
        />
      );
    default:
      return null;
  }
};
export default function PaymentSection() {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useGetOrdersQuery({
    page,
    take: 7,
  });

  if (isLoading) {
    return <CenterLoading />;
  }

  if (!data || data.data.length === 0) {
    return <NoData message="You don't have any orders." />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        mt: 2,
      }}
    >
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
                  console.log('Clicked on order', order.id);
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
        count={data?.totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </Box>
  );
}
