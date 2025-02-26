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

    addToCart: builder.mutation({
      query: (cartData) => ({
        url: "/add",
        method: "POST",
        body: cartData,
      }),
      async onQueryStarted(cartData, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            cartApi.util.updateQueryData("fetchCart", undefined, (draft) => {
              if (!draft?.cartItems) return;

              const existingItem = draft.cartItems.find(
                (item) =>
                  item.productId === cartData.productId &&
                  item.size === cartData.size &&
                  item.color === cartData.color
              );

              if (existingItem) {
                existingItem.quantity += cartData.quantity;
              } else {
                draft.cartItems.push(data.cartItem);
              }

              draft.totalQuantity += cartData.quantity;
            })
          );
        } catch (error) {
          console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        }
      },
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation({
      query: (cartData) => ({
        url: "/update",
        method: "PUT",
        body: cartData,
      }),
      async onQueryStarted(cartData, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("fetchCart", undefined, (draft) => {
            if (!draft?.cartItems) return;

            const itemIndex = draft.cartItems.findIndex(
              (item) => item._id === cartData.cartItemId
            );

            if (itemIndex !== -1) {
              draft.cartItems[itemIndex] = {
                ...draft.cartItems[itemIndex],
                ...cartData,
              };
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Lỗi khi cập nhật giỏ hàng:", error);
          patchResult.undo();
        }
      },
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (cartItemId) => ({
        url: `/remove/${cartItemId}`,
        method: "DELETE",
      }),
      async onQueryStarted(cartItemId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("fetchCart", undefined, (draft) => {
            if (!draft?.cartItems) return;

            const itemIndex = draft.cartItems.findIndex((item) => item._id === cartItemId);
            if (itemIndex !== -1) {
              draft.totalQuantity -= draft.cartItems[itemIndex].quantity;
              draft.cartItems.splice(itemIndex, 1);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
          patchResult.undo();
        }
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useFetchCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} = cartApi;