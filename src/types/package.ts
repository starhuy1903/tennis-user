import { ServiceLevel, ServiceType } from 'constants/service';

type BaseService = {
  id: string;
  name: string;
  level: ServiceLevel;
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
  };
};

export type AdvertisementService = BaseService & {
  type: ServiceType.ADVERTISEMENT;
  config: {
    maxAdvertisements: number;
    used: number;
  };
};

export type Service = GroupService | TournamentService | AdvertisementService;

export enum PackageType {
  TOURNAMENT = 'tournament',
  GROUP = 'group',
  ADVERTISEMENT = 'advertisement',
  MIXED = 'mixed',
}

export type Package = {
  id: number;
  name: string;
  price: number;
  duration: number;
  images: string[];
  description: string;
  features: string[];
  services: Service[];
};

export type UserPackage = {
  id: string;
  name: string;
  services: Service[];
  expired: boolean;
  startDate: string;
  endDate: string;
  orderId?: string;
};
