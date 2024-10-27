'use client'

import { useState } from "react";

interface Props {
  favSongs: string[];
  favArtists: string[];
  favGenres: string[];
}

export default function CompatibilityBar({ favGenres, favArtists, favSongs }: Props) {
  const [num, setNum] = useState<number>(0)

  return (
    <div className='flex flex-col text-center w-[90%] mx-auto gap-2'>
      <p>compatibility</p>
      <div className='flex bg-spotify-dark-gray rounded w-full'>
        {Array.from({ length: num }).map((_, i) => (
          <div className='bg-spotify-green p-3 text-spotify-green' key={i}></div>
        ))}
        {num === 0 ? (
          <div className='p-3 text-spotify-green'></div>
        ): null}
      </div>

    </div>
  );
}
