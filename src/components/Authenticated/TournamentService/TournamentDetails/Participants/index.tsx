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

  if (isCreator) {
    switch (tournamentData.phase) {
      case TournamentPhase.NEW:
        return (
          <Box mt={4}>
            <Alert severity="info">You need to publish the tournament first to see the participants.</Alert>
          </Box>
        );
      case TournamentPhase.PUBLISHED:
        return <ApplicantList />;
      case TournamentPhase.FINALIZED_APPLICANTS:
      case TournamentPhase.GENERATED_FIXTURES:
      case TournamentPhase.SCORED_MATCHES:
      case TournamentPhase.COMPLETED:
        return <ParticipantList />;
    }
  }

  switch (tournamentData.phase) {
    case TournamentPhase.NEW:
      return null;
    case TournamentPhase.PUBLISHED:
      return <MyApplication tournament={tournamentData} />;
    case TournamentPhase.FINALIZED_APPLICANTS:
    case TournamentPhase.GENERATED_FIXTURES:
    case TournamentPhase.SCORED_MATCHES:
    case TournamentPhase.COMPLETED:
      return <ParticipantList />;
  }
}
