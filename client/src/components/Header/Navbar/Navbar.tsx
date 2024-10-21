import React from "react";
import { links } from "./Links";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="lex justify-between items-center px-6 relative">
      <nav className=" px-6 py-3 text-white">
        <div className="md:flex hidden items-center gap-5">
          {links.map(({ id, name, url }) => (
            <Link
              href={url}
              key={id}
              className="block hover:text-primary hover:border-b-[1px] text-white font-bold font-sans text-lg"
            >
              {name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="fixed z-50  bottom-0 left-0 w-full bg-spotify-light-gray text-white flex justify-around md:hidden py-6">
        {links.map(({ id, url, icon }) => (
          <Link
            href={url}
            key={id}
            className="flex flex-col items-center hover:text-primary"
          >
            <span className="inline-block text-xl">{icon}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
