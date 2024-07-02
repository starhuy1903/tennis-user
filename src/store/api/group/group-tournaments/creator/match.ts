import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { MatchMetaData } from 'types/match';

export const { useGetGroupMatchDetailsQuery, useLazyGetGroupMatchDetailsQuery } = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getGroupMatchDetails: build.query<MatchMetaData, string>({
      query: (matchId) => urlWithCorePrefix(`matches/${matchId}`),
    }),
  }),
});
