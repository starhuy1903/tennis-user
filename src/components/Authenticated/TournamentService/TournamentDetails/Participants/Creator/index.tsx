import { Alert, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store';

import { TournamentPhase } from 'constants/tournament';
import { selectTournamentData } from 'store/slice/tournamentSlice';

import ParticipantList from '../Shared/ParticipantList';
import ApplicantList from './ApplicantList';

export default function CreatorParticipant() {
  const tournamentData = useAppSelector(selectTournamentData);

  switch (tournamentData.phase) {
    case TournamentPhase.NEW:
      return (
        <Box mt={4}>
          <Alert severity="info">
            You need to publish the tournament first in the{' '}
            <Link to={`/tournaments/${tournamentData.id}/info`}>Information</Link> tab.
          </Alert>
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
