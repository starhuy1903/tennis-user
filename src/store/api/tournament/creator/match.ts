import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { MatchMetaData } from 'types/match';
import { Match } from 'types/tournament-fixtures';

export const { useGetMatchDetailsQuery, useLazyGetMatchDetailsQuery, useUpdateMatchDetailsMutation } =
  apiWithToastSlice.injectEndpoints({
    endpoints: (build) => ({
      getMatchDetails: build.query<MatchMetaData, string>({
        query: (matchId) => urlWithCorePrefix(`matches/${matchId}`),
      }),
      updateMatchDetails: build.mutation<MatchMetaData, Match>({
        query: ({ id, ...restData }) => ({
          url: urlWithCorePrefix(`matches/${id}`),
          method: 'PATCH',
          body: restData,
        }),
      }),
    }),
  });
