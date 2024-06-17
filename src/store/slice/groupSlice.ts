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
  data: {
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
  },
  showBackground: true,
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupDetails: (state, action: PayloadAction<Group>) => {
      state.data = action.payload;
    },

    resetGroupDetails: (state) => {
      state.data = initialState.data;
    },

    showGroupBackground: (state, action: PayloadAction<boolean>) => {
      state.showBackground = action.payload;
    },
  },
});

export const selectGroup = (state: { group: GroupSliceType }) => state.group.data;

export const selectGroupBackground = (state: { group: GroupSliceType }) => state.group.showBackground;

export const { setGroupDetails, resetGroupDetails, showGroupBackground } = groupSlice.actions;
