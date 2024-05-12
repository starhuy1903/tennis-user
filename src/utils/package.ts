import { GroupService, Service, ServiceType, TournamentService, UserPackage } from 'types/package';

export const isTournamentServiceType = (service: Service): service is TournamentService => {
  return service.type === ServiceType.TOURNAMENT;
};

export const isGroupServiceType = (service: Service): service is GroupService => {
  return service.type === ServiceType.GROUP;
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

export const isValidService = (service: Service) => {
  if (isTournamentServiceType(service)) {
    return service.config.used < service.config.maxTournaments;
  }

  if (isGroupServiceType(service)) {
    return service.config.used < service.config.maxGroups;
  }

  return false;
};
