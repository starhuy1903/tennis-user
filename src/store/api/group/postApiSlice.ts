import { GetListResult, GetPagingListOptions } from 'types/base';
import { CreateGroupPostDto, GroupPost, UpdateGroupPostDto } from 'types/group-post';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const postApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<GetListResult<GroupPost>, GetPagingListOptions & { groupId: number }>({
      query: (body) => ({
        url: urlWithCorePrefix(`groups/${body.groupId}/posts`),
        params: {
          page: body.page,
          take: body.take,
          order: body.order,
        },
      }),
    }),
    createPost: build.mutation<
      GroupPost,
      CreateGroupPostDto & {
        groupId: number;
      }
    >({
      query: (body) => ({
        url: urlWithCorePrefix(`groups/${body.groupId}/posts`),
        method: 'POST',
        body,
      }),
    }),
    updatePost: build.mutation<void, { groupId: number; postId: number; data: UpdateGroupPostDto }>({
      query: (body) => ({
        url: urlWithCorePrefix(`groups/${body.groupId}/posts/${body.postId}`),
        method: 'PATCH',
        body: body.data,
      }),
    }),
    deletePost: build.mutation<void, { groupId: number; postId: number }>({
      query: (body) => ({
        url: urlWithCorePrefix(`groups/${body.groupId}/posts/${body.postId}`),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApiToastSlice;
