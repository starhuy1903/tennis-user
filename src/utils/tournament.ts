import { TournamentPhase } from 'constants/tournament';

export const PhaseMappingNumber: {
  [key in TournamentPhase]: number;
} = {
  [TournamentPhase.NEW]: 0,
  [TournamentPhase.PUBLISHED]: 1,
  [TournamentPhase.FINALIZED_APPLICANTS]: 2,
  [TournamentPhase.GENERATED_FIXTURES]: 3,
  [TournamentPhase.SCORED_MATCHES]: 4,
  [TournamentPhase.COMPLETED]: 5,
};

export const checkGeneratedFixture = (tournamentPhase: TournamentPhase) => {
  const currentPhaseNumber = PhaseMappingNumber[tournamentPhase];
  return currentPhaseNumber >= PhaseMappingNumber[TournamentPhase.GENERATED_FIXTURES];
};

export const checkPublishedTournament = (tournamentPhase: TournamentPhase) => {
  const currentPhaseNumber = PhaseMappingNumber[tournamentPhase];
  return currentPhaseNumber >= PhaseMappingNumber[TournamentPhase.PUBLISHED];
};

export const getNextPhaseInString = (tournamentPhase: TournamentPhase) => {
  const currentPhaseNumber = PhaseMappingNumber[tournamentPhase];
  const nextPhaseNumber = currentPhaseNumber + 1;
  return (
    Object.keys(PhaseMappingNumber).find((key) => PhaseMappingNumber[key as TournamentPhase] === nextPhaseNumber) ||
    TournamentPhase.COMPLETED
  );
};
