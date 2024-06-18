import { TournamentStatus } from 'constants/tournament';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { GroupTournamentParticipant, GroupTournamentUser } from 'types/group-tournament-participants';
import { GroupTournament, GroupTournamentPayload } from 'types/tournament';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const groupTournamentApiToastSlice = apiWithToastSlice.injectEndpoints({
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
    getCreatedGroupTournaments: build.query<GroupTournament[], number>({
      query: (groupId) => ({
        url: urlWithCorePrefix(`groups/${groupId}/tournaments/me`),
      }),
      transformResponse: (response: { data: GroupTournament[] }) => response.data,
    }),
    getUnregisteredGroupTournaments: build.query<GroupTournament[], number>({
      query: (groupId) => ({
        url: urlWithCorePrefix(`groups/${groupId}/tournaments/unregistered`),
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
    createGroupTournament: build.mutation<GroupTournament, GroupTournamentPayload>({
      query: (args) => ({
        url: urlWithCorePrefix(`groups/${args.groupId}/tournaments`),
        method: 'POST',
        body: args,
      }),
    }),
    getGroupTournamentParticipants: build.query<
      GetListResult<GroupTournamentParticipant> & { isCreator: boolean },
      GetPagingListOptions & { groupId: number; tournamentId: number }
    >({
      query: (args) => ({
        url: urlWithCorePrefix(`groups/${args.groupId}/tournaments/${args.tournamentId}/participants`),
        params: {
          page: args.page,
          take: args.take,
          order: args.order,
        },
      }),
    }),
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
    publishGroupTournament: build.mutation<
      void,
      {
        groupId: number;
        tournamentId: number;
      }
    >({
      query: (args) => ({
        url: urlWithCorePrefix(`groups/${args.groupId}/tournaments/${args.tournamentId}/publish`),
        method: 'POST',
      }),
    }),
    unpublishGroupTournament: build.mutation<
      void,
      {
        groupId: number;
        tournamentId: number;
      }
    >({
      query: (args) => ({
        url: urlWithCorePrefix(`groups/${args.groupId}/tournaments/${args.tournamentId}/unpublish`),
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetGroupTournamentsQuery,
  useLazyGetGroupTournamentsQuery,
  useGetMyGroupTournamentsQuery,
  useLazyGetMyGroupTournamentsQuery,
  useGetCreatedGroupTournamentsQuery,
  useLazyGetCreatedGroupTournamentsQuery,
  useGetUnregisteredGroupTournamentsQuery,
  useLazyGetUnregisteredGroupTournamentsQuery,
  useGetGroupTournamentDetailsQuery,
  useLazyGetGroupTournamentDetailsQuery,
  useCreateGroupTournamentMutation,
  useGetGroupTournamentParticipantsQuery,
  useLazyGetGroupTournamentParticipantsQuery,
  useGetGroupTournamentNonParticipantsQuery,
  useLazyGetGroupTournamentNonParticipantsQuery,
  useAddParticipantsMutation,
  useRemoveParticipantMutation,
  usePublishGroupTournamentMutation,
  useUnpublishGroupTournamentMutation,
} = groupTournamentApiToastSlice;
