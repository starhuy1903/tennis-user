import { useAppSelector } from 'store';

import { TournamentPhase } from 'constants/tournament';
import { selectTournamentData } from 'store/slice/tournamentSlice';

import ParticipantList from '../Shared/ParticipantList';
import MyApplication from './MyApplication';

export default function Participant() {
  const tournamentData = useAppSelector(selectTournamentData);

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
