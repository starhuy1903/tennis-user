import { GetListResult, GetPagingListOptions } from 'types/base';
import { Group, GroupDto, GroupUpdateDto, InvitationPayload } from 'types/group';
import { MemberDto } from 'types/user';

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
    getGroupMembers: build.query<GetListResult<MemberDto>, GetPagingListOptions & { id: number }>({
      query: (body) => ({
        url: `groups/${body.id}/members`,
        params: {
          page: body.page,
          take: body.take,
          order: body.order,
        },
      }),
    }),
    getMyGroups: build.query<GetListResult<Group>, GetPagingListOptions>({
      query: (body) => ({
        url: 'groups',
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
        url: 'groups',
        params: {
          page: body.page,
          take: body.take,
          order: body.order,
          role: 'member',
        },
      }),
    }),
    getGroupDetails: build.query<{ data: Group }, number>({
      query: (id) => `groups/${id}`,
    }),
    createGroup: build.mutation<void, GroupDto>({
      query: (body) => ({
        url: 'groups',
        method: 'POST',
        body: { ...body, image: 'https://picsum.photos/id/251/300/200' },
      }),
    }),
    updateGroup: build.mutation<void, { id: number; data: GroupUpdateDto }>({
      query: (body) => ({
        url: `groups/${body.id}`,
        method: 'PATCH',
        body: { ...body.data, image: 'https://picsum.photos/id/251/300/200' },
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
  useUpdateGroupMutation,
} = groupApiToastSlice;
