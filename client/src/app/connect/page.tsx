'use client';

import ConnectHeader from '@/components/Connect/ConnectHeader';
import ConnectCard from '@/components/Connect/ConnectCard';
import { useState } from 'react';

import { getRecentUsers } from '@/supabase/getRecentUsers';
import { Artist, Song } from '@/types';



interface UserResponse {
  favorite_genres: string[];
  user_top_songs: Song[];
  user_top_artist: Artist[];
  country: string;
  display_name: string;
  profile_photo: string;
}



export default function Page() {
  const [data, setCurrentData] = useState<UserResponse[]>([]);
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [activeButton, setActiveButton] = useState<string>('')



  // Function to handle filter changes
  const fetchFilter = async (filterType: string) => {
    switch (filterType) {
      case 'recent':
        setLoading(true)
        setActiveButton('recent')
        setMessage('Meet New Members')
        const recentUsers = await getRecentUsers(5) as UserResponse[]
        setCurrentData([...recentUsers])
        setLoading(false)
        console.log(recentUsers)
        break;
      case 'taste':
        setActiveButton('taste')
        setMessage('Users with a similar taste')
        // setCurrentData(fakeUsers2);
        break;
      case 'match':
        setActiveButton('match')
        setMessage('Let us find your ideal music partner')
        // setCurrentData(fakeUsers3);
        break;
      default:
        setCurrentData([]); // Empty if no valid filter is provided
        break;
    }
  };

  if(loading){
    return <p className='text-[#fff]'>Loding...</p>
  }

  return (
    <div className="bg-spotify-dark-gray w-[90%] mx-auto md:w-[100%] md:ml-5 h-[100dvh] flex flex-col gap-[1rem]">
      <ConnectHeader fetchFilter={fetchFilter} activeButton={activeButton} />
      <h2 className='text-center md:text-start mt-5'>{message}</h2>
      {/* Rendering users based on selected filter */}
      {data.map((user) => (
        <ConnectCard
          key={user.display_name}
          country={user.country}
          display_name={user.display_name}
          profile_photo={user.profile_photo}
          favGenres={user.favorite_genres}
          favArtists={user.user_top_artist}
          favSongs={user.user_top_songs}
        />
      ))}
    </div>
  );
}

