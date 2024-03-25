import { GetListResult } from 'types/base';
import { Group, GroupDto, InvitationPayload } from 'types/group';

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
    getMyGroups: build.query<GetListResult<Group>, void>({
      query: () => 'groups',
    }),
    getGroupDetails: build.query<Group, number>({
      query: (id) => `groups/${id}`,
    }),
    createGroup: build.query<void, GroupDto>({
      query: (body) => ({
        url: 'groups',
        method: 'POST',
        body,
      }),
    }),
    updateGroup: build.query<void, { id: number; data: GroupDto }>({
      query: (body) => ({
        url: `groups/${body.id}`,
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
  useLazyGetGroupDetailsQuery,
} = groupApiToastSlice;
