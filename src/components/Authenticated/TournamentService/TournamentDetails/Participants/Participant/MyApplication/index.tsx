import { Alert, Box, Button } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { ModalKey } from 'constants/modal';
import { RegistrationStatus } from 'constants/tournament-participants';
import { useGetMyApplicationQuery, useLazyGetInvitationsQuery } from 'store/api/tournament/participant/participant';
import { showModal } from 'store/slice/modalSlice';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';
import { OpenTournament } from 'types/tournament';
import { checkExpiredDate } from 'utils/datetime';

import ApplicationForm from './ApplicationForm';
import Invitations from './Invitations';

export default function MyApplication({ tournament }: { tournament: OpenTournament }) {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const [invitations, setInvitations] = useState<{
    inviting: OpenTournamentApplicant[];
    canceled: OpenTournamentApplicant[];
  }>({
    inviting: [],
    canceled: [],
  });

  const {
    data: myApplication,
    isLoading: fetchingApplication,
    refetch: fetchMyApplication,
  } = useGetMyApplicationQuery(tournament.id, { refetchOnMountOrArgChange: true });
  const [getInvitations, { isLoading: fetchingInvitations }] = useLazyGetInvitationsQuery();

  const isRegistered = myApplication && myApplication.status !== RegistrationStatus.CANCELED;

  useEffect(() => {
    (async () => {
      try {
        const responses = await Promise.all([
          getInvitations(
            {
              tournamentId: tournament.id,
              status: RegistrationStatus.INVITING,
            },
            true
          ).unwrap(),
          getInvitations(
            {
              tournamentId: tournament.id,
              status: RegistrationStatus.CANCELED,
            },
            true
          ).unwrap(),
        ]);

        setInvitations({
          inviting: responses[0],
          canceled: responses[1],
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getInvitations, tournament.id]);

  const handleRegister = async () => {
    const showRegisterModal = () => {
      dispatch(
        showModal(ModalKey.REGISTER_TOURNAMENT, {
          tournament,
          onSuccess: fetchMyApplication,
        })
      );
    };

    if (!invitations.inviting?.length) {
      showRegisterModal();
      return;
    }

    confirm({ description: 'Creating a tournament application will cancel all invitations from others.' })
      .then(showRegisterModal)
      .catch(() => {});
  };

  if (fetchingApplication || fetchingInvitations) {
    return <CenterLoading />;
  }

  if (!isRegistered && checkExpiredDate(tournament.registrationDueDate)) {
    return (
      <Box mt={4}>
        <Alert severity="error">
          The registration deadline has passed. You can no longer register for this tournament.
        </Alert>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      {isRegistered ? (
        <ApplicationForm
          data={myApplication}
          fetchMyApplication={fetchMyApplication}
        />
      ) : (
        <Box>
          <Box
            sx={{
              backgroundImage: `url('https://images.pexels.com/photos/5741299/pexels-photo-5741299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'start',
              height: 500,
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <Button
              size="large"
              variant="contained"
              onClick={handleRegister}
              sx={{ mb: 4, mr: 4 }}
            >
              Register To Join Tournament
            </Button>
          </Box>

          <Invitations
            title="Invitations"
            invitations={invitations.inviting}
            fetchMyApplication={fetchMyApplication}
          />

          <Invitations
            title="Canceled Invitations"
            invitations={invitations.canceled}
            fetchMyApplication={fetchMyApplication}
          />
        </Box>
      )}
    </Box>
  );
}
