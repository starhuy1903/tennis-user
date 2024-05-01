import { setAppConfig } from 'store/slice/appSlice';
import { AppConfigType } from 'types/app';

import { apiWithToastSlice } from './baseApiSlice';
import { urlWithCorePrefix } from './helper';

const groupApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getAppConfig: build.query<AppConfigType, void>({
      query: () => urlWithCorePrefix('system-config'),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setAppConfig(data));
      },
    }),
  }),
});

export const { useGetAppConfigQuery } = groupApiToastSlice;
