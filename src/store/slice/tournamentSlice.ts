import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TournamentSliceType } from 'types/store/tournament';
import { OpenTournament } from 'types/tournament';

const initialState: TournamentSliceType = {
  data: null,
};

export const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    setTournamentDetails: (state, action: PayloadAction<OpenTournament>) => {
      state.data = action.payload;
    },
    resetTournamentDetails: (state) => {
      state.data = null;
    },
  },
});

export const { setTournamentDetails, resetTournamentDetails } = tournamentSlice.actions;
