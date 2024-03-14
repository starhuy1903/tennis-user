export enum TournamentStatus {
  UPCOMING = 'upcoming',
  ON_GOING = 'on_going',
  COMPLETED = 'completed',
}

export enum TournamentFormat {
  ROUND_ROBIN = 'round_robin',
  KNOCKOUT = 'knockout',
  GROUP_PLAYOFF = 'group_playoff',
}

export type Tournament = {
  id: number;
  name: string;
  description: string;
  status: TournamentStatus;
  adminId: number;
  startDate: string;
  endDate: string;
  registrationDueDate: string;
  dueTime: string;
  contactName: string;
  contactNumber: string;
  contactEmail: string;
  tournamentFormat: TournamentFormat;
};
