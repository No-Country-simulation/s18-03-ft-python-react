import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/slices/userSlice";
import Image from "next/image";
import { useEffect } from "react";


const UserTopSong = () => {

  const data = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();

  
  const topSong = data?.user_top_songs;
  
  console.log("topSong", topSong);
  
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);


  return (
    <div className="mb-10 rounded-lg md:w-[50%]">
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