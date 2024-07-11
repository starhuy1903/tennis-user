export enum AdvertisementStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export const AdvertisementStatusOptions = {
  [AdvertisementStatus.PENDING]: 'Pending',
  [AdvertisementStatus.APPROVED]: 'Approved',
  [AdvertisementStatus.REJECTED]: 'Rejected',
};

export const AdvertisementStatusChip: {
  [key in AdvertisementStatus]: {
    label: string;
    color: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  };
} = {
  [AdvertisementStatus.PENDING]: {
    label: 'Pending',
    color: 'info',
  },
  [AdvertisementStatus.APPROVED]: {
    label: 'Approved',
    color: 'success',
  },
  [AdvertisementStatus.REJECTED]: {
    label: 'Rejected',
    color: 'error',
  },
};
