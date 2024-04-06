import { TournamentStatus } from 'constants/tournament';
import { OpenTournament, OpenTournamentPayload } from 'types/tournament';

import { apiWithToastSlice } from '../baseApiSlice';

const tournamentApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getOpenTournaments: build.query<OpenTournament[], { tournamentStatus?: TournamentStatus }>({
      query: (args) => ({
        url: `tournaments`,
        params: { status: args?.tournamentStatus },
      }),
    }),
    createOpenTournament: build.mutation<OpenTournament, OpenTournamentPayload>({
      query: (payload) => ({
        url: `tournaments`,
        method: 'POST',
        body: payload,
      }),
    }),
    getOpenTournamentDetails: build.query<OpenTournament, number>({
      query: (id) => `tournaments/${id}/general-info`,
    }),
  }),
});

export const {
  useGetOpenTournamentsQuery,
  useLazyGetOpenTournamentsQuery,
  useCreateOpenTournamentMutation,
  useGetOpenTournamentDetailsQuery,
  useLazyGetOpenTournamentDetailsQuery,
} = tournamentApiToastSlice;
