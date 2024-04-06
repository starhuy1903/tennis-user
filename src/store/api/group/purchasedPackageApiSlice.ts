import { PurchasedPackage } from 'types/purchasedPackage';

import { apiWithToastSlice } from '../baseApiSlice';

const purchasedPackagesApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getPurchasedPackages: build.query<Array<PurchasedPackage>, void>({
      query: () => 'core/purchased-packages/me',
    }),
  }),
});

export const { useGetPurchasedPackagesQuery, useLazyGetPurchasedPackagesQuery } = purchasedPackagesApiToastSlice;
