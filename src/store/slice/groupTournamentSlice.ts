import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

import { GroupTournamentFormat, GroupTournamentPhase, GroupTournamentStatus } from 'constants/group-tournament';
import { GroupTournamentSliceType } from 'types/store/group-tournament';
import { GroupTournament } from 'types/tournament';

const initialState: GroupTournamentSliceType = {
  data: {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    address: '',
    format: GroupTournamentFormat.ROUND_ROBIN,
    id: 0,
    participants: 0,
    image: '',
    status: GroupTournamentStatus.UPCOMING,
    phase: GroupTournamentPhase.NEW,
    isCreator: false,
  },
  shouldRefreshData: true,
  showBackground: true,
};

export const groupTournamentSlice = createSlice({
  name: 'groupTournament',
  initialState,
  reducers: {
    setGroupTournamentDetails: (state, action: PayloadAction<GroupTournament>) => {
      state.data = action.payload;
    },
    resetGroupTournamentDetails: (state) => {
      state.data = initialState.data;
    },
    shouldRefreshGroupTournamentData: (state, action: PayloadAction<boolean>) => {
      state.shouldRefreshData = action.payload;
    },
    showGroupTournamentBackground: (state, action: PayloadAction<boolean>) => {
      state.showBackground = action.payload;
    },
  },
});

export const selectGroupTournament = (state: RootState) => state.groupTournament;
export const selectGroupTournamentData = (state: RootState) => state.groupTournament.data;

export const {
  setGroupTournamentDetails,
  resetGroupTournamentDetails,
  shouldRefreshGroupTournamentData,
  showGroupTournamentBackground,
} = groupTournamentSlice.actions;
