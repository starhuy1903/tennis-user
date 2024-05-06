import { OrderStatus } from 'constants/order';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { CreateOrderPayload, CreateOrderResponse, Order } from 'types/order';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const orderApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<CreateOrderResponse, CreateOrderPayload>({
      query: (body) => ({
        url: urlWithCorePrefix('orders'),
        method: 'POST',
        body,
      }),
    }),
    getOrders: build.query<
      GetListResult<Order>,
      GetPagingListOptions & {
        status?: OrderStatus;
      }
    >({
      query: ({ page, take, status }) => ({
        url: urlWithCorePrefix('orders'),
        params: {
          page,
          take,
          status,
        },
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery, useLazyGetOrdersQuery } = orderApiToastSlice;
