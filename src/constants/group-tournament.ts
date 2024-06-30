export enum GroupTournamentFormat {
  ROUND_ROBIN = 'round_robin',
  KNOCKOUT = 'knockout',
}

export const GroupTournamentFormatOptions = {
  [GroupTournamentFormat.ROUND_ROBIN]: 'Round Robin',
  [GroupTournamentFormat.KNOCKOUT]: 'Knockout',
};

export enum GroupTournamentStatus {
  UPCOMING = 'upcoming',
  ON_GOING = 'on_going',
  COMPLETED = 'completed',
}

export const GroupTournamentStatusOptions = {
  [GroupTournamentStatus.UPCOMING]: 'Upcoming',
  [GroupTournamentStatus.ON_GOING]: 'On Going',
  [GroupTournamentStatus.COMPLETED]: 'Completed',
};

export enum GroupTournamentPhase {
  NEW = 'new',
  PUBLISHED = 'published',
  FINALIZED_APPLICANTS = 'finalized_applicants',
  GENERATED_FIXTURES = 'generated_fixtures',
  SCORED_MATCHES = 'scored_matches',
  COMPLETED = 'completed',
}

export const GroupTournamentPhaseOptions = {
  [GroupTournamentPhase.NEW]: 'New',
  [GroupTournamentPhase.PUBLISHED]: 'Published',
  [GroupTournamentPhase.FINALIZED_APPLICANTS]: 'Finalized Applicants',
  [GroupTournamentPhase.GENERATED_FIXTURES]: 'Generated Fixtures',
  [GroupTournamentPhase.SCORED_MATCHES]: 'Scored Matches',
  [GroupTournamentPhase.COMPLETED]: 'Completed',
};
