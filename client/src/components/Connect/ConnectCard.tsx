import Image from 'next/image';

interface props {
    country: string;
    display_name: string;
    profile_photo: string;
}

export default function ConnectCard({country, display_name, profile_photo}: props) {

  return (
    <div className="bg-spotify-light-gray p-4 rounded-lg shadow-lg w-[100%] min-w-[280px] max-w-[450px] self-center md:self-start">
      
      <div className="flex items-center space-x-4">
        <Image
          className="w-16 h-16 rounded-full object-cover"
          width={40}
          height={40}
          src={profile_photo}
          alt={`${display_name} profile`}
        />
        <div>
          <h3 className="text-white font-bold text-lg">{display_name}</h3>
          <p className="text-spotify-green font-semibold">{country}</p>
        </div>
      </div>
    </div>
  );
}
