import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { GetListResult } from 'types/base';
import { CreateFixtureRequest, EditMatchTeam, FixtureResponse, SaveFixture } from 'types/tournament-fixtures';

export const {
  useGenerateFixtureMutation,
  useSaveFixtureMutation,
  useGetTeamQuery,
  useLazyGetTeamQuery,
  useClearDraftFixtureMutation,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    generateFixture: build.mutation<FixtureResponse, { tournamentId: number; body: CreateFixtureRequest }>({
      query: ({ tournamentId, body }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/fixtures/generate`),
        method: 'POST',
        body,
      }),
    }),
    saveFixture: build.mutation<FixtureResponse, { tournamentId: number; body: SaveFixture }>({
      query: ({ tournamentId, body }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/fixtures/save`),
        method: 'POST',
        body,
      }),
    }),
    getTeam: build.query<GetListResult<EditMatchTeam>, number>({
      query: (tournamentId) => urlWithCorePrefix(`tournaments/${tournamentId}/teams`),
    }),
    clearDraftFixture: build.mutation<void, number>({
      query: (tournamentId) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/fixtures/reset`),
        method: 'DELETE',
      }),
    }),
  }),
});
