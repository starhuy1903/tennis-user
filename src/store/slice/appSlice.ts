import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppConfigType } from 'types/app';

const initialState: AppConfigType = {
  services: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppConfig: (_, action: PayloadAction<AppConfigType>) => ({
      ...action.payload,
    }),
    resetAppConfig: (_) => ({
      ...initialState,
    }),
  },
});

export const { setAppConfig } = appSlice.actions;
