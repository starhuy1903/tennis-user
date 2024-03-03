import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserSliceType } from 'types/store/user';
import { UserProfile } from 'types/user';
import auth from 'utils/auth';

const initialState: UserSliceType = {
  profile: null,
  isLoggedIn: Boolean(auth.getAccessToken()),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },

    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },

    logOut: (state) => {
      state.profile = null;
      state.isLoggedIn = false;
      auth.logout();
    },
  },
});

export const { setIsLoggedIn, setProfile, logOut } = userSlice.actions;
