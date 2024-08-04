import { Alert, Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useMountedState } from 'react-use';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { useLazyGetPaymentInfoQuery } from 'store/api/tournament/shared/fund';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { PaymentInfoPayload } from 'types/tournament/fund';
import { checkFinalizedApplicants } from 'utils/tournament';

import { WrapperContainer } from '../../Common/StyledComponent';
import PaymentInfo from '../Shared/PaymentInfo';
import PaymentForm from './PaymentForm';
import UserPaymentList from './UserPaymentList';

export default function CreatorFund() {
  const isMounted = useMountedState();
  const tournamentData = useAppSelector(selectTournamentData);

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoPayload | null>(null);
  const [getPaymentInfoRequest, { isLoading, isFetching }] = useLazyGetPaymentInfoQuery();

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

  if (isLoading || isFetching || !isMounted()) {
    return (
      <WrapperContainer>
        <CenterLoading />
      </WrapperContainer>
    );
  }

  if (!paymentInfo) {
    return (
      <WrapperContainer>
        <PaymentForm onAddPaymentInfo={handleAddPaymentInfo} />
      </WrapperContainer>
    );
  }

  return (
    <WrapperContainer>
      <PaymentInfo paymentInfo={paymentInfo} />
      {checkFinalizedApplicants(tournamentData.phase) ? (
        <UserPaymentList />
      ) : (
        <Box mt={4}>
          <Alert severity="info">You need to finalize the list of applicants so you can manage the fund.</Alert>
        </Box>
      )}
    </WrapperContainer>
  );
}
