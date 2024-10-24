"use client";
import { searchUsers } from "@/supabase/searchUsers";
import { Userinfo } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Userinfo[]>([]);
  const router = useRouter();
  const param = useSearchParams();

  const queryParam = param.get("q");

  
  useEffect(() => {
    if (queryParam) {
      setSearchTerm(queryParam); 
      const fetchData = async () => {
        const users = await searchUsers(queryParam);
        setResults(users); 
      };
      fetchData();
    }
  }, [queryParam]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?q=${searchTerm}`);
    }
  };

  return (
    <div className="bg-spotify-dark-gray h-screen">
      <div className="flex justify-center items-center h-[30%] w-[90%] rounded-xl m-auto">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full px-14 py-2 bg-spotify-light-gray border-2 border-[#63707F] text-white"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-spotify-green rounded-full text-black"
          >
            <FaArrowRight />
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-center items-center mx-auto h-[60%] w-[90%] bg-[#282828] rounded-xl">
        <div className="">
          <h2>Search Results:</h2>
        </div>
        <div>
        {results.length > 0 ? (
          <ul>
            {results.map((user) => (
              <Link href={`/profile/${user.spotify_id} `} key={user.spotify_id}>
              <li key={user.spotify_id}>
                <Image
                src={user.profile_photo}
                alt={user.display_name}
                width={24}
                height={24}
                className="rounded-full w-20 h-20 object-fill border-4 border-white"
                />

              
                <p className="text-white text-center">{user.display_name}</p></li>
            </Link>
            ))}
          </ul>
        ) : (
          <p>No users found</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default Page;
