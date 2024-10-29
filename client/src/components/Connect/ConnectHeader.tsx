import React from "react";

interface props {
  fetchFilter: (category: string) => void;
  activeButton: string;
}

export default function ConnectHeader({ fetchFilter, activeButton}: props) {
  const handleClick = (category: string) => {
    fetchFilter(category);
  };

  return (
    <div className="">
      <h1 className="text-center text-spotify-green pt-3 text-2xl font-bold">
        Find a music partner
      </h1>

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
