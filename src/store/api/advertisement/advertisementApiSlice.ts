import { Advertisement, AdvertisementPayload } from 'types/advertisement';
import { GetListResult, GetPagingListOptions } from 'types/base';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const advertisementApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    createAdvertisement: build.mutation<Advertisement, AdvertisementPayload>({
      query: (payload) => ({
        url: urlWithCorePrefix(`advertisements`),
        method: 'POST',
        body: payload,
      }),
    }),
    getAdvertisements: build.query<GetListResult<Advertisement>, GetPagingListOptions>({
      query: (body) => ({
        url: urlWithCorePrefix(`advertisements`),
        params: {
          page: body.page,
          take: body.take,
          order: body.order,
        },
      }),
    }),
  }),
});

export const { useCreateAdvertisementMutation, useGetAdvertisementsQuery, useLazyGetAdvertisementsQuery } =
  advertisementApiToastSlice;
