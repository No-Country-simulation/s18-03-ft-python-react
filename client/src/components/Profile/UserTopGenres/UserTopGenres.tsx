import { Userinfo } from "@/types";
import React from "react";

type Props = {
  user: Userinfo | null;
};

const UserTopGenres = ({ user }: Props) => {
  const topGenres = user?.favorite_genres;


  return (
    <div className="mb-20 w-[100%] md:w-[50%]">
      <h2 className="text-3xl font-bold text-white font-sans text-center">
        Favorite Genres
      </h2>
      <div className="bg-spotify-light-gray mt-4 rounded-lg mb-10">
        {topGenres?.map((genre: string, index: number) => (
          <div
            key={genre}
            className="flex items-center gap-3 p-4 rounded-lg"
          >
            <p className="text-[#63707F] font-sans font-bold text-lg">{index + 1} </p>
            <p className="text-white font-sans text-lg">  {genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTopGenres;
