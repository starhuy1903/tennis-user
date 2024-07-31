import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';

import { FormatDateTime } from 'constants/datetime';
import { FundRequestForMember } from 'types/expense';
import { displayDateTime } from 'utils/datetime';

import { PaymentStatus } from '../Creator/IncomeTable';

type FundInformationProps = {
  data: FundRequestForMember | null;
};

const displayDate = (date: string) => {
  return displayDateTime({
    dateTime: date,
    targetFormat: FormatDateTime.DATE_2,
  });
};

export default function FundInformation({ data }: FundInformationProps) {
  const amount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(data?.amount || 0);

  return (
    <Box>
      <Card
        sx={{ maxWidth: 700, bgcolor: 'white', borderRadius: 2 }}
        variant="outlined"
      >
        <CardHeader
          title={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                fontSize={24}
                fontWeight={700}
              >
                {data?.title || 'No title'}
              </Typography>
              {data?.status && PaymentStatus[data.status]}
            </Box>
          }
        />
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            gap={4}
          >
            <Box>
              {data?.paymentInfo && (
                <Box>
                  <Typography
                    display="inline"
                    fontWeight="bold"
                    marginRight="10px"
                  >
                    Payment description
                  </Typography>
                  <Typography display="inline">{data.paymentInfo}</Typography>
                </Box>
              )}
              <Box>
                <Typography
                  display="inline"
                  fontWeight="bold"
                  marginRight="10px"
                >
                  Amount
                </Typography>
                <Typography display="inline">{amount}</Typography>
              </Box>

              <Box>
                <Typography
                  display="inline"
                  fontWeight="bold"
                  marginRight="10px"
                >
                  Due date
                </Typography>
                <Typography display="inline">{displayDate(data?.dueDate || '')}</Typography>
                <Box>
                  <Typography
                    display="inline"
                    fontWeight="bold"
                    marginRight="10px"
                  >
                    Description
                  </Typography>
                  <Typography display="inline">{data?.description}</Typography>
                </Box>
              </Box>
              {data?.qrImage && (
                <Box>
                  <img
                    src={data.qrImage}
                    alt=""
                    style={{ width: '140px', height: '140px', objectFit: 'cover' }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
