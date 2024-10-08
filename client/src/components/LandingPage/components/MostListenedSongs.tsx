import React from "react";
import Image from "next/image";
import { Artist, Song } from "@/types";

// redux
import { useGetPopularArtistPopularSongsQuery } from "@/services/spotifyApi";

interface Props {
  artistId: string;
  appToken: string;
}

export default function MostListenedSongs({ artistId, appToken }: Props) {
  const { data, error, isLoading } = useGetPopularArtistPopularSongsQuery({
    artistId,
    appToken,
  });
  const songs = data?.tracks?.slice(0, 5); // Limit to 5 songs

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading songs.</p>;

  return (
    <div className="w-[100%] mx-auto flex flex-col gap-[1rem] bg-spotify-light-gray rounded pt-3 pb-3">
      {songs?.map((song: Song) => (
        <div key={song.id} className="flex gap-[.3em] w-[90%] mx-auto">
          {/* Album Information */}
          <Image
            src={song.album.images[0]?.url}
            alt={`${song.album.name} cover`}
            width={50}
            height={100}
            className="rounded-lg"
          />
          <div>
            <h3>{song.name}</h3>
            {song.album?.artists?.map((artist: Artist) => (
              <p key={artist.id}>{artist?.name}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

