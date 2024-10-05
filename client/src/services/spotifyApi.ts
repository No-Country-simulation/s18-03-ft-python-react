import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1',
    prepareHeaders: (headers)=> {
      headers.set("Content-Type", "application/x-www-form-urlencoded",)
    }
  }),
  endpoints: (builder) => ({
    getTopArtists: builder.query({
      query: ({ timeRange, limit }) =>
        `me/top/artists?time_range=${timeRange}&limit=${limit}`, // Spotify API endpoint for user's top artists
    }),
  }),
});

export const { useGetTopArtistsQuery } = spotifyApi;
