import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Group } from 'types/group';
import { GroupSliceType } from 'types/store/group';

const initialState: GroupSliceType = {
  data: null,
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupDetails: (state, action: PayloadAction<Group>) => {
      state.data = action.payload;
    },
    resetGroupDetails: (state) => {
      state.data = null;
    },
  },
});

export const { setGroupDetails, resetGroupDetails } = groupSlice.actions;
