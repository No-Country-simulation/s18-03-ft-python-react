import { UserTopSongs } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";


const UserTopSong = () => {

  const [topSong, setTopSong] = useState<UserTopSongs | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); 
      console.log("parsedUser", parsedUser);
      console.log("top_songs", parsedUser?.user_top_songs);

      setTopSong(parsedUser?.user_top_songs);
    }
  }, []);


  return (
    <div className="rounded-lg md:w-[50%]">
      <h2 className="text-3xl text-white font-bold font-sans">Top Song</h2>

      <div className="bg-spotify-light-gray mt-4 mb-10 rounded-lg">
        <div>
          {topSong && topSong.items && topSong.items.length > 0 ? (
            topSong.items.slice(0, 10).map((song, index) => (
              <div key={song.id} className="flex items-center gap-3 p-4 rounded-lg">
                <p className="text-[#63707F]">{index + 1}</p>
                {song.album.images.length > 0 && (
                  <Image
                    width={50}
                    height={50}
                    src={song.album.images[0]?.url}
                    alt={song.name}
                    className="rounded-full object-fill  border-white"
                  />
                )}
                <h3>{song.name}</h3>
              </div>
            ))
          ) : (
            <p>No hay canciones destacadas disponibles.</p>
          )}
        </div>
          ))
    </div>
    </div>
  )
}

export default UserTopSong