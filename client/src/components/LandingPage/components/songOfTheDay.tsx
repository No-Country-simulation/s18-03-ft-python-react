import Image from "next/image";
import React from "react";
import { useGetSongOfTheDayQuery } from "@/services/spotifyApi";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function ArtisOfTheDay() {
  const { data: songData, isLoading, error } = useGetSongOfTheDayQuery({});

  if (isLoading) return <p>Loading...</p>;
  if (error || !songData) return <p>Error loading the song of the day...</p>;

  const TopSong = songData?.songOfTheDay;

  const releaseYear = 2024;

  return (
    <section className="md:w-[50%]">
      <h3 className="text-spotify-green text-center text-lg font-bold mb-4">
        Song Of The Day
      </h3>
      {TopSong && (
        <>
          <div className="relative">
            {/* Song Image */}
            <Image
              src={TopSong.albumImageUrl || "/placeholder-image.jpg"}
              width={620}
              height={620}
              alt={TopSong.songName}
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col p-4 rounded-lg justify-end bg-gradient-to-t from-black to-transparent">
              <h2 className="text-spotify-white text-2xl font-bold">
                {TopSong.songName}
              </h2>
              <div className="relative">
                <a
                  href={TopSong.spotifyUrl}
                  className="text-spotify-green text-sm mt-1 hover:text-spotify-black flex items-center group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Listen on Spotify
                  <PlayIcon className="w-5 h-5 text-spotify-green opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ml-2" />
                </a>
              </div>
            </div>
          </div>

          <div className="p-4 gap-2 bg-spotify-light-gray rounded-lg">
            <h3 className="text-spotify-green text-lg font-bold mb-4">
              Artist: {TopSong.artists.join(" / ")}
            </h3>
            <p className="text-spotify-white font-bold font-sans">
              Album: {TopSong.albumName}
            </p>
            <p>Released: {releaseYear}</p>

            <div className="mt-3 gap-2 md:w-[70%] mb-20">
              <p className="text-[#63707F] font-bold font-sans">
                Did you know?
              </p>
              <span className="text-white text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio maxime quas laudantium impedit, velit nesciunt sed
                sit est earum inventore! Cum est aperiam, nobis neque quaerat
                consectetur. Adipisci, quasi? Minima.
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
