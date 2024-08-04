export enum ServiceType {
  GROUP = 'group',
  TOURNAMENT = 'tournament',
  ADVERTISEMENT = 'advertisement',
}

export const ServiceTypeOptions = {
  [ServiceType.GROUP]: 'Group',
  [ServiceType.TOURNAMENT]: 'Tournament',
  [ServiceType.ADVERTISEMENT]: 'Advertisement',
};

export enum ServiceLevel {
  BASIC = 'basic',
  ADVANCED = 'advanced',
}

export const ServiceLevelOptions = {
  [ServiceLevel.BASIC]: 'Basic',
  [ServiceLevel.ADVANCED]: 'Advanced',
};
