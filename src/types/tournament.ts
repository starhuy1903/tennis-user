import { BaseType } from './base';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  ANY = 'any',
}

export enum TournamentFormat {
  ROUND_ROBIN = 'round_robin',
  KNOCKOUT = 'knockout',
  GROUP_PLAYOFF = 'group_playoff',
}

export enum ParticipantType {
  SINGLE = 'single',
  DOUBLES = 'doubles',
  MIXED_DOUBLES = 'mixed_doubles',
}

export enum TournamentStatus {
  UPCOMING = 'upcoming',
  ON_GOING = 'on_going',
  COMPLETED = 'completed',
}

export type Tournament = BaseType & {
  groupId: number;
  name: string;
  slot: number;
  participants?: number; // Count in TournamentRegistrations table
  gender: Gender;
  format: TournamentFormat;
  participantType: ParticipantType;
  isPublic: boolean;
  image?: string;
  description?: string;
  ageLimit?: number;
  registrationDueDate: string;
  startDate: string;
  endDate: string;
  status: TournamentStatus;
  address: string;
  contactName: string;
  contactNumber: string;
  contactEmail: string;
};
