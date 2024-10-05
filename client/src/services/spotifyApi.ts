
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1',
  }),
  endpoints: (builder) => ({
    getTopArtists: builder.query({
      query: ({ timeRange = 'short_term', limit = 10 }) =>
        `me/top/artists?time_range=${timeRange}&limit=${limit}`,  // Ensure this returns a string
    }),
  }),
});

export const { useGetTopArtistsQuery } = spotifyApi;