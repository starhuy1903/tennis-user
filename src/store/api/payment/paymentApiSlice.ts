import { VnpPaymentPayload } from 'types/payment';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithPaymentPrefix } from '../helper';

const paymentApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    returnVnp: build.query<void, VnpPaymentPayload>({
      query: (params) => ({
        url: urlWithPaymentPrefix(`v1/payment/return/vnpay`),
        params,
      }),
    }),
  }),
});

export const { useLazyReturnVnpQuery, useReturnVnpQuery } = paymentApiToastSlice;
