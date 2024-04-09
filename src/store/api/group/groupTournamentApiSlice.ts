import { TournamentStatus } from 'constants/tournament';
import { GroupTournament, GroupTournamentPayload } from 'types/tournament';

import { apiWithToastSlice } from '../baseApiSlice';

const groupTournamentApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getGroupTournaments: build.query<GroupTournament[], { tournamentStatus?: TournamentStatus; groupId: number }>({
      query: (args) => ({
        url: `core/groups/${args.groupId}/tournaments`,
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
        return `core/groups/${args.groupId}/tournaments/${args.tournamentId}/general-info`;
      },
    }),
    createGroupTournament: build.mutation<GroupTournament, GroupTournamentPayload>({
      query: (payload) => ({
        url: `core/groups/${payload.groupId}/tournaments`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetGroupTournamentsQuery,
  useLazyGetGroupTournamentsQuery,
  useGetGroupTournamentDetailsQuery,
  useLazyGetGroupTournamentDetailsQuery,
  useCreateGroupTournamentMutation,
} = groupTournamentApiToastSlice;
