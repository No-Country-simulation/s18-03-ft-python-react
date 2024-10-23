import React from "react";

export default function ConnectHeader() {
  return (
    <div className="">
      <h2 className="text-center text-spotify-green pt-3 text-2xl font-bold">
        Find a music partner
      </h2>

      <div className="flex justify-between md:self-start pt-6 max-w-[550px]">
        <button className="bg-spotify-light-gray text-spotify-white p-3 rounded-full min-w-[90px] text-lg font-semibold">
          Random
        </button>
        <button className="bg-spotify-light-gray text-spotify-white p-3 rounded-full min-w-[90px] text-lg font-semibold">
          Taste
        </button>
        <button className="bg-spotify-light-gray text-spotify-white p-3 rounded-full min-w-[90px] text-lg font-semibold">
          Match
        </button>
      </div>
    </div>
  );
}
