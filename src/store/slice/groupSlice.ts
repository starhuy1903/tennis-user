import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Group, GroupStatus } from 'types/group';

const initialState: Group = {
  id: null,
  name: '',
  description: '',
  status: GroupStatus.ACTIVE,
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
