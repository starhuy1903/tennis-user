import { GetListResult, GetPagingListOptions } from 'types/base';
import { News, UpdateNewsDto } from 'types/news';

import { apiSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const newsAdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getNews: build.query<GetListResult<News>, GetPagingListOptions>({
      query: ({ page, take, order }) => ({
        url: urlWithCorePrefix(`news`),
        params: {
          page,
          take,
          order,
        },
      }),
    }),
    getNewsById: build.query<News, string>({
      query: (id) => urlWithCorePrefix(`news/${id}`),
      transformResponse: (response: { data: News }) => response.data,
    }),
    updateNews: build.mutation<
      News,
      UpdateNewsDto & {
        id: number;
      }
    >({
      query: ({ id, ...body }) => ({
        url: urlWithCorePrefix(`news/${id}`),
        method: 'PATCH',
        body,
      }),
    }),
    deleteNews: build.mutation<void, number>({
      query: (id) => ({
        url: urlWithCorePrefix(`news/${id}`),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useLazyGetNewsQuery,
  useLazyGetNewsByIdQuery,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsAdminApiSlice;
