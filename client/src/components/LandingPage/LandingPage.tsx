'use client'
import React, {useEffect} from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import useRefreshAppToken from '@/hooks/refreshAppToken'
// components
import MostListened from './components/MostListened'

export default function LandingPage() {
  const {appToken, onRefreshToken} = useRefreshAppToken()
  console.log(appToken)
  
  return (
    <main className='w-[90%] mx-auto'>
      <header className='pt-1 flex flex-col gap-[1rem]'>
      <h1 className='text-spotify-green font-bold text-[1.6rem] text-center'>Welcome To Your Music Journey</h1>
      
      <p className='text-spotify-white text-center font-semibold'>Unlock personalized Spotify stats and discover your favorite artists and tracks.</p>
      <a href='/login' className='text-spotify-green rounded font-bold flex gap-[.2rem] justify-center '>Log in <ArrowRightIcon className='size-6 text-spotify-green'/>  </a>
      </header>
      
      <section className='mt-[1rem]'>
        <h2 className='text-center font-semibold text-[1.2rem]'>Highlights</h2>
        <MostListened/>
        <button className='bg-spotify-green' onClick={onRefreshToken}>refresh token</button>
      </section>
    </main>
  )
}
