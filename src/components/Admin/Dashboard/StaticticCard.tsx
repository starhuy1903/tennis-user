import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Stack, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';

type StatisticCardProps = {
  categoryIcon: React.ReactNode;
  category: string;
  amount: string;
  trendingPercentage: string;
  isUpTrending: boolean;
};

export default function StatisticCard({
  categoryIcon,
  category,
  amount,
  trendingPercentage,
  isUpTrending,
}: StatisticCardProps) {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', p: 3, borderRadius: 4, width: 320, height: 140 }}>
      <Stack gap={1}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ color: grey[600] }}
        >
          {categoryIcon}
          <Typography fontSize={14}>{category}</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 500 }}
          >
            {amount}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            sx={{ color: isUpTrending ? green[400] : red[400] }}
          >
            {isUpTrending ? <TrendingUpIcon /> : <TrendingDownIcon />}
            <Typography
              fontSize={14}
              sx={{ fontWeight: 500 }}
            >
              {trendingPercentage}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
