import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { PaymentInfoPayload, UpdatedUserPaymentData, UserPaymentInfo } from 'types/tournament/fund';

export const {
  useCreatePaymentInfoMutation,
  useGetUserPaymentDataQuery,
  useLazyGetUserPaymentDataQuery,
  useUpdateUserPaymentDataMutation,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    createPaymentInfo: build.mutation<PaymentInfoPayload, { tournamentId: number; submitData: PaymentInfoPayload }>({
      query: ({ tournamentId, submitData }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/payment-info`),
        method: 'POST',
        body: submitData,
      }),
    }),
    getUserPaymentData: build.query<GetListResult<UserPaymentInfo>, GetPagingListOptions & { tournamentId: number }>({
      query: (args) => ({
        url: urlWithCorePrefix(`tournaments/${args.tournamentId}/fund/users`),
        params: {
          page: args.page,
          take: args.take,
        },
      }),
    }),
    updateUserPaymentData: build.mutation<any, { tournamentId: number; body: UpdatedUserPaymentData }>({
      query: ({ tournamentId, body }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/fund/users`),
        method: 'PATCH',
        body,
      }),
    }),
  }),
});
