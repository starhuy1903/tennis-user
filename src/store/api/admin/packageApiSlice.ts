import { PackageType } from 'constants/package';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { Package } from 'types/package';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const packageAdminApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getPackagesAdmin: build.query<
      GetListResult<Package>,
      GetPagingListOptions & {
        type?: PackageType;
      }
    >({
      query: ({ page, take, type }) => ({
        url: urlWithCorePrefix('packages/admin'),
        params: {
          page,
          take,
          type,
        },
      }),
    }),
    getPackageByIdAdmin: build.query<Package, string>({
      query: (id) => ({
        url: urlWithCorePrefix(`packages/${id}`),
      }),
    }),
  }),
});

export const {
  useGetPackagesAdminQuery,
  useLazyGetPackagesAdminQuery,
  useGetPackageByIdAdminQuery,
  useLazyGetPackageByIdAdminQuery,
} = packageAdminApiToastSlice;
