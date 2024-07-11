import { ServiceType } from 'constants/service';
import { AdvertisementService, GroupService, Service, TournamentService, UserPackage } from 'types/package';

export const isTournamentServiceType = (service: Service): service is TournamentService => {
  return service.type === ServiceType.TOURNAMENT;
};

export const isGroupServiceType = (service: Service): service is GroupService => {
  return service.type === ServiceType.GROUP;
};

export const isAdvertisementServiceType = (service: Service): service is AdvertisementService => {
  return service.type === ServiceType.ADVERTISEMENT;
};

export const getUsedTournamentService = (packageData: UserPackage) => {
  return packageData.services.find(
    (service) => isTournamentServiceType(service) && service.config.used < service.config.maxTournaments
  ) as TournamentService;
};

export const getValidTournamentPackages = (myPackageData: UserPackage[]): UserPackage[] => {
  return myPackageData.filter((boughtPackage) => {
    return !boughtPackage.expired && !!getUsedTournamentService(boughtPackage);
  });
};

export const getUsedGroupService = (packageData: UserPackage) => {
  return packageData.services.find(
    (service) => isGroupServiceType(service) && service.config.used < service.config.maxGroups
  ) as GroupService;
};

export const getValidGroupPackages = (myPackageData: UserPackage[]): UserPackage[] => {
  return myPackageData.filter((boughtPackage) => {
    return !boughtPackage.expired && !!getUsedGroupService(boughtPackage);
  });
};

export const getUsedAdvertisementService = (packageData: UserPackage) => {
  return packageData.services.find(
    (service) => isAdvertisementServiceType(service) && service.config.used < service.config.maxAdvertisements
  ) as AdvertisementService;
};

export const getValidAdvertisementPackages = (myPackageData: UserPackage[]): UserPackage[] => {
  return myPackageData.filter((boughtPackage) => {
    return !boughtPackage.expired && boughtPackage.services.some(isAdvertisementServiceType);
  });
};

export const isValidService = (service: Service) => {
  if (isTournamentServiceType(service)) {
    return service.config.used < service.config.maxTournaments;
  }

  if (isGroupServiceType(service)) {
    return service.config.used < service.config.maxGroups;
  }

  if (isAdvertisementServiceType(service)) {
    return service.config.used < service.config.maxAdvertisements;
  }

  return false;
};
