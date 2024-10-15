"use client";
import React from "react";
import Navbar from "./Navbar/Navbar";

const Header = () => {
  return (
    <div className=" bg-spotify-light-gray px-4 py-2 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-spotify-green ">Header</h2>

      <Navbar />
    </div>
  );
};

export default Header;
