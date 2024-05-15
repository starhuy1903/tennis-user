import { Alert, Box } from '@mui/material';
import { useAppSelector } from 'store';

import { TournamentPhase } from 'constants/tournament';
import { checkTournamentRole, selectTournamentData } from 'store/slice/tournamentSlice';

import ApplicantList from './ApplicantList';
import MyApplication from './MyApplication';
import ParticipantList from './ParticipantList';

export default function Participants() {
  const tournamentData = useAppSelector(selectTournamentData);

  const { isCreator } = useAppSelector(checkTournamentRole);

  if (isCreator && tournamentData.phase === TournamentPhase.NEW) {
    return (
      <Box mt={4}>
        <Alert severity="info">You need to publish the tournament first to see the participants.</Alert>
      </Box>
    );
  }

  if (tournamentData.phase === TournamentPhase.PUBLISHED) {
    if (isCreator) {
      return <ApplicantList />;
    } else {
      return <MyApplication tournament={tournamentData} />;
    }
  }

  return <ParticipantList />;
}
