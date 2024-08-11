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

export const TournamentStatusOptions = {
  [TournamentStatus.UPCOMING]: 'Upcoming',
  [TournamentStatus.ON_GOING]: 'On Going',
  [TournamentStatus.COMPLETED]: 'Completed',
};

export const TournamentStatusChip: {
  [key in TournamentStatus]: {
    label: string;
    color: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  };
} = {
  [TournamentStatus.UPCOMING]: {
    label: 'Upcoming',
    color: 'info',
  },
  [TournamentStatus.ON_GOING]: {
    label: 'On Going',
    color: 'warning',
  },
  [TournamentStatus.COMPLETED]: {
    label: 'Completed',
    color: 'success',
  },
};

export enum TournamentPhase {
  NEW = 'new',
  PUBLISHED = 'published',
  FINALIZED_APPLICANTS = 'finalized_applicants',
  GENERATED_FIXTURES = 'generated_fixtures',
  SCORED_MATCHES = 'scored_matches',
  COMPLETED = 'completed',
}

export const TournamentPhaseOptions = {
  [TournamentPhase.NEW]: 'New',
  [TournamentPhase.PUBLISHED]: 'Publish',
  [TournamentPhase.FINALIZED_APPLICANTS]: 'Finalize Applicants',
  [TournamentPhase.GENERATED_FIXTURES]: 'Generate Fixtures',
  [TournamentPhase.SCORED_MATCHES]: 'Score Matches',
  [TournamentPhase.COMPLETED]: 'Complete',
};

export const defaultTournamentImage =
  'https://t3.ftcdn.net/jpg/03/11/61/86/360_F_311618663_ynyUAkKbB6qqiesNr86bLa0G8tg6zcGn.jpg';

export enum TournamentRole {
  PARTICIPANT = 'participant',
  CREATOR = 'creator',
  REFEREE = 'referee',
  VIEWER = 'viewer',
}
