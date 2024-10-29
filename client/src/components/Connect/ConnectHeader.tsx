import React from "react";

import LoginBtn from '@/shared/LoginBtn';

import { useAppSelector } from '@/redux/hooks';


interface props {
  fetchFilter: (category: string) => void;
  activeButton: string;
}

export default function ConnectHeader({ fetchFilter, activeButton}: props) {
  const handleClick = (category: string) => {
    fetchFilter(category);
  };

  const isLocalUser = useAppSelector(state=> state.userReducer?.user)
  


  return (
    <div className="">
      <h1 className="text-center text-spotify-green pt-3 text-2xl font-bold">
        Find a music partner
      </h1>

      {isLocalUser === undefined || isLocalUser === null && (
        <div className="text-center bg-yellow-500 text-yellow-900 w-[90%] mx-auto mt-6 max-w-[400px] p-4 rounded-lg shadow-lg">
        <p className="font-semibold text-lg mb-3">
          Log in to see your own stats and compatibility with other users!
        </p>
        <LoginBtn />
      </div>
      )}

      <div className="flex justify-between md:self-start pt-6 max-w-[550px]">
        {/* ["recent", "taste", "match"] */}
        {["recent"].map((category) => (
          <button
            key={category}
            className={`${
              activeButton === category ? "bg-spotify-green" : "bg-spotify-light-gray"
            } text-spotify-white p-3 rounded-full min-w-[90px] text-lg font-semibold hover:bg-spotify-green`}
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
