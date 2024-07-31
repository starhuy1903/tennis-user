import { GetListResult, GetPagingListOptions } from 'types/base';
import { News } from 'types/news';

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
  }),
});

export const { useGetNewsQuery, useGetNewsByIdQuery, useLazyGetNewsQuery, useLazyGetNewsByIdQuery } = newsAdminApiSlice;
