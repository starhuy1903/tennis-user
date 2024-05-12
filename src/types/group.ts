import { UserPackage } from './package';

export type InvitationPayload = {
  email: string;
};

export enum GroupStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
}

export type Group = {
  id: number;
  name: string;
  description: string;
  language: string;
  activityZone: string;
  status: GroupStatus;
  image?: string;
  memberCount: number;
  maxMember: number;
  purchasedPackage: UserPackage;
  createdAt: string;
  updatedAt: string;
  isCreator: boolean;
};

export type GroupUpdateDto = {
  name?: string;
  image?: string;
  description?: string;
  language?: string;
  activityZone?: string;
};

export type CreateGroupDto = {
  name: string;
  image: string;
  description: string;
  language: string;
  activityZone: string;
  purchasedPackageId: string;
};
