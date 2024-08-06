import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';

import { FormatDateTime } from 'constants/datetime';
import { PaymentInfoPayload } from 'types/tournament/fund';
import { displayDateTime } from 'utils/datetime';

// import { units } from '../Creator/PaymentForm';

type PaymentInfoProps = {
  paymentInfo: PaymentInfoPayload;
};

const displayDate = (date: string) => {
  return displayDateTime({
    dateTime: date,
    targetFormat: FormatDateTime.DATE_2,
  });
};

export default function PaymentInfo({ paymentInfo }: PaymentInfoProps) {
  const paymentAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(paymentInfo.amount || 0);

  return (
    <Box>
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader
          title="Payment information"
          subheader
        />
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            gap={4}
          >
            <Box>
              <Box>
                <Typography
                  display="inline"
                  fontWeight="bold"
                  marginRight="10px"
                >
                  Method
                </Typography>
                <Typography display="inline">
                  {paymentInfo.payment.method.charAt(0).toUpperCase()}
                  {paymentInfo.payment.method.slice(1)}
                </Typography>
              </Box>
              {paymentInfo.payment.information && (
                <Box>
                  <Typography
                    display="inline"
                    fontWeight="bold"
                    marginRight="10px"
                  >
                    Payment description
                  </Typography>
                  <Typography display="inline">{paymentInfo.payment.information}</Typography>
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
                <Typography display="inline">{paymentAmount}</Typography>
              </Box>

              <Box>
                <Typography
                  display="inline"
                  fontWeight="bold"
                  marginRight="10px"
                >
                  Reminder date
                </Typography>
                <Typography display="inline">{displayDate(paymentInfo.reminderDate)}</Typography>
              </Box>
              <Box>
                <Typography
                  display="inline"
                  fontWeight="bold"
                  marginRight="10px"
                >
                  Due date
                </Typography>
                <Typography display="inline">{displayDate(paymentInfo.dueDate)}</Typography>
              </Box>
            </Box>
            {paymentInfo.payment.image && (
              <Box>
                <img
                  src={paymentInfo.payment.image}
                  alt=""
                  style={{ width: '140px', height: '140px', objectFit: 'cover' }}
                />
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
