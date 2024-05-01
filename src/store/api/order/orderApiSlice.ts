import { OrderStatus, PaymentPartner } from 'constants/order';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { CreateOrderPayload, CreateOrderResponse, Order } from 'types/order';
import { UserProfile } from 'types/user';

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
    getOrderDetail: build.query<Order & { user: UserProfile; paymentMethod: PaymentPartner }, string>({
      query: (orderId) => urlWithCorePrefix(`orders/${orderId}`),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
  useGetOrderDetailQuery,
  useLazyGetOrderDetailQuery,
} = orderApiToastSlice;
