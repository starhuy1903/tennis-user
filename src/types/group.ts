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
  createdAt: string;
  updatedAt: string;
};

export type GroupUpdateDto = {
  name: string;
  image?: string;
  description?: string;
  language?: string;
  activityZone?: string;
};

export type GroupDto = GroupUpdateDto & {
  purchasedPackageId: string;
};
