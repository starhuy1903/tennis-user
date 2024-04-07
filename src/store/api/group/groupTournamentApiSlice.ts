import { TournamentStatus } from 'constants/tournament';
import { GroupTournament } from 'types/tournament';

import { apiWithToastSlice } from '../baseApiSlice';

const groupTournamentApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getGroupTournaments: build.query<GroupTournament[], { tournamentStatus?: TournamentStatus; groupId: number }>({
      query: (args) => ({
        url: `groups/${args.groupId}/tournaments`,
        params: { status: args?.tournamentStatus },
      }),
    }),
    getGroupTournamentDetails: build.query<
      GroupTournament,
      {
        groupId: number;
        tournamentId: number;
      }
    >({
      query: (args) => {
        console.log(`groups/${args.groupId}/tournaments/${args.tournamentId}/general-info`);
        return `groups/${args.groupId}/tournaments/${args.tournamentId}/general-info`;
      },
    }),
  }),
});

export const {
  useGetGroupTournamentsQuery,
  useLazyGetGroupTournamentsQuery,
  useGetGroupTournamentDetailsQuery,
  useLazyGetGroupTournamentDetailsQuery,
} = groupTournamentApiToastSlice;
