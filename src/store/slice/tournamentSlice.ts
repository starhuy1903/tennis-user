import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Gender, ParticipantType, TournamentFormat, TournamentPhase, TournamentStatus } from 'constants/tournament';
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
  isCreator: false,
  purchasedPackage: initialPurchasedPackage,
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
