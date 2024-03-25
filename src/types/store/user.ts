import { UserProfile } from 'types/user';

export enum ServiceType {
  GROUP = 'group',
  TOURNAMENT = 'tournament',
}

export type GroupService = {
  id: string;
  type: ServiceType.GROUP;
  maxGroups: number;
  used: number;
};

export type TournamentService = {
  id: string;
  type: ServiceType.TOURNAMENT;
  maxTournaments: number;
  used: number;
};

export type Service = GroupService | TournamentService;

export type Package = {
  id: string;
  name: string;
  services: Service[];
  hasExpired: boolean;
  startDate: string;
  endDate: string;
};

export type UserActions = {
  canCreateTournament: boolean;
};

export type UserSliceType = UserProfile & {
  isLoggedIn: boolean;
  actions: UserActions;
};
