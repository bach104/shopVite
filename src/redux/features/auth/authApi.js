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
        if (response?.user && response?.token) {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
        }
        return response;
      },
    }),
    updateUser: builder.mutation({
      query: ({ userData }) => {
        const token = localStorage.getItem('token'); 
        if (!token) {
          throw new Error('Token không tồn tại. Vui lòng đăng nhập lại!');
        }

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
          headers: {
            Authorization: `Bearer ${token}`, 
          },
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

export const { 
  useRegisterUserMutation, 
  useLoginUserMutation, 
  useUpdateUserMutation 
} = authApi;

export default authApi;