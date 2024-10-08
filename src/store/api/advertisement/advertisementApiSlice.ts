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
    getAdvertisementsByUserId: build.query<GetListResult<Advertisement>, GetPagingListOptions & { userId: string }>({
      query: ({ userId, ...body }) => ({
        url: urlWithCorePrefix(`advertisements/users/${userId}`),
        params: {
          page: body.page,
          take: body.take,
          order: body.order,
        },
      }),
    }),
    getMyAdvertisements: build.query<GetListResult<Advertisement>, GetPagingListOptions>({
      query: (body) => ({
        url: urlWithCorePrefix(`advertisements/me`),
        params: {
          page: body.page,
          take: body.take,
          order: body.order,
        },
      }),
    }),
    getAdvertisementById: build.query<Advertisement, string>({
      query: (id) => urlWithCorePrefix(`advertisements/${id}`),
    }),
    editAdvertisement: build.mutation<
      Advertisement,
      Omit<AdvertisementPayload, 'purchasedPackageId'> & {
        id: string;
      }
    >({
      query: ({ id, ...body }) => ({
        url: urlWithCorePrefix(`advertisements/${id}/me`),
        method: 'PATCH',
        body: body,
      }),
    }),
  }),
});

export const {
  useCreateAdvertisementMutation,
  useGetAdvertisementsQuery,
  useLazyGetAdvertisementsQuery,
  useGetAdvertisementsByUserIdQuery,
  useLazyGetAdvertisementsByUserIdQuery,
  useGetMyAdvertisementsQuery,
  useLazyGetMyAdvertisementsQuery,
  useGetAdvertisementByIdQuery,
  useLazyGetAdvertisementByIdQuery,
  useEditAdvertisementMutation,
} = advertisementApiToastSlice;
