import { TournamentStatus } from 'constants/tournament';
import { Group, InvitationPayload } from 'types/group';
import { GroupTournament } from 'types/tournament';

import { apiWithToastSlice } from '../baseApiSlice';

const groupApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    addMember: build.mutation<void, InvitationPayload>({
      query: (body) => ({
        url: 'groups/invite',
        method: 'POST',
        body,
      }),
    }),
    getGroups: build.query<Group[], void>({
      query: () => 'groups',
    }),
    getGroupDetails: build.query<Group, number>({
      query: (id) => `groups/${id}`,
    }),
    getMyGroups: build.query<Group[], void>({
      query: () => 'my-groups',
    }),
    getGroupTournaments: build.query<GroupTournament[], { tournamentStatus?: TournamentStatus; groupId: number }>({
      query: (args) => ({
        url: `groups/${args.groupId}/tournaments`,
        params: { status: args?.tournamentStatus },
      }),
    }),
  }),
});

export const {
  useAddMemberMutation,
  useGetGroupsQuery,
  useLazyGetGroupsQuery,
  useGetGroupDetailsQuery,
  useLazyGetGroupDetailsQuery,
  useGetMyGroupsQuery,
  useLazyGetMyGroupsQuery,
  useGetGroupTournamentsQuery,
  useLazyGetGroupTournamentsQuery,
} = groupApiToastSlice;
