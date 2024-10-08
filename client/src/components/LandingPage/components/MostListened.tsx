import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetPopularArtistsQuery } from "@/services/spotifyApi";
import MostListenedSongs from "./MostListenedSongs";

import Image from "next/image";
import { Artist } from "@/types";

export default function MostListened() {
  const appToken = useAppSelector((state) => state.userReducer.appToken?.token);

  // Fetch popular artists from Spotify API
  const { data, error, isLoading } = useGetPopularArtistsQuery({
    limit: 50,
    appToken,
  });

  // Get the list of artists from the API response
  const artistList = data?.artists?.items;

  // Sort the artists by popularity and take the first one (most popular)
  const mostPopularArtist = artistList
    ?.slice()
    .sort((a: Artist, b: Artist) => b.popularity - a.popularity)[0];

    console.log({mostPopularArtist})

  if (isLoading)
    return <p className="text-center text-spotify-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error</p>;

  return (
    <article className="relative flex flex-col justify-center items-center bg-spotify-light-gray w-[90%] mx-auto p-4 rounded-lg shadow-md">
      <h3 className="text-spotify-green text-lg font-bold mb-4">
        Popular Right Now
      </h3>
      {mostPopularArtist && (
        <>
          <div className="relative">
            {/* Artist Image */}
            <Image
              src={mostPopularArtist.images[0]?.url}
              width={300}
              height={300}
              className="rounded-lg"
              alt={mostPopularArtist.name}
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent p-4 rounded-lg">
              <h2 className="text-spotify-white text-2xl font-bold">
                {mostPopularArtist.name}
              </h2>
              <p className="text-spotify-light-gray text-sm">
                Popularity: {mostPopularArtist.popularity}
              </p>
            </div>
          </div>
          <MostListenedSongs artistId={mostPopularArtist?.id} appToken={appToken}/>

        </>
      )}
    </article>
  );
}
