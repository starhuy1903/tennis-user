import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { PaymentInfoPayload } from 'types/tournament/fund';

export const { useGetPaymentInfoQuery, useLazyGetPaymentInfoQuery } = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getPaymentInfo: build.query<PaymentInfoPayload | null, number>({
      query: (tournamentId) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/payment-info`),
      }),
    }),
  }),
});
