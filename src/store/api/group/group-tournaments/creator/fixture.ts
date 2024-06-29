import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { GetListResult } from 'types/base';
import { CreateGroupFixtureRequest, GroupFixtureResponse, SaveGroupFixture } from 'types/group-tournament-fixtures';
import { EditMatchTeam } from 'types/tournament-fixtures';

export const {
  useGenerateGroupFixtureMutation,
  useSaveGroupFixtureMutation,
  useGetTeamGroupTournamentQuery,
  useLazyGetTeamGroupTournamentQuery,
  useClearDraftGroupFixtureMutation,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    generateGroupFixture: build.mutation<
      GroupFixtureResponse,
      { groupId: number; tournamentId: number; body: CreateGroupFixtureRequest }
    >({
      query: ({ groupId, tournamentId, body }) => ({
        url: urlWithCorePrefix(`groups/${groupId}tournaments/${tournamentId}/fixtures/generate`),
        method: 'POST',
        body,
      }),
    }),
    saveGroupFixture: build.mutation<
      GroupFixtureResponse,
      { groupId: number; tournamentId: number; body: SaveGroupFixture }
    >({
      query: ({ groupId, tournamentId, body }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/tournaments/${tournamentId}/fixtures/save`),
        method: 'POST',
        body,
      }),
    }),
    getTeamGroupTournament: build.query<
      GetListResult<EditMatchTeam>,
      {
        groupId: number;
        tournamentId: number;
      }
    >({
      query: ({ groupId, tournamentId }) => urlWithCorePrefix(`groups/${groupId}/tournaments/${tournamentId}/teams`),
    }),
    clearDraftGroupFixture: build.mutation<
      void,
      {
        groupId: number;
        tournamentId: number;
      }
    >({
      query: ({ groupId, tournamentId }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/tournaments/${tournamentId}/fixtures/reset`),
        method: 'DELETE',
      }),
    }),
  }),
});
