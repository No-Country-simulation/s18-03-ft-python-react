import React from "react";

interface props {
  fetchFilter: (category: string)=> void;
}

export default function ConnectHeader({fetchFilter}: props) {

  const handleClick = (category: string)=> {
    fetchFilter(category)
  }
  return (
    <div className="">
      <h2 className="text-center text-spotify-green pt-3 text-2xl font-bold">
        Find a music partner
      </h2>

      <div className="flex justify-between md:self-start pt-6 max-w-[550px]">
        <button className="bg-spotify-light-gray text-spotify-white p-3 rounded-full min-w-[90px] text-lg font-semibold hover:bg-spotify-green"
        onClick={()=> handleClick('random')}
        >
          Random
        </button>
        <button className="bg-spotify-light-gray text-spotify-white p-3 rounded-full min-w-[90px] text-lg font-semibold hover:bg-spotify-green"
        onClick={()=> handleClick('taste')}
        >
          Taste
        </button>
        <button className="bg-spotify-light-gray text-spotify-white p-3 rounded-full min-w-[90px] text-lg font-semibold hover:bg-spotify-green"
        onClick={()=> handleClick('match')}
        >
          Match
        </button>
      </div>
    </div>
  );
}
