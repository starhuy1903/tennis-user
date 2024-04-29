import { UserProfile } from 'types/user';

export type UserSliceType = {
  userInfo: UserProfile | null;
  isLoggedIn: boolean;
};
