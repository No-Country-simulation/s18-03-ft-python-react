"use client";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
// components
import MostListened from "./components/MostListened";
import GenereOfTheDay from "./components/GenereOfTheDay";

export default function LandingPage() {
  const loginRedirect = process.env.NEXT_PUBLIC_AUTHORIZE_LOGIN
  return (
    <main className="w-[90%] mx-auto max-w-[1250px]">
      <header className="pt-1 flex flex-col gap-[1rem]">
        <h1 className="text-spotify-green font-bold text-[1.6rem] text-center">
          Welcome To Your Music Journey
        </h1>

        <p className="text-spotify-white text-center font-semibold">
          Join to see your stats and engage with other music lovers!
        </p>
        <a
          href={loginRedirect}
          className="text-spotify-green rounded font-bold flex gap-[.2rem] justify-center mx-auto max-w-[160px] text-center"
        >
          Log in <ArrowRightIcon className="size-6 text-spotify-green" />{" "}
        </a>
      </header>
      
      <section className='mt-[2rem]'>
        <h2 className='text-center font-semibold text-[1.2rem]'>Highlights</h2>
        <div className='mt-[1rem] flex flex-col justify-center gap-[1rem] md:flex-row md:justify-start w-[100%]'>
        <MostListened/>
        {/* este otro es la cancion del dia */}
        <MostListened/>
        </div>
      </section>

      <section className="bg-spotify-light-gray mt-[1rem] rounded-lg w-full p-2 md:flex flex flex-col md:flex-row justify-center items-center">
      <GenereOfTheDay/>
      </section>
    </main>
  );
}
