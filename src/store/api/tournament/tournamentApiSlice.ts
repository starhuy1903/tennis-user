import { TournamentStatus } from 'constants/tournament';
import { Tournament, TournamentPayload } from 'types/tournament';

import { apiWithToastSlice } from '../baseApiSlice';

const tournamentApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getTournaments: build.query<Tournament[], { tournamentStatus?: TournamentStatus }>({
      query: (args) => ({
        url: `tournaments`,
        params: { status: args?.tournamentStatus },
      }),
    }),
    createTournament: build.mutation<Tournament, TournamentPayload>({
      query: (payload) => ({
        url: `tournaments`,
        method: 'POST',
        body: payload,
      }),
    }),
    getTournamentDetails: build.query<Tournament, number>({
      query: (id) => `tournaments/${id}/general-info`,
    }),
    moveToNextPhase: build.mutation<Tournament, number>({
      query: (id) => ({
        url: `tournaments/${id}/next-phase`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetTournamentsQuery,
  useLazyGetTournamentsQuery,
  useCreateTournamentMutation,
  useGetTournamentDetailsQuery,
  useLazyGetTournamentDetailsQuery,
  useMoveToNextPhaseMutation,
} = tournamentApiToastSlice;
