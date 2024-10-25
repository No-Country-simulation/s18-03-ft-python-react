"use client";
import React from "react";
import Navbar from "./Navbar/Navbar";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <div className=" bg-spotify-dark-gray px-8 py-6 flex justify-between gap-4 ">
      <div className="flex justify-between gap-24  w-[180%] md:w-[10%]">
        <Link href={`/`}>
        <h2 className="text-2xl font-bold text-spotify-green ">Infinify</h2>
        </Link>
        <Link
          href={`/search`}
          className=""
        >
          <span className="absolute flex text-3xl text-white items-end justify-end md:hidden w-32 ">
            <FiSearch />
          </span>
        </Link>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
