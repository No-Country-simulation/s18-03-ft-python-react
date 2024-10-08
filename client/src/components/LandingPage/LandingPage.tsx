"use client";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import useRefreshAppToken from "@/hooks/refreshAppToken";
// components
import MostListened from "./components/MostListened";
import GenereOfTheDay from "./components/GenereOfTheDay";

export default function LandingPage() {
  const { appToken } = useRefreshAppToken();
  console.log(appToken);

  return (
    <main className="w-[90%] mx-auto">
      <header className="pt-1 flex flex-col gap-[1rem]">
        <h1 className="text-spotify-green font-bold text-[1.6rem] text-center">
          Welcome To Your Music Journey
        </h1>

        <p className="text-spotify-white text-center font-semibold">
          Join to see your stats and engage with other music lovers!
        </p>
        <a
          href="/login"
          className="text-spotify-green rounded font-bold flex gap-[.2rem] justify-center "
        >
          Log in <ArrowRightIcon className="size-6 text-spotify-green" />{" "}
        </a>
      </header>

      <section className="mt-[2rem]">
        <h2 className="text-center font-semibold text-[1.2rem]">Highlights</h2>
        <div className="mt-[1rem] flex flex-col gap-[1rem] md:flex-row">
          <MostListened />
          <MostListened />
        </div>
      </section>

      <section className="mt-[2rem] bg-spotify-black rounded-lg">
        <div className="mt-[1rem] flex flex-col gap-[1rem] md:flex-row">
          <GenereOfTheDay />
        </div>
      </section>
    </main>
  );
}
