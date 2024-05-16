import { TournamentStatus } from 'constants/tournament';
import { OpenTournament } from 'types/tournament';

import { apiWithToastSlice } from '../../baseApiSlice';
import { urlWithCorePrefix } from '../../helper';

export const {
  useGetOpenTournamentsQuery,
  useLazyGetOpenTournamentsQuery,
  useGetMyTournamentsQuery,
  useLazyGetMyTournamentsQuery,
  useGetUnregisteredTournamentsQuery,
  useLazyGetUnregisteredTournamentsQuery,
  useGetOpenTournamentDetailsQuery,
  useLazyGetOpenTournamentDetailsQuery,
} = apiWithToastSlice.injectEndpoints({
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
    getOpenTournamentDetails: build.query<OpenTournament, number>({
      query: (id) => urlWithCorePrefix(`tournaments/${id}/general-info`),
      transformResponse: (response: { data: OpenTournament }) => response.data,
    }),
  }),
});
