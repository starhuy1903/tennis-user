import { TournamentPhase } from 'constants/tournament';

const PhaseNumber = {
  [TournamentPhase.NEW]: 0,
  [TournamentPhase.PUBLISHED]: 1,
  [TournamentPhase.FINALIZED_APPLICANTS]: 2,
  [TournamentPhase.GENERATED_FIXTURES]: 3,
  [TournamentPhase.SCORED_MATCHES]: 4,
  [TournamentPhase.COMPLETED]: 5,
};

export const checkGeneratedFixture = (tournamentPhase: TournamentPhase) => {
  const currentPhaseNumber = PhaseNumber[tournamentPhase];
  return currentPhaseNumber >= PhaseNumber[TournamentPhase.GENERATED_FIXTURES];
};

export const checkPublishedTournament = (tournamentPhase: TournamentPhase) => {
  const currentPhaseNumber = PhaseNumber[tournamentPhase];
  return currentPhaseNumber >= PhaseNumber[TournamentPhase.PUBLISHED];
};
