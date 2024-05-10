// import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { Group, GroupStatus } from 'types/group';
// const initialState: Group = {
//   id: null,
//   name: '',
//   description: '',
//   status: GroupStatus.ACTIVE,
//   adminId: null,
//   packageId: null,
//   startDate: '',
//   endDate: '',
// };
// export const groupSlice = createSlice({
//   name: 'group',
//   initialState,
//   reducers: {
//     setGroupInfo: (_, action: PayloadAction<Group>) => ({
//       ...action.payload,
//     }),
//     resetGroupInfo: (_) => ({
//       ...initialState,
//     }),
//   },
// });
// export const { setGroupInfo, resetGroupInfo } = groupSlice.actions;
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
    setGroupDetails: (state, action: PayloadAction<Group & { isCreator: boolean }>) => {
      state.data = action.payload;
    },
    resetGroupDetails: (state) => {
      state.data = null;
    },
  },
});

export const { setGroupDetails, resetGroupDetails } = groupSlice.actions;
