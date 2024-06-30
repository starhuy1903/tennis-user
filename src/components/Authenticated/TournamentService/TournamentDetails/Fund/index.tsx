import { Alert, Box } from '@mui/material';
import { useAppSelector } from 'store';

import { checkTournamentRole } from 'store/slice/tournamentSlice';

import CreatorFund from './Creator';
import ParticipantFund from './Participant';

export default function Fund() {
  const { isCreator, isViewer } = useAppSelector(checkTournamentRole);

  if (isViewer) {
    return (
      <Box mt={4}>
        <Alert severity="info">No information to show!</Alert>
      </Box>
    );
  }

  if (isCreator) {
    return <CreatorFund />;
  }

  return <ParticipantFund />;
}
