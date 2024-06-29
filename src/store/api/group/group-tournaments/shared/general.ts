import { TournamentStatus } from 'constants/tournament';
import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { GroupTournament } from 'types/tournament';

export const {
  useGetGroupTournamentsQuery,
  useLazyGetGroupTournamentsQuery,
  useGetMyGroupTournamentsQuery,
  useLazyGetMyGroupTournamentsQuery,
  useGetGroupTournamentDetailsQuery,
  useLazyGetGroupTournamentDetailsQuery,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getGroupTournaments: build.query<GroupTournament[], { tournamentStatus?: TournamentStatus; groupId: number }>({
      query: (args) => ({
        url: urlWithCorePrefix(`groups/${args.groupId}/tournaments`),
        params: { status: args?.tournamentStatus },
      }),
    }),
    getMyGroupTournaments: build.query<GroupTournament[], { tournamentStatus?: TournamentStatus; groupId: number }>({
      query: (args) => ({
        url: urlWithCorePrefix(`users/groups/${args.groupId}/tournaments`),
        params: { status: args?.tournamentStatus },
      }),
      transformResponse: (response: { data: GroupTournament[] }) => response.data,
    }),
    getGroupTournamentDetails: build.query<
      GroupTournament,
      {
        groupId: number;
        tournamentId: number;
      }
    >({
      query: (args) => {
        return urlWithCorePrefix(`groups/${args.groupId}/tournaments/${args.tournamentId}/general-info`);
      },
    }),
  }),
});
