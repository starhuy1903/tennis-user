import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { configs } from 'configurations';

import { logOut } from 'store/slice/userSlice';
import auth from 'utils/auth';
import { showError } from 'utils/toast';

import { isRefreshResponse, toastApiError } from './helper';

const mutex = new Mutex();

const BASE_URL = configs.apiUrl;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = auth.getAccessToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  timeout: 30000,
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 403) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            url: 'auth/refresh',
            method: 'POST',
            body: { refreshToken: auth.getRefreshToken() },
          },
          api,
          extraOptions,
        );

        if (isRefreshResponse(refreshResult.data)) {
          auth.setToken(refreshResult.data.accessToken, refreshResult.data.refreshToken);
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
          showError('Your session has expired. Please log in again.');
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

const queryWithToastError: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQueryWithReAuth(args, api, extraOptions);
  if (result.error) {
    toastApiError(result.error.data);
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});

export const apiWithToastSlice = createApi({
  reducerPath: 'apiWithToast',
  baseQuery: queryWithToastError,
  endpoints: () => ({}),
});
