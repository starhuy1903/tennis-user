import { Alert, Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { useLazyGetPaymentInfoQuery } from 'store/api/tournament/shared/fund';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { PaymentInfoPayload } from 'types/tournament/fund';
import { checkFinalizedApplicants } from 'utils/tournament';

import PaymentInfo from '../Shared/PaymentInfo';
import PaymentForm from './PaymentForm';
import UserPaymentList from './UserPaymentList';

export default function CreatorFund() {
  const tournamentData = useAppSelector(selectTournamentData);

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoPayload | null>(null);
  const [getPaymentInfoRequest, { isLoading }] = useLazyGetPaymentInfoQuery({ refetchOnReconnect: true });

  const handleAddPaymentInfo = useCallback((data: PaymentInfoPayload) => {
    setPaymentInfo(data);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await getPaymentInfoRequest(tournamentData.id).unwrap();
        setPaymentInfo(res);
      } catch (error) {
        // handled error
      }
    })();
  }, [getPaymentInfoRequest, tournamentData.id]);

  if (isLoading) {
    return <CenterLoading />;
  }

  if (!paymentInfo) {
    return (
      <Box my={2}>
        <PaymentForm onAddPaymentInfo={handleAddPaymentInfo} />
      </Box>
    );
  }

  return (
    <Box my={2}>
      <PaymentInfo paymentInfo={paymentInfo} />
      {checkFinalizedApplicants(tournamentData.phase) ? (
        <UserPaymentList />
      ) : (
        <Box mt={4}>
          <Alert severity="info">You need to finalize the list of applicants so you can manage the fund.</Alert>
        </Box>
      )}
    </Box>
  );
}
