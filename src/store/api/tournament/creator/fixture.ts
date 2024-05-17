import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { FixturePayload } from 'types/tournament-fixtures';

export const { useGenerateFixtureMutation } = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    generateFixture: build.mutation<void, { tournamentId: number; body: FixturePayload }>({
      query: ({ tournamentId, body }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/fixtures/generate`),
        method: 'POST',
        body,
      }),
    }),
  }),
});
