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
    getMyGroups: build.query<Group[], void>({
      query: () => 'groups',
    }),
  }),
});

export const { useAddMemberMutation, useGetMyGroupsQuery, useLazyGetMyGroupsQuery } = groupApiToastSlice;
