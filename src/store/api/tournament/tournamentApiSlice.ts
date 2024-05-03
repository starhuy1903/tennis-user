import { TournamentStatus } from 'constants/tournament';
import { OpenTournament, OpenTournamentPayload } from 'types/tournament';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const tournamentApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getOpenTournaments: build.query<OpenTournament[], { userId: number; tournamentStatus?: TournamentStatus }>({
      query: (args) => ({
        url: urlWithCorePrefix(`users/${args.userId}/tournaments`),
        params: { status: args?.tournamentStatus },
      }),
      transformResponse: (response: { data: OpenTournament[] }) => response.data,
    }),
    createOpenTournament: build.mutation<OpenTournament, OpenTournamentPayload>({
      query: (payload) => ({
        url: urlWithCorePrefix(`tournaments`),
        method: 'POST',
        body: payload,
      }),
    }),
    getOpenTournamentDetails: build.query<OpenTournament, number>({
      query: (id) => urlWithCorePrefix(`tournaments/${id}/general-info`),
      transformResponse: (response: { data: OpenTournament }) => response.data,
    }),
    moveToNextPhase: build.mutation<OpenTournament, number>({
      query: (id) => ({
        url: urlWithCorePrefix(`tournaments/${id}/next-phase`),
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetOpenTournamentsQuery,
  useLazyGetOpenTournamentsQuery,
  useCreateOpenTournamentMutation,
  useGetOpenTournamentDetailsQuery,
  useLazyGetOpenTournamentDetailsQuery,
  useMoveToNextPhaseMutation,
} = tournamentApiToastSlice;
