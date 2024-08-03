import { OrderStatus } from 'constants/order';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { Order } from 'types/order';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const orderAdminApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrdersAdmin: build.query<
      GetListResult<Order>,
      GetPagingListOptions & {
        status?: OrderStatus;
        userId?: string;
      }
    >({
      query: ({ order, page, take, status, userId }) => ({
        url: urlWithCorePrefix('orders/admin'),
        params: {
          order,
          page,
          take,
          status,
          userId,
        },
      }),
    }),
    getOrderByIdAdmin: build.query<Order, string>({
      query: (orderId) => urlWithCorePrefix(`orders/${orderId}`),
    }),
  }),
});

export const {
  useGetOrdersAdminQuery,
  useLazyGetOrdersAdminQuery,
  useGetOrderByIdAdminQuery,
  useLazyGetOrderByIdAdminQuery,
} = orderAdminApiToastSlice;
