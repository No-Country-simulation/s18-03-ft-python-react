"use client";
import { useEffect } from "react";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import { getUser } from "@/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const UserHeader = () => {
 
  const dispatch = useAppDispatch();

  const data = useAppSelector((state ) => state.userReducer.user);


  const user = data?.user; 

  useEffect(() => {
    dispatch(getUser()) 
  }, [dispatch]);

  return (
    <section className="bg-spotify-light-gray flex flex-col md:flex-row ">
      <div className="flex flex-col md:flex-row items-center gap-6 px-10 py-12 md:w-[50%]">
        <Image
          src={user?.profile_photo || "https://i.scdn.co/image/ab6775700000ee852ba57998f0be198a92734260"}

          width={200}
          height={100}
          alt={user?.display_name || "user"}
          className="rounded-full object-fill border-4 border-white"
        />
        <h2 className="text-3xl font-bold font-sans mt-auto">{user?.display_name}</h2>
      </div>
      <div className="flex flex-col gap-3 px-10 font-sans items-center md:items-end justify-center md:w-[50%] mb-8 ">
        <p className="text-white">{`${user?.followers} Followers`}</p>
        <a
          href={user?.uri}
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
