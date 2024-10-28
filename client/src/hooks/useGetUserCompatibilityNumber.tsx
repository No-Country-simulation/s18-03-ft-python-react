import { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Artist, Song } from '@/types';

export default function useGetUserCompatibilityNumber(favGenres: string[], favArtists: Artist[], favSongs: Song[]) {
  const [compatibilityNumber, setCompatibilityNumber] = useState<number>(4);
  const currentUserInfo = useAppSelector(state => state.userReducer.user);

  console.log(currentUserInfo);
  console.log(favArtists);

  useEffect(() => {
    // Logic to update compatibilityNumber here
  }, [favGenres, favArtists, favSongs]);

  return {
    compatibilityNumber,
  };
}
