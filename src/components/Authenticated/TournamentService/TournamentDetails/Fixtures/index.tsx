import { useAppSelector } from 'store';

import { checkTournamentRole } from 'store/slice/tournamentSlice';

import CreatorFixture from './Creator';
import ParticipantFixture from './Participant';

export default function Fixtures() {
  const { isCreator } = useAppSelector(checkTournamentRole);

  if (isCreator) {
    return <CreatorFixture />;
  }

  return <ParticipantFixture />;
}
