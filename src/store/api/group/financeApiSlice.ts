import { GetListResult, GetPagingListOptions } from 'types/base';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

export type CreateExpensePayload = {
  type: 'expense';
  categories: string[];
  amount: number;
  description: string;
};

export const { useCreateExpenseMutation } = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    createExpense: build.mutation<void, CreateExpensePayload & { groupId: number }>({
      query: ({ groupId, ...submittedData }) => ({
        url: urlWithCorePrefix(`groups/${groupId}/expenses`),
        method: 'POST',
        body: { ...submittedData },
      }),
    }),
    // getExpenses: build.query<GetListResult<Expense>, GetPagingListOptions & { groupId: number }>({
    //   query: ({ groupId, ...body }) => ({
    //     url: urlWithCorePrefix(`groups/${groupId}/expenses`),
    //     params: {
    //       page: body.page,
    //       take: body.take,
    //       order: body.order,
    //     },
    //   }),
    // }),
  }),
});
