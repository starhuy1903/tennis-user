import { GetListResult, GetPagingListOptions } from 'types/base';
import { CreateOrderPayload, CreateOrderResponse, Order } from 'types/order';

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
    getOrders: build.query<GetListResult<Order>, GetPagingListOptions>({
      query: () => 'core/orders',
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery, useLazyGetOrdersQuery } = orderApiToastSlice;
