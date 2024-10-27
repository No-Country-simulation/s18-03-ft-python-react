import Image from 'next/image';

import CompatibilityBar from '@/shared/CompatibilityBar';

interface props {
    country: string;
    display_name: string;
    profile_photo: string;
    favGenres: string[];
    favArtists: string[]
    favSongs: string[]
}

export default function ConnectCard({country, display_name, profile_photo, favGenres, favArtists, favSongs}: props) {

  return (
    <div className="bg-spotify-light-gray p-4 rounded-lg shadow-lg w-[100%] min-w-[280px] max-w-[450px] self-center md:self-start flex flex-col items-center gap-4">
      
      <div className="flex items-center space-x-4 self-start">
        <Image
          className="rounded-full object-cover"
          src={profile_photo}
          alt={`${display_name} profile`}
          width={60}
          height={40}
        />
        <div>
          <h3 className="text-white font-bold text-lg">{display_name}</h3>
          <p className="text-spotify-green font-semibold">{country}</p>
        </div>
      </div>
      <CompatibilityBar favGenres={favGenres} favArtists={favArtists} favSongs={favSongs}/>
    </div>
  );
}
