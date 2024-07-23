import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { MatchMetaData } from 'types/match';
import { Match } from 'types/tournament-fixtures';

export const { useUpdateMatchDetailsMutation } = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    updateMatchDetails: build.mutation<MatchMetaData, Match>({
      query: ({ id, ...restData }) => ({
        url: urlWithCorePrefix(`matches/${id}`),
        method: 'PATCH',
        body: restData,
      }),
    }),
  }),
});
