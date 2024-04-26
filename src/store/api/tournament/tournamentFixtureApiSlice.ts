import { TournamentFixture } from 'types/tournament-fixtures';

import { apiWithToastSlice } from '../baseApiSlice';

const tournamentFixturesApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getTournamentFixture: build.query<TournamentFixture, number>({
      query: (id) => `core/tournaments/${id}/fixtures`,
    }),
  }),
});

export const { useGetTournamentFixtureQuery, useLazyGetTournamentFixtureQuery } = tournamentFixturesApiToastSlice;
