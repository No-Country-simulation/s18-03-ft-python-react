"use client";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import { Userinfo } from "@/types";
import CompatibilityBar from "@/shared/CompatibilityBar";

import { useAppSelector } from "@/redux/hooks";

// shared components
import LoginBtn from "@/shared/LoginBtn";

type Props = {
  isOwnProfile: boolean;
  user: Userinfo | null;
};

const UserHeader = ({ isOwnProfile, user }: Props) => {

  const isLocalUser = useAppSelector(state=> state.userReducer?.user)
  

  return (
    <section className="bg-spotify-light-gray flex flex-col md:flex-row">
      <div className="flex flex-col md:flex-row items-center gap-6 px-10 py-12 md:w-[50%]">
        <Image
          src={
            user?.profile_photo ||
            "https://i.scdn.co/image/ab6775700000ee852ba57998f0be198a92734260"
          }
          width={200}
          height={100}
          alt={user?.display_name || "user"}
          className="rounded-full object-fill border-4 border-white"
        />
        <h2 className="text-3xl font-bold font-sans mt-auto">
          {user?.display_name}
        </h2>
      </div>
      <div className="flex flex-col gap-3 px-10 font-sans items-center md:items-end justify-center md:w-[50%] mb-8">
        <p className="text-white">{`${user?.followers || 0} Followers`}</p>
        <a href={user?.uri} className="text-white flex gap-3 items-center">
          <FaSpotify className="text-xl text-white" /> open in Spotify
        </a>
        {!isOwnProfile && (
          <div className="flex flex-col gap-3 max-w[300px]">
          <button
            type="button"
            className="bg-spotify-green text-white px-4 py-1 rounded-lg hover:bg-spotify-green/40 text-center font-sans font-bold text-lg"
          >
            Agregar amigo
          </button>
          <CompatibilityBar favGenres={user?.favorite_genres} favArtists={user?.user_top_artist} favSongs={user?.user_top_songs}/>
          </div>
          
        )}
        {isLocalUser === undefined || isLocalUser === null && (
        <div className="text-center w-[90%] mx-auto mt-6 max-w-[400px]">
          <p className="font-extrabold text-[1rem]">Log in to see your own stats and compatibility with {user?.display_name}</p>
          <LoginBtn/>
        </div>
      )}
      </div>
    </section>
  );
};

export default UserHeader;
