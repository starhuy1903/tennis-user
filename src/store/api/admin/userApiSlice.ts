import { GetListResult, GetPagingListOptions } from 'types/base';
import { UserProfile } from 'types/user';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const userAdminApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsersAdmin: build.query<GetListResult<UserProfile>, GetPagingListOptions>({
      query: ({ page, take }) => ({
        url: urlWithCorePrefix('users/admin/all'),
        params: {
          page,
          take,
        },
      }),
    }),
    getUserByIdAdmin: build.query<UserProfile, string>({
      query: (orderId) => urlWithCorePrefix(`users/admin/${orderId}`),
    }),
  }),
});

export const {
  useGetUsersAdminQuery,
  useLazyGetUsersAdminQuery,
  useGetUserByIdAdminQuery,
  useLazyGetUserByIdAdminQuery,
} = userAdminApiToastSlice;
