import { Match, MatchPayload } from 'types/match';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const matchApiSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    createMatch: build.mutation<Match, MatchPayload>({
      query: ({ tournamentId, ...rest }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/matches`),
        method: 'POST',
        body: rest,
      }),
    }),
  }),
});

export const { useCreateMatchMutation } = matchApiSlice;
