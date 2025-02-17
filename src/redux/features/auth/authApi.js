import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: 'include',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: '/register',
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        if (response?.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
      },
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: '/update-info',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useUpdateUserMutation } = authApi;
export default authApi;
