import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import { useGetOrderStatisticQuery } from 'store/api/admin/orderApiSlice';

import OrderType from './OrderType';
import StatisticCard from './StaticticCard';

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const { data } = useGetOrderStatisticQuery(
    { year: selectedYear, time: 'month' },
    { refetchOnMountOrArgChange: true }
  );

  const totalRevenue = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(data?.totalRevenue || 0);

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
      >
        Dashboard
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
      >
        <StatisticCard
          categoryIcon={<GroupIcon />}
          category="Total users"
          amount={String(data?.totalUsers || 0)}
          isUpTrending
          trendingPercentage="5%"
          wrapperSx={{
            backgroundColor: '#1bc5bd',
            backgroundImage: 'radial-gradient(circle,rgba(201,247,245,.4),#1bc5bd 70%)',
          }}
        />
        <StatisticCard
          categoryIcon={<PaidIcon />}
          category="Total revenue"
          amount={totalRevenue}
          isUpTrending
          trendingPercentage="10%"
          wrapperSx={{
            backgroundColor: '#3699ff',
            backgroundImage: 'radial-gradient(circle,rgba(225,240,255,.4),#3699ff 70%)',
          }}
        />
        <StatisticCard
          categoryIcon={<ShoppingBasketIcon />}
          category="Total orders"
          amount={String(data?.totalOrderSum || 0)}
          isUpTrending
          trendingPercentage="15%"
          wrapperSx={{
            backgroundColor: '#ffa800',
            backgroundImage: 'radial-gradient(circle,rgba(255,244,222,.4),#ffa800 70%)',
          }}
        />
      </Box>
      <Box mt={4}>
        <OrderType
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          statisticData={data}
        />
      </Box>
    </Box>
  );
}
