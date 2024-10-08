import { useAppSelector } from "@/redux/hooks";
import {
  useGetGenereoftheDayQuery,
  useGetPlaylistByGenreQuery,
  useGetSearchSongsbyGenreQuery,
} from "@/services/spotifyApi";
import Image from "next/image";
import React from "react";

//types
import { Song } from "@/types";

const GenereOfTheDay = () => {
  const appToken = useAppSelector((state) => state.userReducer.appToken?.token);

  const { data, error, isLoading } = useGetGenereoftheDayQuery({
    appToken,
  });

  const genreOfTheDay = data?.genres[0];

  const { data: songsData } = useGetSearchSongsbyGenreQuery({
    genre: genreOfTheDay,
    limit: 5,
    appToken,
  });

  const { data: playlistData } = useGetPlaylistByGenreQuery({
    genre: genreOfTheDay,
    limit: 1,
    appToken,
  });

  console.log("playlistData", playlistData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <article className=" w-full flex flex-col md:flex-row gap-8 px-8 py-4 mx-auto">
      <section className="mt-[2rem]  px-4 w-[90%]">
        <div className="flex flex-col gap-4">
        <p className="text-start font-bold font-sans  text-lg text-[#63707F]">
          {" "}
          Genre of the Day
        </p>
        <h2 className="text-start font-bold font-sans text-[1.2rem] text-white">
          {" "}
          {genreOfTheDay.toUpperCase()}{" "}
        </h2>

        </div>
        {songsData?.tracks?.items?.map((song: Song) => (
          <div
            key={song.id}
            className=" relative flex flex-col items-start  w-[90%] mx-auto p-4 rounded-lg shadow-md mt-6"
          >
            <div className="flex justify-center items-center">
              {/* Artist Image */}
              <Image
                src={song.album.images[0]?.url}
                width={100}
                height={100}
                className="rounded-lg w-16 h-16"
                alt={song.album.name}
              />

              {/* Overlay Text */}
              <div className="w-72  inset-0 flex flex-col justify-end gap-2 px-4">
                <p className="text-sm font-sans ">{song.name}</p>
                <p className="text-[#63707F] font-sans font-semibold text-sm ">
                  {song.artists.map((artist) => artist.name).join(" / ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-[2rem]  w-[100%] ">
        <div className="mt-[1rem] flex flex-col gap-4 items-start px-4 py-2 ">
          <Image alt="Playlist"
            src={playlistData.playlists.items[0].images[0].url}
            width={200}
            height={300}
            className="rounded-lg"
          />
          <p className="text-white font-sans">
            {playlistData?.playlists?.items[0]?.name}
          </p>

           <p className="text-white font-sans">{playlistData?.playlists?.items[0]?.owner.display_name}</p> 
           <p className="text-white font-sans md:w-[73%]">{playlistData?.playlists?.items[0]?.description}</p>

        </div>
      </section>
    </article>
  );
};

export default GenereOfTheDay;
