import { News } from 'types/news';

import { apiSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getNews: build.query<News[], void>({
      query: () => ({
        url: urlWithCorePrefix(`news`),
      }),
      transformResponse: (response: { data: News[] }) => response.data,
    }),
    getTopNews: build.query<News[], void>({
      query: () => ({
        url: urlWithCorePrefix(`news/top`),
      }),
      transformResponse: (response: { data: News[] }) => response.data,
    }),
    getNewsById: build.query<News, string>({
      query: (id) => urlWithCorePrefix(`news/${id}`),
      transformResponse: (response: { data: News }) => response.data,
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetTopNewsQuery,
  useGetNewsByIdQuery,
  useLazyGetNewsQuery,
  useLazyGetTopNewsQuery,
  useLazyGetNewsByIdQuery,
} = newsApiSlice;
