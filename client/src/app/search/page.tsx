"use client";
import Loading from "@/components/Loading/Loading";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchUsers } from "@/supabase/searchUsers";
import { Userinfo } from "@/types";
import Image from "next/image";
import Link from "next/link";

const PageContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Userinfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const param = useSearchParams();
  const queryParam = param.get("q");

  useEffect(() => {
    if (queryParam) {
      setSearchTerm(queryParam);
      const fetchData = async () => {
        setIsLoading(true);
        const users = await searchUsers(queryParam);
        setResults(users);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [queryParam]);

  useEffect(() => {
    if (!searchTerm) return;
    setIsLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      router.push(`/search?q=${searchTerm}`);
      const users = await searchUsers(searchTerm);
      setResults(users);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${searchTerm}`);
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
            className={`absolute top-1/2 transform -translate-y-1/2 px-2 bg-spotify-green rounded-full text-black hover:bg-spotify-green-dark ${isLoading && "px-3 py-1 right-2"}`}
          >
            {isLoading && <Loading />}
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-center items-center mx-auto h-[60%] w-[90%] bg-[#282828] rounded-xl">
        <div>
          <h2>Search Results:</h2>
        </div>
        <div>
          {results.length > 0 ? (
            <ul className="flex flex-wrap gap-4 justify-center items-center">
              {results.map((user) => (
                <Link href={`/profile/${user.spotify_id}`} key={user.spotify_id}>
                  <li>
                    <Image
                      src={user.profile_photo}
                      alt={user.display_name}
                      width={24}
                      height={24}
                      className="rounded-full w-20 h-20 object-fill border-4 border-white"
                    />
                    <p className="text-white text-center">{user.display_name}</p>
                  </li>
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

const Page = () => (
  <Suspense fallback={<Loading />}>
    <PageContent />
  </Suspense>
);

export default Page;
