import { News } from 'types/news';

import { apiSlice } from '../baseApiSlice';

const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getNews: build.query<News[], void>({
      query: () => ({
        url: `core/news`,
      }),
      transformResponse: (response: { data: News[] }) => response.data,
    }),
    getTopNews: build.query<News[], void>({
      query: () => ({
        url: `core/news/top`,
      }),
      transformResponse: (response: { data: News[] }) => response.data,
    }),
    getNewsById: build.query<News, string>({
      query: (id) => `core/news/${id}`,
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
