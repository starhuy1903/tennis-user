import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Group, GroupStatus } from 'types/group';
import { UserPackage } from 'types/package';
import { GroupSliceType } from 'types/store/group';

const initialPurchasedPackage: UserPackage = {
  id: '',
  name: '',
  services: [],
  expired: false,
  startDate: '',
  endDate: '',
};

const initialState: GroupSliceType = {
  id: 0,
  name: '',
  description: '',
  language: '',
  activityZone: '',
  status: GroupStatus.ACTIVE,
  memberCount: 0,
  maxMember: 0,
  purchasedPackage: initialPurchasedPackage,
  createdAt: '',
  updatedAt: '',
  isCreator: false,
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupDetails: (_, action: PayloadAction<Group>) => ({
      ...action.payload,
    }),
    resetGroupDetails: (_) => ({
      ...initialState,
    }),
  },
});

export const selectGroup = (state: { group: GroupSliceType }) => state.group;

export const { setGroupDetails, resetGroupDetails } = groupSlice.actions;
