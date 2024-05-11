import { GetListResult, GetPagingListOptions } from 'types/base';
import { Group, GroupDto, GroupUpdateDto, InvitationPayload } from 'types/group';
import { MemberDto } from 'types/user';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const groupApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    addMember: build.mutation<void, InvitationPayload>({
      query: (body) => ({
        url: urlWithCorePrefix('groups/invite'),
        method: 'POST',
        body,
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
    }),
    createGroup: build.mutation<void, GroupDto>({
      query: (body) => ({
        url: urlWithCorePrefix('groups'),
        method: 'POST',
        body: body,
      }),
    }),
    updateGroup: build.mutation<void, { id: number; data: GroupUpdateDto }>({
      query: (body) => ({
        url: urlWithCorePrefix(`groups/${body.id}`),
        method: 'PATCH',
        body: body.data,
      }),
    }),
  }),
});

export const {
  useAddMemberMutation,
  useGetMyGroupsQuery,
  useLazyGetMyGroupsQuery,
  useGetGroupDetailsQuery,
  useGetJoinedGroupsQuery,
  useLazyGetGroupDetailsQuery,
  useCreateGroupMutation,
  useGetGroupMembersQuery,
  useLazyGetGroupMembersQuery,
  useUpdateGroupMutation,
} = groupApiToastSlice;
