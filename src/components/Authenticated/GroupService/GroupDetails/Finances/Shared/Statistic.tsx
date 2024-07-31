import { Box, Stack, Typography } from '@mui/material';
import { lightGreen, orange } from '@mui/material/colors';

import { GeneralFinanceInfo } from 'types/expense';

import pigImg from 'assets/images/group/finance/pig.png';
import totalImg from 'assets/images/group/finance/total.png';

const StatisticItem = ({
  title,
  amountStr,
  bgColor,
  rightIcon,
  width,
  isLoading,
  amountTypographyProps,
  renderInfo,
}: {
  title?: string;
  amountStr?: string;
  bgColor: string;
  rightIcon: string;
  width?: number;
  isLoading?: boolean;
  amountTypographyProps?: any;
  renderInfo?: () => React.ReactNode;
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
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          Loading...
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          height="100%"
          p={2}
        >
          {renderInfo ? (
            renderInfo()
          ) : (
            <Stack>
              <Typography fontSize={16}>{title}</Typography>
              <Typography
                fontSize={24}
                {...amountTypographyProps}
              >
                {amountStr}
              </Typography>
            </Stack>
          )}
          <Box>
            <img
              src={rightIcon}
              alt=""
              style={{ width: 150 }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

type StatisticProps = {
  isLoading: boolean;
  generalFinanceInfo?: GeneralFinanceInfo;
};

export default function Statistic({ isLoading, generalFinanceInfo }: StatisticProps) {
  const balanceNumber = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(generalFinanceInfo?.balance || 0);

  const currentAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(generalFinanceInfo?.currentFund?.currentAmount || 0);

  const targetAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(generalFinanceInfo?.currentFund?.targetAmount || 0);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      gap={8}
    >
      <StatisticItem
        title="Total"
        amountStr={`${balanceNumber}`}
        bgColor={orange[200]}
        rightIcon={totalImg}
        isLoading={isLoading}
        amountTypographyProps={{ fontWeight: 700 }}
      />
      <StatisticItem
        bgColor={lightGreen[200]}
        rightIcon={pigImg}
        isLoading={isLoading}
        renderInfo={() => {
          return generalFinanceInfo?.currentFund ? (
            <Stack>
              <Typography fontSize={16}>{generalFinanceInfo.currentFund.title}</Typography>
              <Box>
                <Typography
                  component="span"
                  fontSize={24}
                >
                  {currentAmount}
                </Typography>{' '}
                /{' '}
                <Typography
                  component="span"
                  fontSize={24}
                >
                  {targetAmount}
                </Typography>
              </Box>
            </Stack>
          ) : (
            <Box>No fund</Box>
          );
        }}
      />
    </Box>
  );
}
