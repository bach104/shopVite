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

    // Thêm bình luận
    addComment: builder.mutation({
      query: (commentData) => ({
        url: "/",
        method: "POST",
        body: commentData,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Comments" }],
    }),

    // Cập nhật bình luận
    editComment: builder.mutation({
      query: ({ commentId, content }) => ({
        url: `/${commentId}`,
        method: "PUT",
        body: { content },
        credentials: "include",
      }),
      invalidatesTags: (result, error, { commentId }) => [{ type: "Comments", id: commentId }],
    }),

    // Xóa bình luận
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