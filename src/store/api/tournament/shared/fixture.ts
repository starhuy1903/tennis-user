import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { Match, TournamentFixture } from 'types/tournament-fixtures';

export const {
  useGetTournamentFixtureQuery,
  useLazyGetTournamentFixtureQuery,
  useGetMatchDetailsQuery,
  useLazyGetMatchDetailsQuery,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getTournamentFixture: build.query<TournamentFixture, number>({
      query: (id) => urlWithCorePrefix(`tournaments/${id}/fixtures`),
    }),
    getMatchDetails: build.query<Match, { tournamentId: number; matchId: number }>({
      query: ({ tournamentId, matchId }) => urlWithCorePrefix(`tournaments/${tournamentId}/fixtures/${matchId}`),
    }),
  }),
});
