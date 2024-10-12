import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getAccessToken: builder.mutation({
      query: () => ({
        url: 'app-token',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAccessTokenMutation } = authApi