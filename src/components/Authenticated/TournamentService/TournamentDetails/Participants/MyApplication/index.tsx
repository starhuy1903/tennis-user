import { Box, Button } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { ModalKey } from 'constants/modal';
import { RegistrationStatus } from 'constants/tournament-participants';
import { useGetMyApplicationQuery } from 'store/api/tournament/tournamentParticipantsApiSlice';
import { showModal } from 'store/slice/modalSlice';
import { selectTournament } from 'store/slice/tournamentSlice';
import { OpenTournament } from 'types/tournament';

import ApplicationForm from './ApplicationForm';
import Invitations from './Invitations';

export default function MyApplication({ tournament }: { tournament: OpenTournament }) {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const tournamentData = useAppSelector(selectTournament);

  const { data: myApplication, isLoading } = useGetMyApplicationQuery({ tournamentId: tournamentData.id });

  const handleRegister = async () => {
    confirm({ description: 'Creating a tournament application will cancel all invitations from others.' })
      .then(() =>
        dispatch(
          showModal(ModalKey.REGISTER_TOURNAMENT, {
            tournamentId: tournamentData.id,
            participantType: tournament.participantType,
          })
        )
      )
      .catch(() => {});
  };

  if (isLoading) {
    return <CenterLoading />;
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

          <Invitations status={RegistrationStatus.INVITING} />

          <Invitations status={RegistrationStatus.CANCELED} />
        </Box>
      )}
    </Box>
  );
}
