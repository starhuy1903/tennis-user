import { Group, InvitationPayload } from 'types/group';

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
} = groupApiToastSlice;
