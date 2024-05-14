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
};

export const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    setTournamentDetails: (_, action: PayloadAction<OpenTournament>) => ({
      ...action.payload,
    }),
    resetTournamentDetails: (_) => ({
      ...initialState,
    }),
  },
});

export const selectTournament = (state: { tournament: TournamentSliceType }) => state.tournament;

export const { setTournamentDetails, resetTournamentDetails } = tournamentSlice.actions;

export const checkTournamentRole = createSelector(
  (state: RootState) => state.tournament.tournamentRoles || [TournamentRole.PARTICIPANT],
  (roles) => {
    return {
      isParticipant: roles.includes(TournamentRole.PARTICIPANT),
      isCreator: roles.includes(TournamentRole.CREATOR),
      isReferee: roles.includes(TournamentRole.REFEREE),
    };
  }
);
