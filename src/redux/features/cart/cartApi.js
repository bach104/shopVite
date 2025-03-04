import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/carts`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    fetchCart: builder.query({
      query: (args = {}) => {
        const { page = 1, limit = 20 } = args;
        return `/?page=${page}&limit=${limit}`;
      },
      providesTags: ["Cart"],
    }),

    getCartItemById: builder.query({
      query: (cartItemId) => `/${cartItemId}`,
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (cartData) => ({
        url: "/add",
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation({
      query: (cartData) => ({
        url: "/update",
        method: "PUT",
        body: cartData,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: ({ cartItemId }) => ({
        url: "/remove",
        method: "DELETE",
        body: { cartItemId },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useFetchCartQuery,
  useGetCartItemByIdQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} = cartApi;