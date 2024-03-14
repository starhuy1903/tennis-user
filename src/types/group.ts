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
  status: GroupStatus;
  adminId: number;
  packageId: number;
  startDate: string;
  endDate: string;
};
