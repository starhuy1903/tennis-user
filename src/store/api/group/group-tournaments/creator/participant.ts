import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { GetListResult } from 'types/base';
import { GroupTournamentUser } from 'types/group-tournament-participants';
import { Referee } from 'types/open-tournament-participants';

export const {
  useGetGroupTournamentNonParticipantsQuery,
  useLazyGetGroupTournamentNonParticipantsQuery,
  useAddParticipantsMutation,
  useRemoveParticipantMutation,
  useGetRefereesGroupTournamentQuery,
  useLazyGetRefereesGroupTournamentQuery,
  useAddRefereeGroupTournamentMutation,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getGroupTournamentNonParticipants: build.query<GroupTournamentUser[], { groupId: number; tournamentId: number }>({
      query: (args) => ({
        url: urlWithCorePrefix(`groups/${args.groupId}/tournaments/${args.tournamentId}/non-participants`),
      }),
    }),
    addParticipants: build.mutation<void, { groupId: number; tournamentId: number; userIds: string[] }>({
      query: (args) => ({
        url: urlWithCorePrefix(`groups/${args.groupId}/tournaments/${args.tournamentId}/participants`),
        method: 'POST',
        body: { userIds: args.userIds },
      }),
    }),
    removeParticipant: build.mutation<void, { groupId: number; tournamentId: number; userId: string }>({
      query: (args) => ({
        url: urlWithCorePrefix(`groups/${args.groupId}/tournaments/${args.tournamentId}/participants/${args.userId}`),
        method: 'DELETE',
      }),
    }),
    getRefereesGroupTournament: build.query<
      GetListResult<Referee>,
      {
        groupId: number;
        tournamentId: number;
      }
    >({
      query: ({ groupId, tournamentId }) => urlWithCorePrefix(`groups/${groupId}/tournaments/${tournamentId}/referees`),
    }),
    addRefereeGroupTournament: build.mutation<void, { groupId: number; tournamentId: number; email: string }>({
      query: ({ groupId, tournamentId, email }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/tournaments/${tournamentId}/referees`),
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});
