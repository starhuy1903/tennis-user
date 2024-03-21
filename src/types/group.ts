export type InvitationPayload = {
  email: string;
};

export enum GroupStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired',
}

export type Group = {
  id: number | null;
  name: string;
  description: string;
  status: GroupStatus;
  adminId: number | null;
  packageId: number | null;
  startDate: string;
  endDate: string;
};
