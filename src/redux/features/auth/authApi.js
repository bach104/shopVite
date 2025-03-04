import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const handleLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.reload();
};

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/auth`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    handleLogout();
  }
  return result;
};

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
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
        if (response?.user && response?.token) {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
        }
        return response;
      },
    }),
    updateUser: builder.mutation({
      query: ({ userData }) => {
        const formData = new FormData();
        Object.keys(userData).forEach((key) => {
          if (userData[key]) {
            formData.append(key, userData[key]);
          }
        });

        return {
          url: '/update-info',
          method: 'PUT',
          body: formData,
        };
      },
      transformResponse: (response) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useUpdateUserMutation } = authApi;

export default authApi;
