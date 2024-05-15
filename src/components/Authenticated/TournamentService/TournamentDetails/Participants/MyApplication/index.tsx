import { Alert, Box, Button } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { ModalKey } from 'constants/modal';
import { RegistrationStatus } from 'constants/tournament-participants';
import {
  useLazyGetInvitationsQuery,
  useLazyGetMyApplicationQuery,
} from 'store/api/tournament/tournamentParticipantsApiSlice';
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
  const [myApplication, setMyApplication] = useState<OpenTournamentApplicant | null>(null);

  const [getApplication, { isLoading: fetchingApplycation }] = useLazyGetMyApplicationQuery();
  const [getInvitations, { isLoading: fetchingInvitations }] = useLazyGetInvitationsQuery();

  useEffect(() => {
    (async () => {
      try {
        const responses = await Promise.all([
          getApplication(tournament.id, true).unwrap(), // Cache to avoid multiple requests
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

        setMyApplication(responses[0]);
        setInvitations({
          inviting: responses[1],
          canceled: responses[2],
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getApplication, getInvitations, tournament.id]);

  const handleRegister = async () => {
    const showRegisterModal = () => {
      dispatch(
        showModal(ModalKey.REGISTER_TOURNAMENT, {
          tournamentId: tournament.id,
          participantType: tournament.participantType,
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

  if (fetchingApplycation || fetchingInvitations) {
    return <CenterLoading />;
  }

  if (checkExpiredDate(tournament.registrationDueDate)) {
    return (
      <Box mt={4}>
        <Alert severity="error">
          The registration deadline has passed. You can no longer register for this tournament.
        </Alert>
      </Box>
    );
  }

  return (
    <Box my={5}>
      {myApplication && myApplication.status !== RegistrationStatus.CANCELED ? (
        <ApplicationForm data={myApplication} />
      ) : (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              size="large"
              variant="contained"
              onClick={handleRegister}
            >
              Register To Join Tournament
            </Button>
          </Box>

          <Invitations
            title="Invitations"
            invitations={invitations.inviting}
          />

          <Invitations
            title="Canceled Invitations"
            invitations={invitations.canceled}
          />
        </Box>
      )}
    </Box>
  );
}
