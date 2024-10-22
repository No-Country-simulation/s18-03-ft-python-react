"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import { User } from "@/slices/userSlice";

const UserHeader = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser?.user); 
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>; 
  }

  return (
    <section className="bg-spotify-light-gray flex flex-col md:flex-row ">
      <div className="flex flex-col md:flex-row items-center gap-6 px-10 py-12 md:w-[50%]">
        <Image
          src={user?.profile_photo} 
          width={200}
          height={100}
          alt={user?.display_name}
          className="rounded-full object-fill border-4 border-white"
        />
        <h2 className="text-3xl font-bold font-sans mt-auto">{user?.display_name}</h2>
      </div>
      <div className="flex flex-col gap-3 px-10 font-sans items-center md:items-end justify-center md:w-[50%] mb-8 ">
        <p className="text-white">{`${user?.followers} Followers`}</p>
        <a
          href={user?.external_urls?.spotify}
          className="text-white flex gap-3 items-center"
        >
          <FaSpotify className="text-xl text-white" /> open in Spotify
        </a>
        <button
          type="button"
          className="bg-spotify-green text-white px-4 py-1 rounded-lg hover:bg-spotify-green/40 text-center font-sans font-bold text-lg"
        >
          Agregar amigo
        </button>
        
      </div>
    </section>
  );
};

export default UserHeader;
