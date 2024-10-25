"use client";
import AboutMe from "@/components/Profile/About-me/AboutMe";
import UserHeader from "@/components/Profile/UserHeader/UserHeader";
import UserTopArtist from "@/components/Profile/UserTopArtist/UserTopArtist";
import UserTopSong from "@/components/Profile/UserTopSong/UserTopSong";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { searchUsersById } from "@/supabase/searchUsers";
import { Userinfo } from "@/types";
import UserTopGenres from "@/components/Profile/UserTopGenres/UserTopGenres";

type Params = {
  spotify_id: string;
};

export default function Page({ params }: { params: Params }) {
  const { spotify_id } = params;
  const [userData, setUserData] = useState<Userinfo | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("Info");
  const [loading, setLoading] = useState(true);

  const data = useAppSelector((state) => state.userReducer.user);
  const currentUser = data?.user;
  

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser?.spotify_id === spotify_id) {
        setIsOwnProfile(true);
        setUserData({
          ...currentUser,
          user_top_artist: data?.user_top_artist ?? [],
          user_top_songs: data?.user_top_songs ?? [],
        });
      } else {
        const users = await searchUsersById(spotify_id);
        if (users.length > 0) {
          setUserData(users[0]);
        } else {
          console.error("No se encontró el usuario");
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [spotify_id, currentUser, data]);

  const renderSection = () => {
    switch (activeTab) {
      case "Info":
        return (
          <div className="flex flex-col md:flex-row gap-4">
            <UserTopArtist user={userData} />
            <UserTopSong user={userData} />
            <UserTopGenres user={userData} />
          </div>
        );
      case "about":
        return <AboutMe isOwnProfile={isOwnProfile} user={userData} />;
      default:
        return null;
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>; 
  }

  return (
    <div className="bg-spotify-dark-gray h-screen">
      {/* Header */}
      <div>
        <UserHeader isOwnProfile={isOwnProfile} user={userData} />
      </div>

      {/* Barra de navegación */}
      <div className="flex justify-start bg-spotify-light-gray px-10 ">
        <button
          className={`px-4 py-2 ${
            activeTab === "Info"
              ? "border-b-8 border-spotify-green text-white"
              : "text-gray-300"
          }`}
          onClick={() => setActiveTab("Info")}
        >
          Info
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "about"
              ? "text-white border-b-8 border-spotify-green"
              : "text-gray-300"
          }`}
          onClick={() => setActiveTab("about")}
        >
          {isOwnProfile ? `About Me` : `About ${userData?.display_name}`}
        </button>
      </div>

      {/* Contenido de la pestaña activa */}
      <div className="py-2 px-10 mt-6 bg-spotify-dark-gray w-full">
        {renderSection()}
      </div>
    </div>
  );
}
