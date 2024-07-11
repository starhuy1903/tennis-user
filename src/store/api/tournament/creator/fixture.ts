import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { GetListResult } from 'types/base';
import {
  CreateFixtureRequest,
  EditMatchTeam,
  FixtureResponse,
  GeneratedGroup,
  SaveFixture,
} from 'types/tournament-fixtures';

export const {
  useGenerateGroupMutation,
  useGenerateFixtureMutation,
  useSavePublishFixtureMutation,
  useSaveDraftFixtureMutation,
  useGetTeamQuery,
  useLazyGetTeamQuery,
  useClearDraftFixtureMutation,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    generateGroup: build.mutation<GeneratedGroup[], { tournamentId: number; body: { numberOfGroups: number } }>({
      query: ({ tournamentId, body }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/fixture-groups/generate`),
        method: 'POST',
        body,
      }),
    }),
    generateFixture: build.mutation<FixtureResponse, { tournamentId: number; body: CreateFixtureRequest }>({
      query: ({ tournamentId, body }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/fixtures/generate`),
        method: 'POST',
        body,
      }),
    }),
    savePublishFixture: build.mutation<FixtureResponse, { tournamentId: number; body: SaveFixture }>({
      query: ({ tournamentId, body }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/fixtures/save-publish`),
        method: 'POST',
        body,
      }),
    }),
    saveDraftFixture: build.mutation<FixtureResponse, { tournamentId: number; body: SaveFixture }>({
      query: ({ tournamentId, body }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/fixtures/save-draft`),
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
