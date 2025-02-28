import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() + "/api/products" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, limit, material, category, season, minPrice, maxPrice }) =>
        `?page=${page}&limit=${limit}&material=${material || ""}&category=${category || ""}&season=${season || ""}&minPrice=${minPrice || ""}&maxPrice=${maxPrice || ""}`,
      providesTags: [{ type: "Product", id: "LIST" }],
      transformResponse: (response) => ({
        products: response.products,
        totalPages: response.totalPages,
        totalProducts: response.totalProducts,
      }),
    }),
    getProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
      transformResponse: (response) => {
        console.log("API Response:", response); // Kiểm tra dữ liệu trả về
        return {
          ...response,
          size: response.size || [], // Đảm bảo size là mảng
          color: response.color || [], // Đảm bảo color là mảng
        };
      },
    }),
    rateProduct: builder.mutation({
      query: ({ productId, star }) => ({
        url: "/rate",
        method: "POST",
        body: { productId, star },
        credentials: "include",
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
      ],
    }),
    getProductRating: builder.query({
      query: (productId) => `/${productId}/rating`,
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),
    getTopFeaturedProducts: builder.query({
      query: () => "/top-featured",
      providesTags: [{ type: "Product", id: "TOP" }],
    }),
    getProductsBySeason: builder.query({
      query: ({ season, page, limit }) =>
        `/season/${season}?page=${page}&limit=${limit}`,
      providesTags: [{ type: "Product", id: "SEASON" }],
    }),
    getProductsBySearch: builder.query({
      query: ({ keyword, page = 1, limit = 20 }) =>
        `/search/${encodeURIComponent(keyword)}?page=${page}&limit=${limit}`,
      providesTags: [{ type: "Product", id: "SEARCH" }],
      transformResponse: (response) => ({
        products: response.products,
        totalPages: response.totalPages,
        totalProducts: response.totalProducts,
      }),
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useRateProductMutation,
  useGetProductRatingQuery,
  useGetTopFeaturedProductsQuery,
  useGetProductsBySeasonQuery,
  useGetProductsBySearchQuery,
  useLazyGetProductsBySearchQuery,
} = productApi;