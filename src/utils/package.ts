import { Service, ServiceType, TournamentService, UserPackage } from 'types/package';

export const isTournamentServiceType = (service: Service): service is TournamentService => {
  return service.type === ServiceType.TOURNAMENT;
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
