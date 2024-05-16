import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { OpenTournament, OpenTournamentPayload, UpdateTournamentPayload } from 'types/tournament';

export const {
  useGetCreatedTournamentsQuery,
  useLazyGetCreatedTournamentsQuery,
  useCreateOpenTournamentMutation,
  usePublishTournamentMutation,
  useUpdateTournamentMutation,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
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
