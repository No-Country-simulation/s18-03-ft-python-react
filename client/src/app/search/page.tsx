"use client";
import { searchUsers } from "@/supabase/searchUsers";
import { Userinfo } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Userinfo[]>([]);

  const router = useRouter();
  const param = useSearchParams();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?q=${searchTerm}`);
      const users = await searchUsers(searchTerm)
      setResults(users)
      console.log("users", results)
    }
  };

  const queryParam = param.get("q");

  console.log("queryParam", queryParam);

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
        <div>
          <h2>Search Results:</h2>
        </div>
        <div>
        {results.length > 0 ? (
          <ul>
            {results.map((user) => (
              <li key={user.id}>{user.display_name}</li>
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
