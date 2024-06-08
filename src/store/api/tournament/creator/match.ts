import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { MatchMetaData } from 'types/match';

export const { useGetMatchDetailsQuery, useLazyGetMatchDetailsQuery } = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getMatchDetails: build.query<MatchMetaData, string>({
      query: (matchId) => urlWithCorePrefix(`matches/${matchId}`),
    }),
  }),
});
