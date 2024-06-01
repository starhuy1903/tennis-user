import { useAppSelector } from 'store';

import { checkTournamentRole } from 'store/slice/tournamentSlice';

import CreatorParticipant from './Creator';
import Participant from './Participant';

export default function Participants() {
  const { isCreator } = useAppSelector(checkTournamentRole);

  if (isCreator) {
    return <CreatorParticipant />;
  }

  return <Participant />;
}
