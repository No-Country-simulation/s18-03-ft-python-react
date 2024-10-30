import React, { useEffect } from "react";
import { links } from "./Links";
import Link from "next/link";
import { getUser } from "@/slices/userSlice";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Search from "@/components/Search/Search";
import { CiChat1  } from "react-icons/ci";


const Navbar = () => {
  const data = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();

  const user = data?.user;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="lex justify-between items-center px-6 relative">
      <nav className=" px-6 py-3 text-white">
        <div className="md:flex hidden items-center gap-5">
          <div className="flex items-center justify-center">
            <Search />
          </div>
          {links.map(({ id, name, url }) => (
            <Link
              href={url}
              key={id}
              className="block hover:text-primary hover:border-b-[1px] text-white font-bold font-sans text-lg"
            >
              {name}
            </Link>
          ))}
          {user && (
            <>
            <Link className="hover:text-primary hover:border-b-[1px] text-white font-bold font-sans text-lg" href={`/messages`}>
               <CiChat1 className="h-6 w-6 md:hidden" />
              Messages
            </Link>
            <Link
              href={`/profile/${user.spotify_id}`}
              className="flex flex-col items-center hover:text-primary"
            >
              <Image
                src={user.profile_photo}
                width={40}
                height={30}
                className="rounded-full object-fill border-1 border-white"
                alt={user.display_name}
              />
            </Link>
            </>
            
          )}
        </div>
      </nav>

      <div className="fixed z-50  bottom-0 left-0 w-full bg-spotify-light-gray text-white flex justify-around md:hidden py-6">
        
        {links.map(({ id, url, icon }) => (
          <Link
            href={url}
            key={id}
            className="flex items-center justify-center hover:text-primary"
          >
            <span className="inline-block text-2xl">{icon}</span>
          </Link>
        ))}

        {user && (
          <>
          <Link className="flex items-center justify-center hover:text-primary" href={`/messages`}>
               <CiChat1 className="h-6 w-6 md:hidden" />
            </Link>
            <Link href={`/profile/${user.spotify_id}`} className=" items-center hover:text-primary">
            <Image
              src={user.profile_photo}
              width={40}
              height={30}
              className="rounded-full object-fill border-1 border-white"
              alt={user.display_name}
            />
          </Link>
          </>
          
        )}
      </div>
    </div>
  );
};

export default Navbar;
