import { UserProfile } from 'types/user';

export type UserActions = {
  canCreateTournament: boolean;
};

export type UserSliceType = UserProfile & {
  isLoggedIn: boolean;
  actions: UserActions;
};
