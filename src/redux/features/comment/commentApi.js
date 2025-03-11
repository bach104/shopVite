import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/comments`,
    credentials: "include",
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    // Lấy danh sách bình luận theo productId
    getComments: builder.query({
      query: (productId) => `/product/${productId}`,
      providesTags: (result, error, productId) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Comments", id: _id })), { type: "Comments", id: productId }]
          : [{ type: "Comments", id: productId }],
    }),
    addComment: builder.mutation({
      query: (commentData) => ({
        url: "/",
        method: "POST",
        body: commentData,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Comments" }],
    }),
    editComment: builder.mutation({
      query: ({ commentId, content, userId, productId }) => ({
        url: `/${commentId}`,
        method: "PUT",
        body: { content, userId, productId }, // Thêm các trường cần thiết
        credentials: "include",
      }),
      invalidatesTags: (result, error, { commentId }) => [{ type: "Comments", id: commentId }],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/${commentId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Comments" }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = commentApi;