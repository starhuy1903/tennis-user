import { AdvertisementStatus } from 'constants/advertisement';

import { UserProfile } from './user';

export type AdvertisementPayload = {
  title: string;
  content: string;
  image: string;
  website: string;
  purchasedPackageId: string;
};

export type Advertisement = Omit<AdvertisementPayload, 'purchasedPackageId'> & {
  id: string;
  userId: string;
  user: UserProfile;
  status: AdvertisementStatus;
  createdAt: string;
  updatedAt: string;
};
