import { GroupTournamentPhase } from 'constants/group-tournament';

export const PhaseMappingNumber: {
  [key in GroupTournamentPhase]: number;
} = {
  [GroupTournamentPhase.NEW]: 0,
  [GroupTournamentPhase.PUBLISHED]: 1,
  [GroupTournamentPhase.GENERATED_FIXTURES]: 2,
  [GroupTournamentPhase.SCORED_MATCHES]: 3,
  [GroupTournamentPhase.COMPLETED]: 4,
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
