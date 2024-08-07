// import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Stack, SxProps, Typography } from '@mui/material';

// import { green, grey, red } from '@mui/material/colors';

type StatisticCardProps = {
  categoryIcon: React.ReactNode;
  category: string;
  amount: string;
  trendingPercentage: string;
  isUpTrending: boolean;
  wrapperSx?: SxProps;
};

export default function StatisticCard({ categoryIcon, category, amount, wrapperSx }: StatisticCardProps) {
  return (
    <Box
      sx={{ border: '1px solid', borderColor: 'divider', p: 3, borderRadius: 4, width: 320, height: 140, ...wrapperSx }}
    >
      <Stack gap={1}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ color: 'white' }}
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
            sx={{ fontWeight: 500, color: 'white' }}
          >
            {amount}
          </Typography>
          {/* <Chip
            avatar={
              isUpTrending ? (
                <TrendingUpIcon sx={{ color: isUpTrending ? green[400] : red[400] }} />
              ) : (
                <TrendingDownIcon sx={{ color: isUpTrending ? green[400] : red[400] }} />
              )
            }
            label={trendingPercentage}
            sx={{ color: isUpTrending ? green[400] : red[400] }}
          /> */}
          {/* <Box
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
          </Box> */}
        </Box>
      </Stack>
    </Box>
  );
}
