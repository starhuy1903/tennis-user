import { Box, Stack, Typography } from '@mui/material';
import { lightGreen, orange } from '@mui/material/colors';

import pigImg from 'assets/images/group/finance/pig.png';
import totalImg from 'assets/images/group/finance/total.png';

const StatisticItem = ({
  title,
  amountStr,
  bgColor,
  rightIcon,
  width,
}: {
  title: string;
  amountStr: string;
  bgColor: string;
  rightIcon: string;
  width?: number;
}) => {
  return (
    <Box
      height={200}
      width={width}
      bgcolor={bgColor}
      borderRadius={4}
      sx={{ border: '1px solid', borderColor: 'divider' }}
      flex={1}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        height="100%"
        p={2}
      >
        <Stack>
          <Typography fontSize={16}>{title}</Typography>
          <Typography fontSize={24}>{amountStr}</Typography>
        </Stack>
        <Box>
          <img
            src={rightIcon}
            alt=""
            style={{ width: 150 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

// type StatisticProps = {};

export default function Statistic() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      gap={8}
    >
      <StatisticItem
        title="Total"
        amountStr="10.000.000 vnd"
        bgColor={orange[200]}
        rightIcon={totalImg}
      />
      <StatisticItem
        title="Quy thang 7"
        amountStr="100.000/600.000 VND"
        bgColor={lightGreen[200]}
        rightIcon={pigImg}
      />
    </Box>
  );
}
