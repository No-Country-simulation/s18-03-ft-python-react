"use client"
import UserHeader from '@/components/Profile/UserHeader/UserHeader'
import UserTopArtist from '@/components/Profile/UserTopArtist/UserTopArtist'
import UserTopSong from '@/components/Profile/UserTopSong/UserTopSong'
import React from 'react'

export default function page() {
  return (
    <div className='bg-spotify-dark-gray h-screen w-screen'>
     <div>
      <UserHeader />
     </div>
     <div className='mt-8 mb-10 flex flex-col md:flex-row gap-4 px-10 bg-spotify-dark-gray w-full'>
      <UserTopArtist />
      <UserTopSong />
     </div>
    </div>
  )
}
