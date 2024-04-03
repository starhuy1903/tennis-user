import { TournamentLevel } from 'constants/tournament';

export enum ServiceType {
  GROUP = 'group',
  TOURNAMENT = 'tournament',
}

type BaseService = {
  id: string;
  name: string;
};

export type GroupService = BaseService & {
  type: ServiceType.GROUP;
  config: {
    maxGroups: number;
    used: number;
  };
};

export type TournamentService = BaseService & {
  type: ServiceType.TOURNAMENT;
  config: {
    maxTournaments: number;
    used: number;
    level: TournamentLevel;
  };
};

export type Service = GroupService | TournamentService;

export enum PackageType {
  TOURNAMENT = 'tournament',
  GROUP = 'group',
  MIXED = 'mixed',
}

export type Package = {
  id: number;
  name: string;
  price: number;
  description: string;
  type: PackageType;
  features: string[];
};

export type UserPackage = {
  id: number;
  name: string;
  services: Service[];
  expired: boolean;
  startDate: string;
  endDate: string;
};
