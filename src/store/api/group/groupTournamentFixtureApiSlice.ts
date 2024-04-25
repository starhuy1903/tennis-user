import { GroupTournamentFixture } from 'types/group-tournament-fixtures';
import { Match } from 'types/tournament-fixtures';

import { apiWithToastSlice } from '../baseApiSlice';

const groupTournamentFixtureApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getGroupTournamentFixture: build.query<
      GroupTournamentFixture,
      {
        groupId: number;
        tournamentId: number;
      }
    >({
      query: ({ groupId, tournamentId }) => `core/groups/${groupId}/tournaments/${tournamentId}/fixtures`,
    }),
    getGroupMatchDetails: build.query<Match, { groupId: number; tournamentId: number; matchId: number }>({
      query: ({ groupId, tournamentId, matchId }) =>
        `core/groups/${groupId}/tournaments/${tournamentId}/fixtures/${matchId}`,
    }),
  }),
});

export const {
  useGetGroupTournamentFixtureQuery,
  useLazyGetGroupTournamentFixtureQuery,
  useGetGroupMatchDetailsQuery,
  useLazyGetGroupMatchDetailsQuery,
} = groupTournamentFixtureApiToastSlice;
