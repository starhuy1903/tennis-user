import { setAppConfig } from 'store/slice/appSlice';
import { AppConfigType } from 'types/app';
import { SystemNotificationResponse } from 'types/notification';

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
    getSystemNotification: build.query<SystemNotificationResponse, void>({
      query: () => ({
        url: urlWithCorePrefix('users/system-noti'),
        // params: {
        //   take,
        // },
      }),
    }),
  }),
});

export const {
  useGetAppConfigQuery,
  useLazyGetAppConfigQuery,
  useGetSystemNotificationQuery,
  useLazyGetSystemNotificationQuery,
} = groupApiToastSlice;
