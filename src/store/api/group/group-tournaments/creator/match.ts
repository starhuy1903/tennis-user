import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { MatchMetaData } from 'types/match';

export const { useGetGroupMatchDetailsQuery, useLazyGetGroupMatchDetailsQuery } = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getGroupMatchDetails: build.query<
      MatchMetaData,
      {
        groupId: number;
        tournamentId: number;
        matchId: string;
      }
    >({
      query: ({ groupId, tournamentId, matchId }) =>
        urlWithCorePrefix(`groups/${groupId}/tournaments/${tournamentId}/matches/${matchId}`),
    }),
  }),
});
