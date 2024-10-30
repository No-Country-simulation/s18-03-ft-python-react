import { searchUsers } from "@/supabase/searchUsers";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    if (!searchTerm) return;

    setIsLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      router.push(`/search?q=${searchTerm}`);
      await searchUsers(searchTerm);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?q=${searchTerm}`);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-full px-4 py-2 bg-spotify-light-gray border-2 border-[#63707F] text-white"
        />
         <button
            type="submit"
            className={`absolute  top-1/2 transform -translate-y-1/2 px-2  bg-spotify-green rounded-full text-black hover:bg-spotify-green-dark ${isLoading && "px-3 py-1 right-2"}`}
          >
            {isLoading && <Loading />}
          </button>
      </form>
    </div>
  );
};

export default SearchComponent;
