import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { GroupFixtureResponse } from 'types/group-tournament-fixtures';

export const { useGetGroupTournamentFixtureQuery, useLazyGetGroupTournamentFixtureQuery } =
  apiWithToastSlice.injectEndpoints({
    endpoints: (build) => ({
      getGroupTournamentFixture: build.query<
        GroupFixtureResponse,
        {
          groupId: number;
          tournamentId: number;
        }
      >({
        query: (args) => urlWithCorePrefix(`groups/${args.groupId}/tournaments/${args.tournamentId}/fixtures`),
      }),
    }),
  });
