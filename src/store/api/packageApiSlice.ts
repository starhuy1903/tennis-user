import { Package, UserPackage } from 'types/package';

import { apiWithToastSlice } from './baseApiSlice';

const packageApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getPackages: build.query<Package[], void>({
      query: () => `packages`,
    }),
    getMyPackages: build.query<UserPackage[], void>({
      query: () => `my-packages`,
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
