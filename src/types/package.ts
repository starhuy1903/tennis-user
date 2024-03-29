type BaseService = {
  id: string;
  used: number;
};

export enum ServiceType {
  GROUP = 'group',
  TOURNAMENT = 'tournament',
}

export type GroupService = BaseService & {
  type: ServiceType.GROUP;
  maxGroups: number;
};

enum TournamentLevel {
  BASIC = 'basic',
  ADVANCED = 'advanced',
}

export type TournamentService = BaseService & {
  type: ServiceType.TOURNAMENT;
  maxTournaments: number;
  level: TournamentLevel;
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
  id: string;
  name: string;
  services: Service[];
  hasExpired: boolean;
  startDate: string;
  endDate: string;
};
