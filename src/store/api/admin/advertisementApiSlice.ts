import { AdvertisementStatus } from 'constants/advertisement';
import { Advertisement } from 'types/advertisement';
import { GetListResult, GetPagingListOptions } from 'types/base';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const advertisementAdminApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getAdvertisements: build.query<
      GetListResult<Advertisement>,
      GetPagingListOptions & {
        status?: AdvertisementStatus;
      }
    >({
      query: (body) => ({
        url: urlWithCorePrefix(`advertisements/admin`),
        params: {
          page: body.page,
          take: body.take,
          order: body.order,
          status: body.status,
        },
      }),
    }),
    getAdvertisementById: build.query<Advertisement, string>({
      query: (id) => urlWithCorePrefix(`advertisements/${id}`),
    }),
  }),
});

export const {
  useGetAdvertisementsQuery,
  useLazyGetAdvertisementsQuery,
  useGetAdvertisementByIdQuery,
  useLazyGetAdvertisementByIdQuery,
} = advertisementAdminApiToastSlice;
