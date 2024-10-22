"use client"
import AboutMe from '@/components/Profile/About-me/AboutMe'
import UserHeader from '@/components/Profile/UserHeader/UserHeader'
import UserTopArtist from '@/components/Profile/UserTopArtist/UserTopArtist'
import UserTopSong from '@/components/Profile/UserTopSong/UserTopSong'
import React, { useState } from 'react'

export default function Page() {
  const [activeTab, setActiveTab] = useState('Info'); 

 
  const renderSection = () => {
    switch (activeTab) {
      case 'Info':
        return (
          <div className="flex flex-col md:flex-row gap-4">
            <UserTopArtist />
            <UserTopSong />
          </div>
        );
      case 'about':
        return <AboutMe />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-spotify-dark-gray h-screen">
      {/* Header */}
      <div>
        <UserHeader />
      </div>

      {/* Barra de navegación */}
      <div className="flex justify-start bg-spotify-light-gray px-10 ">
        <button
          className={`px-4 py-2   ${activeTab === 'Info' ? 'border-b-8 border-spotify-green  text-white ' : ' text-gray-300'}`}
          onClick={() => setActiveTab('Info')}
        >
         Info
        </button>
        <button
          className={`px-4 py-2   ${activeTab === 'about' ? ' text-white border-b-8 border-spotify-green ' : ' text-gray-300'}`}
          onClick={() => setActiveTab('about')}
        >
          About Me
        </button>
      </div>

      {/* Contenido de la pestaña activa */}
      <div className="py-2 px-10 bg-spotify-dark-gray w-full">
        {renderSection()}
      </div>
    </div>
  )
}
