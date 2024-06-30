import { Box } from '@mui/material';

import { PaymentInfoPayload } from 'types/tournament/fund';

type ParticipantFundProps = {
  paymentInfo?: PaymentInfoPayload | null;
};

export default function ParticipantFund({ paymentInfo }: ParticipantFundProps) {
  console.log({ paymentInfo });

  return <Box />;
}
