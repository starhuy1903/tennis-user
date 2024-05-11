import { ParticipantType, TournamentFormat } from 'constants/tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';

import { Round } from './tournament-fixtures';

export type GroupTournamentFixture = {
  rounds: Round[];
  format: Omit<TournamentFormat, TournamentFormat.GROUP_PLAYOFF>;
  participantType: ParticipantType.SINGLE;
  status: FixtureStatus;
};
