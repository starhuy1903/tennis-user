import { Alert, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store';

import { TournamentPhase } from 'constants/tournament';
import { checkTournamentRole, selectTournamentData } from 'store/slice/tournamentSlice';

export default function InformationSection() {
  const tournamentData = useAppSelector(selectTournamentData);
  const { isCreator } = useAppSelector(checkTournamentRole);

  if (isCreator) {
    if (tournamentData.phase === TournamentPhase.NEW) {
      return (
        <Box mt={4}>
          <Alert severity="info">
            You need to publish the tournament first in the{' '}
            <Link to={`/tournaments/${tournamentData.id}/info`}>Information</Link> tab.
          </Alert>
        </Box>
      );
    }

    return null;
  }

  return null;
}
