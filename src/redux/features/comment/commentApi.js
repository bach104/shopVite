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
    getComments: builder.query({
      query: (productId) => `/commentAll/${productId}`,
      providesTags: (result, error, productId) =>
        result ? [{ type: "Comments", id: productId }] : [],
    }),
    addComment: builder.mutation({
      query: (commentData) => ({
        url: "/",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: (_, error, { productId }) => [{ type: "Comments", id: productId }],
    }),
    replyToComment: builder.mutation({
      query: (replyData) => ({
        url: "/reply",
        method: "POST",
        body: replyData,
      }),
      invalidatesTags: (_, error, { productId }) => [{ type: "Comments", id: productId }],
    }),
    addAdminComment: builder.mutation({
      query: (commentData) => ({
        url: "/admin",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: (_, error, { productId }) => [{ type: "Comments", id: productId }],
    }),
    editComment: builder.mutation({
      query: ({ id, content }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: (_, error, { productId }) => [{ type: "Comments", id: productId }],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error, { productId }) => [{ type: "Comments", id: productId }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useReplyToCommentMutation,
  useAddAdminCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = commentApi;