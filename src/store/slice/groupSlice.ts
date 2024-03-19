import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Group, GroupStatus } from 'types/group';
import { GroupSliceType } from 'types/store/group';

const initialState: Group = {
  id: null,
  name: '',
  description: '',
  status: GroupStatus.INACTIVE,
  adminId: null,
  packageId: null,
  startDate: '',
  endDate: '',
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupInfo: (_, action: PayloadAction<Group>) => ({
      ...action.payload,
    }),
    resetGroupInfo: (_) => ({
      ...initialState,
    }),
  },
});

export const { setGroupInfo, resetGroupInfo } = groupSlice.actions;
