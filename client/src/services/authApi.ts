import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (builder) => ({
    getAccessToken: builder.mutation({
      query: (body) => ({
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
      }),
    }),
    getUserAcess: builder.mutation({
      query: ()=> ({
        url: 'http://localhost3001/infinify/login',
        method: "GET"
      })
    })
  }),
});

export const { useGetAccessTokenMutation, useGetUserAcessMutation } = authApi