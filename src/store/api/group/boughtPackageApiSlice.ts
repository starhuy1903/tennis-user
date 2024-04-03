import { BoughtPackage } from 'types/boughtPackage';

import { apiWithToastSlice } from '../baseApiSlice';

const boughtPackagesApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getBougthPackages: build.query<Array<BoughtPackage>, void>({
      query: () => 'bought-packages/me',
    }),
  }),
});

export const { useGetBougthPackagesQuery, useLazyGetBougthPackagesQuery } = boughtPackagesApiToastSlice;
