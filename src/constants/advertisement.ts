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
