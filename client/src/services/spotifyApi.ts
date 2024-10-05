import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { useAppSelector } from "@/redux/hooks";


export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1',
  }),
  endpoints: (builder) => ({
    getArtisData: builder.query({
      query: ({id, appToken})=> (console.log(appToken),{
        url: `https://api.spotify.com/v1/artists/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${appToken}`
        }
      })
    }),
  }),
});

export const { useGetArtisDataQuery } = spotifyApi;
