import { PackageType } from 'constants/package';
import { ServiceLevel, ServiceType } from 'constants/service';

type BaseService = {
  id: string;
  name: string;
  level: ServiceLevel;
  createdAt: string;
  updatedAt: string;
};

export type GroupService = BaseService & {
  type: ServiceType.GROUP;
  config: {
    maxGroups: number;
    used: number;
    maxMembers: number;
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

export type Package = {
  id: number;
  name: string;
  price: number;
  duration: number;
  images: string[];
  description: string;
  features: string[];
  services: Service[];
  type: PackageType;
  createdAt: string;
  updatedAt: string;
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
