import { useAppSelector } from 'store';

import { checkTournamentRole } from 'store/slice/tournamentSlice';

import CreatorFund from './Creator';
import ParticipantFund from './Participant';

export default function Fund() {
  const { isCreator } = useAppSelector(checkTournamentRole);

  if (isCreator) {
    return <CreatorFund />;
  }

  return <ParticipantFund />;
}
