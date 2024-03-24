import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserSliceType } from 'types/store/user';
import { UserProfile } from 'types/user';
import auth from 'utils/auth';

const initialState: UserSliceType = {
  userInfo: null,
  packages: [],
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
      state.userInfo = action.payload.userInfo;
      state.packages = action.payload.packages;
    },

    logOut: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.packages = [];
      auth.logout();
    },
  },
});

export const { setIsLoggedIn, setProfile, logOut } = userSlice.actions;
