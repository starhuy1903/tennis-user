import { GetListResult, GetPagingListOptions } from 'types/base';
import {
  CreateExpensePayload,
  CreateFundPayload,
  Expense,
  FundMember,
  FundRequestForMember,
  GeneralFinanceInfo,
  GroupFund,
  MemberPaymentStatus,
} from 'types/expense';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

export const {
  useCreateExpenseMutation,
  useGetExpensesQuery,
  useLazyGetExpensesQuery,
  useGetGeneralFinanceInfoQuery,
  useLazyGetGeneralFinanceInfoQuery,
  useCreateFundMutation,
  useGetFundQuery,
  useLazyGetFundQuery,
  useGetFundRequestOfMemberQuery,
  useLazyGetFundRequestOfMemberQuery,
  useConfirmMemberFundRequestMutation,
  useMemberConfirmFundRequestMutation,
  useGetFundRequestForMemberQuery,
  useLazyGetFundRequestForMemberQuery,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    createExpense: build.mutation<void, CreateExpensePayload & { groupId: number }>({
      query: ({ groupId, ...submittedData }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/expenses`),
        method: 'POST',
        body: { ...submittedData },
      }),
    }),
    getExpenses: build.query<GetListResult<Expense>, GetPagingListOptions & { groupId: number }>({
      query: ({ groupId, ...body }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/expenses`),
        params: {
          page: body.page,
          take: body.take,
        },
      }),
    }),
    getGeneralFinanceInfo: build.query<GeneralFinanceInfo, number>({
      query: (groupId) => ({
        url: urlWithCorePrefix(`groups/${groupId}/expenses/balance`),
      }),
    }),
    createFund: build.mutation<void, CreateFundPayload & { groupId: number }>({
      query: ({ groupId, ...submittedData }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/funds`),
        method: 'POST',
        body: { ...submittedData },
      }),
    }),
    getFund: build.query<GetListResult<GroupFund>, GetPagingListOptions & { groupId: number }>({
      query: ({ groupId, ...body }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/funds`),
        params: {
          page: body.page,
          take: body.take,
        },
      }),
    }),
    getFundRequestOfMember: build.query<
      GetListResult<FundMember>,
      GetPagingListOptions & { groupId: number; fundId: number }
    >({
      query: ({ groupId, fundId, ...body }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/funds/${fundId}/users`),
        params: {
          page: body.page,
          take: body.take,
        },
      }),
    }),
    confirmMemberFundRequest: build.mutation<
      void,
      {
        groupId: number;
        fundId: number;
        userId: string;
        status: MemberPaymentStatus.ACCEPTED | MemberPaymentStatus.REJECTED;
      }
    >({
      query: ({ groupId, fundId, userId, status }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/funds/${fundId}/confirm`),
        method: 'PATCH',
        body: {
          userId,
          status,
        },
      }),
    }),
    memberConfirmFundRequest: build.mutation<any, { groupId: number; fundId: number }>({
      query: ({ groupId, fundId }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/funds/${fundId}/users/confirm`),
        method: 'PATCH',
      }),
    }),
    getFundRequestForMember: build.query<
      GetListResult<FundRequestForMember>,
      GetPagingListOptions & { groupId: number }
    >({
      query: ({ groupId, ...body }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/funds/users`),
        params: {
          page: body.page,
          take: body.take,
        },
      }),
    }),
  }),
});
