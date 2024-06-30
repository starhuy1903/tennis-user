import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { UserPaymentInfoResponse } from 'types/tournament/fund';

export const { useGetUserPaymentInfoQuery, useLazyGetUserPaymentInfoQuery, useConfirmMakingPaymentMutation } =
  apiWithToastSlice.injectEndpoints({
    endpoints: (build) => ({
      getUserPaymentInfo: build.query<UserPaymentInfoResponse | null, number>({
        query: (tournamentId) => ({
          url: urlWithCorePrefix(`tournaments/${tournamentId}/fund`),
        }),
      }),
      confirmMakingPayment: build.mutation<any, { tournamentId: number; message: string }>({
        query: ({ tournamentId, message }) => ({
          url: urlWithCorePrefix(`tournaments/${tournamentId}/fund`),
          method: 'POST',
          body: { message },
        }),
      }),
    }),
  });
