import { Box, Button } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { ModalKey } from 'constants/modal';
import { RegistrationStatus } from 'constants/tournament-participants';
import { useLazyGetMyApplicationQuery } from 'store/api/tournament/tournamentParticipantsApiSlice';
import { showModal } from 'store/slice/modalSlice';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';

import ApplicationForm from './ApplicationForm';
import Invitations from './Invitations';

export default function MyApplication() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const [myApplication, setMyApplication] = useState<OpenTournamentApplicant | null>(null);

  const { tournamentId } = useParams();

  const [getMyApplication, { isLoading }] = useLazyGetMyApplicationQuery();

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyApplication({ tournamentId: parseInt(tournamentId!) }).unwrap();

        setMyApplication(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getMyApplication, tournamentId]);

  const handleRegister = async () => {
    confirm({ description: 'Creating a tournament application will cancel all invitations from others.' })
      .then(() => dispatch(showModal(ModalKey.REGISTER_TOURNAMENT, { tournamentId: parseInt(tournamentId!) })))
      .catch(() => {});
  };

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Box my={5}>
      {myApplication ? (
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
