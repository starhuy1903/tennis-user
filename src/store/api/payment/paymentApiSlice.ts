import { VnpPaymentPayload } from 'types/payment';

import { apiWithToastSlice } from '../baseApiSlice';

const paymentApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    returnVnp: build.query<void, VnpPaymentPayload>({
      query: (params) => ({
        url: `v1/payment/return/vnpay`,
        params,
      }),
    }),
  }),
});

export const { useLazyReturnVnpQuery, useReturnVnpQuery } = paymentApiToastSlice;
