import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { Match } from 'types/tournament-fixtures';

export const { useGetMatchesQuery, useLazyGetMatchesQuery } = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getMatches: build.query<{ matches: Match[] }, number>({
      query: (tournamentId) => urlWithCorePrefix(`tournaments/${tournamentId}/matches`),
    }),
  }),
});
