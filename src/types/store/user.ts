import { UserProfile } from 'types/user';

export type UserSliceType = {
  profile: UserProfile | null;
  isLoggedIn: boolean;
};
