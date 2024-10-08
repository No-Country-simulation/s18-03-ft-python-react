import React from "react";

// redux
import { useGetPopularArtistPopularSongsQuery } from "@/services/spotifyApi";

import { Song } from "@/types";

interface Props {
  artistId: string;
  appToken: string;
}

export default function MostListenedSongs({ artistId, appToken }: Props) {
  const { data, error, isLoading } = useGetPopularArtistPopularSongsQuery({
    artistId,
    appToken,
  });
  const songs = data?.tracks;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading songs.</p>;

  return (
    <div>
      {songs?.map((song: Song) => (
        <div key={song.id} className="song-item">
          {/* Song Name */}
          <h3>{song.name}</h3>

          {/* Album Information */}
          <div>
            <img
              src={song.album.images[0]?.url}
              alt={`${song.album.name} cover`}
              width={100}
              height={100}
            />
            <p>Album: {song.album.name}</p>
            <p>Release Date: {song.album.release_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
