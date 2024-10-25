import React from 'react';

interface Props {
  favSongs: string[];
  favArtists: string[];
  favGenres: string[];
}

export default function CompatibilityBar({ favGenres, favArtists, favSongs }: Props) {
  const num = 6;

  return (
    <div className='flex flex-col text-center w-[90%] mx-auto gap-2'>
      <p>compatibility</p>
      <div className='flex bg-spotify-dark-gray rounded'>
        {Array.from({ length: num }).map((_, i) => (
          <div className='w-[10%] bg-spotify-green p-4' key={i}></div>
        ))}
      </div>
    </div>
  );
}
