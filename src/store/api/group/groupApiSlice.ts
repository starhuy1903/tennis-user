import { setGroupDetails } from 'store/slice/groupSlice';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { CreateGroupDto, Group, GroupUpdateDto, InvitationPayload } from 'types/group';
import { MemberDto } from 'types/user';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const groupApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    inviteMember: build.mutation<void, InvitationPayload>({
      query: (body) => ({
        url: urlWithCorePrefix('groups/invite'),
        method: 'POST',
        body,
      }),
    }),
    addMember: build.mutation<
      {
        groupId: number;
      },
      string
    >({
      query: (token) => ({
        url: urlWithCorePrefix('groups/user'),
        method: 'POST',
        params: {
          token,
        },
      }),
    }),
    removeMember: build.mutation<void, { groupId: number; userId: string }>({
      query: ({ groupId, userId }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/members/${userId}`),
        method: 'DELETE',
      }),
    }),
    getGroupMembers: build.query<GetListResult<MemberDto>, GetPagingListOptions & { id: number }>({
      query: (body) => ({
        url: urlWithCorePrefix(`groups/${body.id}/members`),
        params: {
          page: body.page,
          take: body.take,
          order: body.order,
        },
      }),
    }),
    getMyGroups: build.query<GetListResult<Group>, GetPagingListOptions>({
      query: (body) => ({
        url: urlWithCorePrefix('groups'),
        params: {
          page: body.page,
          take: body.take,
          order: body.order,
          role: 'group_admin',
        },
      }),
    }),
    getJoinedGroups: build.query<GetListResult<Group>, GetPagingListOptions>({
      query: (body) => ({
        url: urlWithCorePrefix('groups'),
        params: {
          page: body.page,
          take: body.take,
          order: body.order,
          role: 'member',
        },
      }),
    }),
    getGroupDetails: build.query<Group, number>({
      query: (id) => urlWithCorePrefix(`groups/${id}`),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setGroupDetails(data));
      },
    }),
    createGroup: build.mutation<Group, CreateGroupDto>({
      query: (body) => ({
        url: urlWithCorePrefix('groups'),
        method: 'POST',
        body,
      }),
    }),
    updateGroup: build.mutation<void, { id: number; data: GroupUpdateDto }>({
      query: (body) => ({
        url: urlWithCorePrefix(`groups/${body.id}`),
        method: 'PATCH',
        body: body.data,
      }),
    }),
    leaveGroup: build.mutation<void, number>({
      query: (id) => ({
        url: urlWithCorePrefix(`groups/${id}/leave`),
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useInviteMemberMutation,
  useAddMemberMutation,
  useRemoveMemberMutation,
  useGetMyGroupsQuery,
  useLazyGetMyGroupsQuery,
  useGetGroupDetailsQuery,
  useGetJoinedGroupsQuery,
  useLazyGetGroupDetailsQuery,
  useCreateGroupMutation,
  useGetGroupMembersQuery,
  useLazyGetGroupMembersQuery,
  useUpdateGroupMutation,
  useLeaveGroupMutation,
} = groupApiToastSlice;
