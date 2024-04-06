import { setAppConfig } from 'store/slice/appSlice';
import { AppConfigType } from 'types/app';

import { apiWithToastSlice } from './baseApiSlice';

const groupApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getAppConfig: build.query<AppConfigType, void>({
      query: () => '/system-config',
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setAppConfig(data));
      },
    }),
  }),
});

export const { useGetAppConfigQuery } = groupApiToastSlice;
