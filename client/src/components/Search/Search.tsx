
import { searchUsers } from '@/supabase/searchUsers';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();


  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?q=${searchTerm}`);
      await searchUsers(searchTerm)
    }
  };




  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-xl px-4 bg-spotify-light-gray border-2 border-[#63707F] text-white"
        />
      </form>
    </div>
  );
};

export default SearchComponent;
