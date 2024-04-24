import { Match, TournamentFixture } from 'types/tournament-fixtures';

import { apiWithToastSlice } from '../baseApiSlice';

const tournamentFixturesApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getTournamentFixture: build.query<TournamentFixture, number>({
      query: (id) => `core/tournaments/${id}/fixtures`,
    }),
    getMatchDetails: build.query<Match, { tournamentId: number; matchId: number }>({
      query: ({ tournamentId, matchId }) => `core/tournaments/${tournamentId}/fixtures/${matchId}`,
    }),
  }),
});

export const {
  useGetTournamentFixtureQuery,
  useLazyGetTournamentFixtureQuery,
  useGetMatchDetailsQuery,
  useLazyGetMatchDetailsQuery,
} = tournamentFixturesApiToastSlice;
