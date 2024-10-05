import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1',
    prepareHeaders: (headers)=> {
      headers.set("Content-Type", "application/x-www-form-urlencoded",)
    }
  }),
  endpoints: (builder) => ({
    getAccessToken: builder.mutation({
      query: (body) => ({
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useGetAccessTokenMutation } = authApi