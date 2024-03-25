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
  packageId: number | null;
  startDate: string;
  endDate: string;
  createdAt: '2024-03-15T05:08:51.216Z';
  updatedAt: '2024-03-15T05:08:51.216Z';
};

export type GroupDto ={
  name: string;
  description?: string;
  language?: string;
  activityZone?: string;
  packageId: number;
}
