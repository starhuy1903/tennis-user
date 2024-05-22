export enum RegistrationStatus {
  INVITING = 'inviting',
  CANCELED = 'canceled',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export const RegistrationStatusOptions = {
  [RegistrationStatus.INVITING]: 'Inviting',
  [RegistrationStatus.CANCELED]: 'Canceled',
  [RegistrationStatus.PENDING]: 'Pending',
  [RegistrationStatus.APPROVED]: 'Approved',
  [RegistrationStatus.REJECTED]: 'Rejected',
};

export const RegistrationStatusChip: {
  [key in RegistrationStatus]: {
    displayText: string;
    chipColor: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  };
} = {
  [RegistrationStatus.INVITING]: {
    displayText: 'Inviting',
    chipColor: 'warning',
  },
  [RegistrationStatus.CANCELED]: {
    displayText: 'Canceled',
    chipColor: 'error',
  },
  [RegistrationStatus.PENDING]: {
    displayText: 'Pending',
    chipColor: 'info',
  },
  [RegistrationStatus.APPROVED]: {
    displayText: 'Approved',
    chipColor: 'success',
  },
  [RegistrationStatus.REJECTED]: {
    displayText: 'Rejected',
    chipColor: 'error',
  },
};
