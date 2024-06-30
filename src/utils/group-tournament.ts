import { GroupTournamentPhase } from 'constants/group-tournament';

export const PhaseMappingNumber: {
  [key in GroupTournamentPhase]: number;
} = {
  [GroupTournamentPhase.NEW]: 0,
  [GroupTournamentPhase.PUBLISHED]: 1,
  [GroupTournamentPhase.FINALIZED_APPLICANTS]: 2,
  [GroupTournamentPhase.GENERATED_FIXTURES]: 3,
  [GroupTournamentPhase.SCORED_MATCHES]: 4,
  [GroupTournamentPhase.COMPLETED]: 5,
};

export const getNextPhaseInString = (groupTournamentPhase: GroupTournamentPhase) => {
  const currentPhaseNumber = PhaseMappingNumber[groupTournamentPhase];
  const nextPhaseNumber = currentPhaseNumber + 1;
  return (
    Object.keys(PhaseMappingNumber).find(
      (key) => PhaseMappingNumber[key as GroupTournamentPhase] === nextPhaseNumber
    ) || GroupTournamentPhase.COMPLETED
  );
};

export const checkPublishedTournament = (tournamentPhase: GroupTournamentPhase) => {
  const currentPhaseNumber = PhaseMappingNumber[tournamentPhase];
  return currentPhaseNumber >= PhaseMappingNumber[GroupTournamentPhase.PUBLISHED];
};

export const checkFinalizedApplicants = (tournamentPhase: GroupTournamentPhase) => {
  const currentPhaseNumber = PhaseMappingNumber[tournamentPhase];
  return currentPhaseNumber >= PhaseMappingNumber[GroupTournamentPhase.FINALIZED_APPLICANTS];
};

export const checkGeneratedFixture = (tournamentPhase: GroupTournamentPhase) => {
  const currentPhaseNumber = PhaseMappingNumber[tournamentPhase];
  return currentPhaseNumber >= PhaseMappingNumber[GroupTournamentPhase.GENERATED_FIXTURES];
};
