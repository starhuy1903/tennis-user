export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  ANY = 'any',
}

export const GenderOptions = {
  [Gender.MALE]: 'Male',
  [Gender.FEMALE]: 'Female',
  [Gender.ANY]: 'Any',
};

export enum TournamentFormat {
  ROUND_ROBIN = 'round_robin',
  KNOCKOUT = 'knockout',
  GROUP_PLAYOFF = 'group_playoff',
}

export const TournamentFormatOptions = {
  [TournamentFormat.ROUND_ROBIN]: 'Round Robin',
  [TournamentFormat.KNOCKOUT]: 'Knockout',
  [TournamentFormat.GROUP_PLAYOFF]: 'Group Playoff',
};

export enum ParticipantType {
  SINGLE = 'single',
  DOUBLES = 'doubles',
  MIXED_DOUBLES = 'mixed_doubles',
}

export const ParticipantTypeOptions = {
  [ParticipantType.SINGLE]: 'Single',
  [ParticipantType.DOUBLES]: 'Doubles',
  [ParticipantType.MIXED_DOUBLES]: 'Mixed Doubles',
};

export enum TournamentStatus {
  UPCOMING = 'upcoming',
  ON_GOING = 'on_going',
  COMPLETED = 'completed',
}

export enum TournamentPhase {
  NEW = 'new',
  PUBLISHED = 'published',
  FINALIZED_APPLICANTS = 'finalized_applicants',
  GENERATED_FIXTURES = 'generated_fixtures',
  SCORED_MATCHES = 'scored_matches',
  COMPLETED = 'completed',
}

export enum TournamentLevel {
  BASIC = 'basic',
  ADVANCED = 'advanced',
}
