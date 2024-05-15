import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

import {
  Gender,
  ParticipantType,
  TournamentFormat,
  TournamentPhase,
  TournamentRole,
  TournamentStatus,
} from 'constants/tournament';
import { UserPackage } from 'types/package';
import { TournamentSliceType } from 'types/store/tournament';
import { OpenTournament } from 'types/tournament';

const initialPurchasedPackage: UserPackage = {
  id: '',
  name: '',
  services: [],
  expired: false,
  startDate: '',
  endDate: '',
};

const initialState: TournamentSliceType = {
  data: {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    address: '',
    contactPersonName: '',
    contactNumber: '',
    contactEmail: '',
    registrationDueDate: '',
    maxParticipants: 0,
    gender: Gender.ANY,
    participantType: ParticipantType.SINGLE,
    playersBornAfterDate: '',
    format: TournamentFormat.ROUND_ROBIN,
    id: 0,
    participants: 0,
    image: '',
    status: TournamentStatus.UPCOMING,
    phase: TournamentPhase.NEW,
    purchasedPackage: initialPurchasedPackage,
    tournamentRoles: [],
  },
  shouldRefreshData: true, // to call the API on the first render
};

export const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    setTournamentDetails: (state, action: PayloadAction<OpenTournament>) => {
      state.data = action.payload;
    },
    resetTournamentDetails: (state) => {
      state.data = initialState.data;
    },
    shouldRefreshTournamentData: (state, action: PayloadAction<boolean>) => {
      state.shouldRefreshData = action.payload;
    },
  },
});

export const selectTournament = (state: RootState) => state.tournament;
export const selectTournamentData = (state: RootState) => state.tournament.data;

export const { setTournamentDetails, resetTournamentDetails, shouldRefreshTournamentData } = tournamentSlice.actions;

export const checkTournamentRole = createSelector(
  (state: RootState) => selectTournamentData(state).tournamentRoles || [TournamentRole.PARTICIPANT],
  (roles) => {
    return {
      isParticipant: roles.includes(TournamentRole.PARTICIPANT),
      isCreator: roles.includes(TournamentRole.CREATOR),
      isReferee: roles.includes(TournamentRole.REFEREE),
    };
  }
);
