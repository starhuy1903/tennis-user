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
  useAddRefereesGroupTournamentMutation,
  useFinalizeApplicantGroupTournamentMutation,
  useRemoveRefereeMutation,
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
    finalizeApplicantGroupTournament: build.mutation<
      void,
      {
        groupId: number;
        tournamentId: number;
      }
    >({
      query: ({ groupId, tournamentId }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/tournaments/${tournamentId}/participants/finalize`),
        method: 'POST',
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
    addRefereesGroupTournament: build.mutation<void, { groupId: number; tournamentId: number; userIds: string[] }>({
      query: ({ groupId, tournamentId, userIds }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/tournaments/${tournamentId}/referees`),
        method: 'POST',
        body: { userIds },
      }),
    }),
    removeReferee: build.mutation<void, { groupId: number; tournamentId: number; userId: string }>({
      query: (args) => ({
        url: urlWithCorePrefix(`groups/${args.groupId}/tournaments/${args.tournamentId}/referees/${args.userId}`),
        method: 'DELETE',
      }),
    }),
  }),
});
