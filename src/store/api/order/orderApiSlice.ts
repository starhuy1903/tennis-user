import { CreateOrderPayload, CreateOrderResponse } from 'types/order';

import { apiWithToastSlice } from '../baseApiSlice';

const orderApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<CreateOrderResponse, CreateOrderPayload>({
      query: (body) => ({
        url: 'core/orders',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApiToastSlice;
