import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';

import { FormatDateTime } from 'constants/datetime';
import { PaymentInfoPayload } from 'types/tournament/fund';
import { displayDateTime } from 'utils/datetime';

import { units } from './PaymentForm';

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
  return (
    <Box>
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader
          title="Payment information"
          subheader
        ></CardHeader>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
          >
            <Box>
              <Box>
                <Typography
                  display="inline"
                  fontWeight="bold"
                  marginRight="10px"
                >
                  Bank
                </Typography>
                <Typography display="inline">{paymentInfo.payment.bank.name}</Typography>
              </Box>
              <Box>
                <Typography
                  display="inline"
                  fontWeight="bold"
                  marginRight="10px"
                >
                  Account
                </Typography>
                <Typography display="inline">{paymentInfo.payment.bank.account}</Typography>
              </Box>
              <Box>
                <Typography
                  display="inline"
                  fontWeight="bold"
                  marginRight="10px"
                >
                  Owner
                </Typography>
                <Typography display="inline">{paymentInfo.payment.bank.owner}</Typography>
              </Box>
              <Box>
                <Typography
                  display="inline"
                  fontWeight="bold"
                  marginRight="10px"
                >
                  Amount
                </Typography>
                <Typography display="inline">
                  {paymentInfo.amount} {units.find((unit) => unit.value === paymentInfo.unit)?.label}
                </Typography>
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
            <Box>
              <img
                src={paymentInfo.image}
                alt=""
                style={{ width: '140px', height: '140px', objectFit: 'cover' }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
