import { GetListResult, GetPagingListOptions } from 'types/base';
import { Expense, GeneralFinanceInfo } from 'types/expense';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

export type CreateExpensePayload = {
  type: 'expense';
  categories: string[];
  amount: number;
  description: string;
};

export const {
  useCreateExpenseMutation,
  useGetExpensesQuery,
  useLazyGetExpensesQuery,
  useGetGeneralFinanceInfoQuery,
  useLazyGetGeneralFinanceInfoQuery,
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
  }),
});
