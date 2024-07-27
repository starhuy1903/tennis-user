import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { FormatDateTime } from 'constants/datetime';
import { useConfirmMakingPaymentMutation, useLazyGetUserPaymentInfoQuery } from 'store/api/tournament/participant/fund';
import { useGetPaymentInfoQuery } from 'store/api/tournament/shared/fund';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { selectUser } from 'store/slice/userSlice';
import { UserPaymentInfoResponse, UserPaymentStatus } from 'types/tournament/fund';
import { displayDateTime } from 'utils/datetime';

import PaymentInfo from '../Shared/PaymentInfo';

export default function ParticipantFund() {
  const confirm = useConfirm();

  const tournamentData = useAppSelector(selectTournamentData);
  const user = useAppSelector(selectUser);

  const { data: paymentData, isLoading: isFetchingPaymentData } = useGetPaymentInfoQuery(tournamentData.id, {
    refetchOnMountOrArgChange: true,
  });

  const [userPaymentInfo, setUserPaymentInfo] = useState<UserPaymentInfoResponse | null>(null);
  const [getTeamPaymentInfoRequest] = useLazyGetUserPaymentInfoQuery();
  const [confirmMakingPaymentRequest, { isLoading: isConfirming }] = useConfirmMakingPaymentMutation();

  const handleConfirmPayment = useCallback(() => {
    confirm({ title: 'Confirm payment', description: 'Are you sure you want to confirm your payment?' }).then(
      async () => {
        try {
          const res = await confirmMakingPaymentRequest({
            tournamentId: tournamentData.id,
            message: `${user?.phoneNumber} ${user?.name}`,
          }).unwrap();
          setUserPaymentInfo(res);
        } catch (error) {
          // handled error
        }
      }
    );
  }, [confirm, confirmMakingPaymentRequest, tournamentData.id, user?.name, user?.phoneNumber]);

  useEffect(() => {
    (async () => {
      if (paymentData) {
        try {
          const res = await getTeamPaymentInfoRequest(tournamentData.id).unwrap();
          setUserPaymentInfo(res);
        } catch (error) {
          // handled error
        }
      }
    })();
  }, [getTeamPaymentInfoRequest, paymentData, tournamentData.id]);

  if (isFetchingPaymentData) {
    return <CenterLoading />;
  }

  if (!paymentData) {
    return (
      <Box mt={4}>
        <Alert severity="info">Payment information is not available.</Alert>
      </Box>
    );
  }

  return (
    <Box my={2}>
      {userPaymentInfo && (
        <Box mb={2}>
          {userPaymentInfo.status === UserPaymentStatus.WAIT && (
            <Alert severity="warning">
              You need to complete the payment before{' '}
              {displayDateTime({
                dateTime: paymentData.dueDate,
                targetFormat: FormatDateTime.DATE_2,
              })}
            </Alert>
          )}
          {userPaymentInfo.status === UserPaymentStatus.PENDING && (
            <Alert severity="info">
              Your payment has not been confirmed yet. Please wait for the admin for the confirmation.
            </Alert>
          )}
          {userPaymentInfo.status === UserPaymentStatus.SUCCEED && (
            <Alert severity="success">Your payment has been confirmed. Thank you!</Alert>
          )}
          {userPaymentInfo.status === UserPaymentStatus.FAILED && (
            <Alert severity="error">
              Your payment has failed. Please try again.{' '}
              {userPaymentInfo.errorMessage && `Admin: ${userPaymentInfo.errorMessage}`}
            </Alert>
          )}
        </Box>
      )}
      <Stack
        direction="row"
        gap={4}
        justifyContent="space-between"
      >
        <PaymentInfo paymentInfo={paymentData} />
        {userPaymentInfo && [UserPaymentStatus.WAIT, UserPaymentStatus.FAILED].includes(userPaymentInfo?.status) && (
          <Stack
            width="50%"
            gap={1}
            alignItems="flex-start"
          >
            <Typography>
              After you make a successful payment, click this confirmation button to let the admin double check your
              payment!
            </Typography>
            <Button
              variant="contained"
              onClick={handleConfirmPayment}
              disabled={isConfirming}
            >
              Confirm
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
