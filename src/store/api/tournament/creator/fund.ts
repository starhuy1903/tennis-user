import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { PaymentInfoPayload, TeamPaymentInfo, UpdatedTeamPaymentData } from 'types/tournament/fund';

export const {
  useCreatePaymentInfoMutation,
  useGetTeamPaymentDataQuery,
  useLazyGetTeamPaymentDataQuery,
  useUpdateTeamPaymentDataMutation,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    createPaymentInfo: build.mutation<PaymentInfoPayload, { tournamentId: number; submitData: PaymentInfoPayload }>({
      query: ({ tournamentId, submitData }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/payment-info`),
        method: 'POST',
        body: submitData,
      }),
    }),
    getTeamPaymentData: build.query<GetListResult<TeamPaymentInfo>, GetPagingListOptions & { tournamentId: number }>({
      query: (args) => ({
        url: urlWithCorePrefix(`tournaments/${args.tournamentId}/fund/teams`),
        params: {
          page: args.page,
          take: args.take,
        },
      }),
    }),
    updateTeamPaymentData: build.mutation<any, { tournamentId: number; body: UpdatedTeamPaymentData }>({
      query: ({ tournamentId, body }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/fund/teams`),
        method: 'PATCH',
        body,
      }),
    }),
  }),
});
