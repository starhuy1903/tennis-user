import { TournamentPhase } from 'constants/tournament';
import { GeneratedGroup } from 'types/tournament-fixtures';

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

export const checkGeneratedFixtureTournament = (tournamentPhase: TournamentPhase) => {
  const currentPhaseNumber = PhaseMappingNumber[tournamentPhase];
  return currentPhaseNumber >= PhaseMappingNumber[TournamentPhase.GENERATED_FIXTURES];
};

export const getNextPhaseInString = (tournamentPhase: TournamentPhase) => {
  const currentPhaseNumber = PhaseMappingNumber[tournamentPhase];
  const nextPhaseNumber = currentPhaseNumber + 1;
  return (
    Object.keys(PhaseMappingNumber).find((key) => PhaseMappingNumber[key as TournamentPhase] === nextPhaseNumber) ||
    TournamentPhase.COMPLETED
  );
};

export const checkFinalizedApplicants = (tournamentPhase: TournamentPhase) => {
  const currentPhaseNumber = PhaseMappingNumber[tournamentPhase];
  return currentPhaseNumber >= PhaseMappingNumber[TournamentPhase.FINALIZED_APPLICANTS];
};

export const getSubmittedGroupData = (groupPlayoff: GeneratedGroup[]) => {
  return groupPlayoff.map((group) => ({
    ...group,
    teams: group.teams.map((team) => team.id),
  }));
};
