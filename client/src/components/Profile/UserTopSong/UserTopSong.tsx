import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/slices/userSlice";
import { Song } from "@/types";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

const UserTopSongs = () => {
  const data = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  
  
  const topSongs = data?.user_top_songs
  ;
  console.log(topSongs);  

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="w-[100%] md:w-[50%]">
      <h2 className="text-3xl text-white font-bold font-sans">Top Songs</h2>
      <div className="bg-spotify-light-gray mt-4 rounded-lg mb-10">
        <div>
          {topSongs && topSongs.length > 0 ? (
            // Mapeamos las canciones del usuario
            topSongs.map((song: Song, index: number) => (
              <div key={song.song_id} className="flex items-center gap-3 p-4 rounded-lg">
                <p className="text-[#63707F]">{index + 1}</p>
                {song.song_image ? (
                  <Image
                    width={48}
                    height={50}
                    src={song.song_image}
                    alt={song.song_name}
                    className="rounded-full object-fill border-white"
                  />
                ) : null}
                <div>
                  <Link href={song?.song_uri}><h3 className="hover:text-spotify-green">{song.song_name}</h3></Link>
                  <p className="text-sm text-[#63707F]">{song.artist_name}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No highlight songs avalaible for this user</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTopSongs;