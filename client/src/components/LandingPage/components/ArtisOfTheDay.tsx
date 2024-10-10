import { useAppSelector } from "@/redux/hooks";
import {
  useGetPlaylistbyIdQuery,
  useGetTopSongsPlaylistQuery,
} from "@/services/spotifyApi";
import Image from "next/image";
import React from "react";

export default function ArtisOfTheDay() {
  const appToken = useAppSelector((state) => state.userReducer.appToken?.token);

  const { data } = useGetTopSongsPlaylistQuery({ appToken });

  const idPlaylist = data?.playlists?.items[0]?.id;

  const { data: playlistData } = useGetPlaylistbyIdQuery({
    id: idPlaylist,
    appToken,
  });

  const TopSong = playlistData?.tracks?.items[10].track;


  const releaseDate = TopSong?.album?.release_date;
  const year = new Date(releaseDate).getFullYear();

  return (
    <section className="md:w-[50%]">
      <h3 className="text-spotify-green text-center text-lg font-bold mb-4">
        Popular Right Now
      </h3>
      {TopSong && (
        <>
          <div className="relative">
            {/* Artist Image */}
            <Image
              src={TopSong.album.images[0]?.url}
              width={620}
              height={620}
              // className="rounded-lg"
              alt={TopSong.name}
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col  p-4 rounded-lg justify-end bg-gradient-to-t from-black to-transparent">
              <h2 className="text-spotify-white text-2xl font-bold">
                {TopSong.name}
              </h2>
              <p className="text-spotify-light-gray text-sm">
                Popularity: {TopSong.popularity}
              </p>
            </div>
          </div>

          <div className="p-4 gap-2 bg-spotify-light-gray  rounded-lg">
            <h3 className="text-spotify-green  text-lg font-bold mb-4">
              Artist: {TopSong.album.artists[0].name}
            </h3>
            <p className="text-spotify-white  font-bold font-sans">
              Album : {TopSong.album.name}
            </p>
            <p>Released : {year}</p>

            <div className="mt-3 gap-2 md:w-[70%] mb-20">
              <p className="text-[#63707F]  font-bold font-sans">Did you know ? </p>
              <span className="text-white  test-sm ">
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
