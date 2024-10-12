import {
  useGetGenreOftheDayQuery,
} from "@/services/spotifyApi";
import Image from "next/image";
import React from "react";

//types
import { Song } from "@/types";

const GenereOfTheDay = () => {

  const { data, error, isLoading } = useGetGenreOftheDayQuery({
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <section className="">
        <div className="flex flex-col gap-4">
          <p className="text-start font-bold font-sans  text-lg text-[#63707F]">
            {" "}
            Genre of the Day
          </p>
          <h2 className="text-start font-bold font-sans text-[1.2rem] text-white">
            {" "}
            {data?.genreInfo?.name.toUpperCase()}{" "}
          </h2>
        </div>
        {data?.songs.map((song: Song) => (
          <div
            key={song.id}
            className="relative  flex flex-col items-start rounded-lg shadow-md mt-6"
          >
            <div className="flex justify-center items-center">
              {/* Artist Image */}
              <Image
                src={song?.albumImageUrl}
                width={100}
                height={100}
                className="rounded-lg w-16 h-16"
                alt={song?.songName}
              />

              {/* Overlay Text */}
              <div className="w-72  inset-0 flex flex-col justify-end gap-2 px-4">
                <p className="text-sm font-sans ">{song.name}</p>
                <p className="text-[#63707F] font-sans font-semibold text-sm ">
                  {song?.artists}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-[2rem] w-[100%] items-center justify-center flex">
        <div className="flex flex-col items-center justify-center max-w-[400px] text-center">
          <Image
            alt="Playlist"
            src='/default-genre-pic.webp'
            width={300}
            height={300}
            className="rounded-lg"
          />

          <p className="text-white font-sans font-medium mb-2">
            Relevant artist:{" "}
            {data?.genreInfo?.relevantArtist}
          </p>

          <p className="text-white font-sans font-light md:w-[73%] mb-4">
            {data?.genreInfo?.genreInfo}
          </p>
        </div>
      </section>
    </>
  );
};

export default GenereOfTheDay;
