import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { FixtureResponse } from 'types/tournament-fixtures';

export const { useGetTournamentFixtureQuery, useLazyGetTournamentFixtureQuery } = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getTournamentFixture: build.query<FixtureResponse, number>({
      query: (id) => urlWithCorePrefix(`tournaments/${id}/fixtures`),
    }),
  }),
});
