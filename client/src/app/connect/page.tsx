import React from 'react'
import ConnectHeader from '@/components/Connect/ConnectHeader'
import ConnectCard from '@/components/Connect/ConnectCard'

const fakeUsers = [
    {
      country: 'Honduras',
      display_name: 'Luuiskame',
      profile_photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
    },
    {
      country: 'United States',
      display_name: 'John Doe',
      profile_photo: 'https://via.placeholder.com/150',
    },
    {
      country: 'Canada',
      display_name: 'Jane Smith',
      profile_photo: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
    },
    {
      country: 'Germany',
      display_name: 'Hans Müller',
      profile_photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
  ];

export default function page() {
  return (
    <div className='bg-spotify-dark-gray w-[90%] mx-auto md:w-[100%] md:ml-5 h-[100dvh] flex flex-col gap-[1rem]'>
        <ConnectHeader/>
        {fakeUsers.map(user=> (
            <ConnectCard key={user.country} country={user.country} display_name={user.display_name} profile_photo={user.profile_photo}/>
        ))}
    </div>
  )
}
