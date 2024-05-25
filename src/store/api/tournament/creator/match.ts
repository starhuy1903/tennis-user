import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';

export const { useGetMatchDetailsQuery, useLazyGetMatchDetailsQuery } = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getMatchDetails: build.query<any, string>({
      query: (matchId) => urlWithCorePrefix(`matches/${matchId}`),
    }),
  }),
});
