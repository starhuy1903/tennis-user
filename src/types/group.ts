export type InvitationPayload = {
  email: string;
};

export enum GroupStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired',
}

export type Group = {
  id: number;
  name: string;
  description: string;
  language: string;
  activityZone: string;
  status: GroupStatus;
  adminId: number;
  image?: string;
  orderId: number | null;
  startDate: string;
  endDate: string;
  memberCount: number;
  createdAt: '2024-03-15T05:08:51.216Z';
  updatedAt: '2024-03-15T05:08:51.216Z';
};

export type GroupUpdateDto = {
  name: string;
  image?: string;
  description?: string;
  language?: string;
  activityZone?: string;
};

export type GroupDto = GroupUpdateDto & {
  boughtPackageId: string;
};
