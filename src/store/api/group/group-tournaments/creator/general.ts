import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { GroupTournament, GroupTournamentPayload, UpdateGroupTournamentPayload } from 'types/tournament';

export const {
  useGetCreatedGroupTournamentsQuery,
  useLazyGetCreatedGroupTournamentsQuery,
  useCreateGroupTournamentMutation,
  usePublishGroupTournamentMutation,
  useUnpublishGroupTournamentMutation,
  useUpdateGroupTournamentMutation,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getCreatedGroupTournaments: build.query<GroupTournament[], number>({
      query: (groupId) => ({
        url: urlWithCorePrefix(`groups/${groupId}/tournaments/me`),
      }),
      transformResponse: (response: { data: GroupTournament[] }) => response.data,
    }),
    createGroupTournament: build.mutation<GroupTournament, GroupTournamentPayload>({
      query: (args) => ({
        url: urlWithCorePrefix(`groups/${args.groupId}/tournaments`),
        method: 'POST',
        body: args,
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
    updateGroupTournament: build.mutation<
      GroupTournament,
      {
        groupId: number;
        tournamentId: number;
        payload: UpdateGroupTournamentPayload;
      }
    >({
      query: (args) => ({
        url: urlWithCorePrefix(`groups/${args.groupId}/tournaments/${args.tournamentId}`),
        method: 'PUT',
        body: args.payload,
      }),
    }),
  }),
});
