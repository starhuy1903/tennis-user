import { Alert } from '@mui/material';
import { useAppSelector } from 'store';

import { checkTournamentRole } from 'store/slice/tournamentSlice';

import { WrapperContainer } from '../Common/StyledComponent';
import CreatorFund from './Creator';
import ParticipantFund from './Participant';

export default function Fund() {
  const { isCreator, isViewer } = useAppSelector(checkTournamentRole);

  if (isViewer) {
    return (
      <WrapperContainer>
        <Alert severity="info">No information to show!</Alert>
      </WrapperContainer>
    );
  }

  if (isCreator) {
    return <CreatorFund />;
  }

  return <ParticipantFund />;
}
