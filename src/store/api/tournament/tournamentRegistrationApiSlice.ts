import { TournamentRegistrationPayload } from 'types/tournament-registration';

import { apiWithToastSlice } from '../baseApiSlice';

const tournamentRegistrationApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    createTournamentRegistration: build.mutation<void, TournamentRegistrationPayload>({
      query: (payload) => ({
        url: `tournaments/registration`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useCreateTournamentRegistrationMutation } = tournamentRegistrationApiToastSlice;
