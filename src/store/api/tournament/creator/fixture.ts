import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { GetListResult } from 'types/base';
import {
  EditMatchTeam,
  FixturePayload,
  SaveRoundRobinFixtureRequest,
  TournamentFixture,
} from 'types/tournament-fixtures';

export const {
  useGenerateFixtureMutation,
  useSaveFixtureMutation,
  useGetTeamQuery,
  useLazyGetTeamQuery,
  useClearDraftFixtureMutation,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    generateFixture: build.mutation<TournamentFixture, { tournamentId: number; body: FixturePayload }>({
      query: ({ tournamentId, body }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/fixtures/generate`),
        method: 'POST',
        body,
      }),
    }),
    saveFixture: build.mutation<TournamentFixture, { tournamentId: number; body: SaveRoundRobinFixtureRequest }>({
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
