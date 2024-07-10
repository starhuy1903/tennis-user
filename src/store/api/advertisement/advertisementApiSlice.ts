import { Advertisement, AdvertisementPayload } from 'types/advertisement';

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
  }),
});

export const { useCreateAdvertisementMutation } = advertisementApiToastSlice;
