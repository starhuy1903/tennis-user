import { Package, UserPackage } from 'types/package';

import { apiWithToastSlice } from './baseApiSlice';
import { urlWithCorePrefix } from './helper';

const packageApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getPackages: build.query<Package[], void>({
      query: () => urlWithCorePrefix('packages'),
    }),
    getMyPackages: build.query<UserPackage[], void>({
      query: () => urlWithCorePrefix('my-packages'),
    }),
    // TODO: need to check
    getPurchasedPackages: build.query<UserPackage[], void>({
      query: () => 'core/purchased-packages/me',
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useLazyGetPackagesQuery,
  useGetMyPackagesQuery,
  useLazyGetMyPackagesQuery,
  useGetPurchasedPackagesQuery,
  useLazyGetPurchasedPackagesQuery,
} = packageApiToastSlice;
