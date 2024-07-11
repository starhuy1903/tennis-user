export enum ServiceType {
  GROUP = 'group',
  TOURNAMENT = 'tournament',
  ADVERTISEMENT = 'advertisement',
}

export enum ServiceLevel {
  BASIC = 'basic',
  ADVANCED = 'advanced',
}

export const ServiceLevelOptions = {
  [ServiceLevel.BASIC]: 'Basic',
  [ServiceLevel.ADVANCED]: 'Advanced',
};
