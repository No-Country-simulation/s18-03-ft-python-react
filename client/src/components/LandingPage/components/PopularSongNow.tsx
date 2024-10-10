import { useAppSelector } from "@/redux/hooks";
import {
  useGetPlaylistbyIdQuery,
  useGetTopSongsPlaylistQuery,
} from "@/services/spotifyApi";
import { Playlist } from "@/types";
import Image from "next/image";
import React from "react";

const PopularSongNow = () => {
  const appToken = useAppSelector((state) => state.userReducer.appToken?.token);

  const { data } = useGetTopSongsPlaylistQuery({ appToken });

  const idPlaylist = data?.playlists?.items[0]?.id;

  const { data: playlistData } = useGetPlaylistbyIdQuery({
    id: idPlaylist,
    appToken,
  });


  const TopSongs = playlistData?.tracks?.items || []

  const topTenSongs = TopSongs.slice(0, 10);

  const firstRow = topTenSongs.slice(0, 5);
  const secondRow = topTenSongs.slice(5, 10);

  return (
    <article className="bg-spotify-light-gray rounded-lg w-full p-2  justify-center items-center mt-4">
      <div className="w-[100%] mx-auto flex flex-col gap-[1rem]  rounded pt-3 pb-5 mt-4">
        <h2 className="text-white font-sans text-start px-4 text-lg font-bold mb-4">
          Popular Now
        </h2>
        <p className="text-[#63707F] font-sans text-start px-4 text-sm">
          What the world is listening to.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-0 md:gap-[1rem] w-[100%] mx-auto">
        <div className="md:w-[50%] p-4 gap-2">
          {firstRow.map((playlist : Playlist) => (
            <div key={playlist.track.id} className="flex gap-4 mt-4">
              <Image
                src={playlist.track.album.images[0]?.url}
                alt={`${playlist.track.album.name} cover`}
                width={50}
                height={100}
                className="rounded-lg w-16 h-16"
              />
              <div>
                <p className="text-white font-sans text-start px-4 text-sm font-bold">
                  {playlist.track.name}
                </p>
                <p className="text-[#63707F] font-sans text-start px-4 text-sm">
                  {playlist.track.artists
                    .map((artist) => artist.name)
                    .join(" / ")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:w-[50%] p-4 gap-2">
          {secondRow.map((playlist : Playlist) => (
            <div key={playlist.track.id} className="flex gap-4 mt-4">
              <Image
                src={playlist.track.album.images[0]?.url}
                alt={`${playlist.track.album.name} cover`}
                width={50}
                height={100}
                className="rounded-lg w-16 h-16"
              />
              <div>
                <p className="text-white font-sans text-start px-4 text-lg ">
                  {playlist.track.name}
                </p>
                <p className="text-[#63707F] font-sans text-start px-4 text-sm">
                  {playlist.track.artists
                    .map((artist) => artist.name)
                    .join(" / ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PopularSongNow;
