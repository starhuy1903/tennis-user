import { TournamentStatus } from 'constants/tournament';
import { OpenTournament, OpenTournamentPayload, UpdateTournamentPayload } from 'types/tournament';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const tournamentApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getOpenTournaments: build.query<OpenTournament[], TournamentStatus | void>({
      query: (status) => ({
        url: urlWithCorePrefix(`tournaments`),
        params: { status },
      }),
      transformResponse: (response: { data: OpenTournament[] }) => response.data,
    }),
    getMyTournaments: build.query<OpenTournament[], TournamentStatus | void>({
      query: (status) => ({
        url: urlWithCorePrefix(`users/tournaments`),
        params: { status },
      }),
      transformResponse: (response: { data: OpenTournament[] }) => response.data,
    }),
    getUnregisteredTournaments: build.query<OpenTournament[], void>({
      query: () => ({
        url: urlWithCorePrefix(`tournaments/unregistered`),
      }),
      transformResponse: (response: { data: OpenTournament[] }) => response.data,
    }),
    getCreatedTournaments: build.query<OpenTournament[], void>({
      query: () => ({
        url: urlWithCorePrefix(`tournaments/me`),
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
      query: (id) => `core/tournaments/${id}/general-info`,
      transformResponse: (response: { data: OpenTournament }) => response.data,
    }),
    publishTournament: build.mutation<void, number>({
      query: (tournamentId) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/publish`),
        method: 'PATCH',
      }),
    }),
    updateTournament: build.mutation<OpenTournament, { tournamentId: number; payload: UpdateTournamentPayload }>({
      query: ({ tournamentId, payload }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}`),
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetOpenTournamentsQuery,
  useLazyGetOpenTournamentsQuery,
  useGetMyTournamentsQuery,
  useLazyGetMyTournamentsQuery,
  useGetUnregisteredTournamentsQuery,
  useLazyGetUnregisteredTournamentsQuery,
  useGetCreatedTournamentsQuery,
  useLazyGetCreatedTournamentsQuery,
  useCreateOpenTournamentMutation,
  useGetOpenTournamentDetailsQuery,
  useLazyGetOpenTournamentDetailsQuery,
  usePublishTournamentMutation,
  useUpdateTournamentMutation,
} = tournamentApiToastSlice;
