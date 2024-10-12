import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL


export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    getArtisData: builder.query({
      query: ({id, appToken})=> ({
        url: `artists/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
      }),
    }),
    getTopArtistLongRange: builder.query({
      query: ({ timeRange, limit, appToken }) => (
        console.log(timeRange, limit, appToken),
        {
          url: `me/top/artists?time_range=${timeRange}&limit=${limit}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${appToken}`,
          },
        }
      ),
    }),
    getPopularArtists: builder.query({
      query: () => ({
        url: `any-popular-artist`,
        method: "GET",
      }),
    }),
    getGenereoftheDay: builder.query({
      query: ({ appToken }) => ({
        url: `recommendations/available-genre-seeds`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
      }),
    }),
    getSearchSongsbyGenre: builder.query({
      query: ({ genre, limit, appToken }) => ({
        url: `search?q=${genre}&type=track&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
      }),
    }),

    getPlaylistByGenre: builder.query({
      query: ({ genre, limit, appToken }) => ({
        url: `search?q=${genre}&type=playlist&limit=${limit}`, 
        method: "GET",
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
      }),
    }),
    getPopularArtistPopularSongs: builder.query({
      query: (artistId)=> ({
        url: `/popular-artist/songs`,
        method: "POST",
        body: artistId
      })
    })
  }),
});

export const {
  useGetArtisDataQuery,
  useGetTopArtistLongRangeQuery,
  useGetPopularArtistsQuery,
  useGetPopularArtistPopularSongsQuery,
  useGetGenereoftheDayQuery,
  useGetSearchSongsbyGenreQuery,
  useGetPlaylistByGenreQuery,
} = spotifyApi;
