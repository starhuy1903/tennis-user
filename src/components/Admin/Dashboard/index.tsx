import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Box, Typography } from '@mui/material';

import OrderType from './OrderType';
import StatisticCard from './StaticticCard';

export default function Dashboard() {
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
          amount="78"
          isUpTrending
          trendingPercentage="5%"
        />
        <StatisticCard
          categoryIcon={<PaidIcon />}
          category="Total revenue"
          amount="72,800,000 đ"
          isUpTrending
          trendingPercentage="10%"
        />
        <StatisticCard
          categoryIcon={<ShoppingBasketIcon />}
          category="Total orders"
          amount="91"
          isUpTrending={false}
          trendingPercentage="5%"
        />
      </Box>
      <Box mt={4}>
        <OrderType />
      </Box>
    </Box>
  );
}
