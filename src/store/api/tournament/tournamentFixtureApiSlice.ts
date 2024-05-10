import { Match, TournamentFixture } from 'types/tournament-fixtures';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const tournamentFixturesApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getTournamentFixture: build.query<TournamentFixture, number>({
      query: (id) => urlWithCorePrefix(`tournaments/${id}/fixtures`),
    }),
    getMatchDetails: build.query<Match, { tournamentId: number; matchId: number }>({
      query: ({ tournamentId, matchId }) => urlWithCorePrefix(`tournaments/${tournamentId}/fixtures/${matchId}`),
    }),
  }),
});

export const {
  useGetTournamentFixtureQuery,
  useLazyGetTournamentFixtureQuery,
  useGetMatchDetailsQuery,
  useLazyGetMatchDetailsQuery,
} = tournamentFixturesApiToastSlice;
