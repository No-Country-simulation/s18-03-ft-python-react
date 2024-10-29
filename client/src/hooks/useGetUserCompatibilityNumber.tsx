import { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Artist, Song } from '@/types';

export default function useGetUserCompatibilityNumber(favGenres: string[], favArtists: Artist[], favSongs: Song[]) {
  const [compatibilityNumber, setCompatibilityNumber] = useState<number>(0);
  const currentUserInfo = useAppSelector(state => state.userReducer.user);

  const calculateRateBasedOnGenre = (): number => {
    const userGenres = currentUserInfo?.user.favorite_genres || [];
    let genreCompatibility = 0;

    userGenres.forEach(genre => {
      if (favGenres.includes(genre)) {
        genreCompatibility += 2;
      }
    });

    return genreCompatibility;
  };

  const calculateBasedOnArtist = (): number => {
    const userFavArtists = currentUserInfo?.user_top_artist || [];
    const artistMap: Record<string, boolean> = {};

    userFavArtists.forEach(artist => {
      artistMap[artist.artist_id] = true;
    });

    let artistCompatibility = 0;
    favArtists.forEach(artist => {
      if (artistMap[artist.artist_id]) {
        artistCompatibility += 3;
      }
    });

    return artistCompatibility;
  };

  const calculateBasedOnSongs = (): number => {
    const userFavSongs = currentUserInfo?.user_top_songs || [];
    const songMap: Record<string, boolean> = {};

    userFavSongs.forEach(song => {
      songMap[song.song_id] = true;
    });

    let artistCompatibility = 0;
    favSongs.forEach(song => {
      if (songMap[song.song_id]) {
        artistCompatibility += 3;
      }
    });

    return artistCompatibility;
  };


  useEffect(() => {
    const totalCompatibility = calculateRateBasedOnGenre() + calculateBasedOnArtist() + calculateBasedOnSongs();
    setCompatibilityNumber(totalCompatibility);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favGenres, favArtists, favSongs, currentUserInfo]);

  return {
    compatibilityNumber,
  };
}
