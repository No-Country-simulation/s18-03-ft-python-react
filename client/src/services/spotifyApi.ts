import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1',
  }),
  endpoints: (builder) => ({
    getTopArtists: builder.query({
      query: ({ timeRange, limit }) =>
        `me/top/artists?time_range=${timeRange}&limit=${limit}`, // Spotify API endpoint for user's top artists
    }),
    getAccessToken: builder.query({
      query: () => ({
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: apiSecret,
        }).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    }),
  }),
});

export const { useGetTopArtistsQuery, useGetAccessTokenQuery } = spotifyApi;
