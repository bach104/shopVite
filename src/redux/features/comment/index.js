import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() + "/api" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
      transformResponse: (response) => ({
        ...response,
        size: response.size || [],
        color: response.color || [],
      }),
    }),
  }),
});

export const {
  useGetProductByIdQuery,
} = productApi;