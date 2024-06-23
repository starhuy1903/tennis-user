export enum ServiceType {
  GROUP = 'group',
  TOURNAMENT = 'tournament',
}

export enum ServiceLevel {
  BASIC = 'basic',
  ADVANCED = 'advanced',
}

export const ServiceLevelOptions = {
  [ServiceLevel.BASIC]: 'Basic',
  [ServiceLevel.ADVANCED]: 'Advanced',
};
