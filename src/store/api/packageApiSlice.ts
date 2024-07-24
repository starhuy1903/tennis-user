import { Package, PackageType, UserPackage } from 'types/package';

import { apiWithToastSlice } from './baseApiSlice';
import { urlWithCorePrefix } from './helper';

const packageApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getPackages: build.query<Package[], PackageType | undefined>({
      query: (type) => ({
        url: urlWithCorePrefix('packages'),
        params: {
          type,
        },
      }),
    }),
    getMyPackages: build.query<UserPackage[], void>({
      query: () => urlWithCorePrefix('my-packages'),
    }),
    getPurchasedPackages: build.query<UserPackage[], void>({
      query: () => urlWithCorePrefix('purchased-packages/me'),
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
