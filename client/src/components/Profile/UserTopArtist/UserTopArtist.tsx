
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/slices/userSlice";
import Image from "next/image";
import { useEffect } from "react";

const UserTopArtist = () => {
 
  const data = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  
  

  const topArtist = data?.user_top_artist;
  console.log(topArtist)

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className=" w-[100%] md:w-[50%]">
      <h2 className="text-3xl text-white font-bold font-sans">Top Artist</h2>
      <div className="bg-spotify-light-gray mt-4 rounded-lg mb-10">
        <div>
          {topArtist && topArtist.items && topArtist.items.length > 0 ? (
             topArtist.items.slice(0, 10).map((artist , index) => (
              <div key={artist?.artist_id} className="flex items-center gap-3 p-4 rounded-lg">
                <p className="text-[#63707F]">{index + 1}</p>
                {artist?.artist_photo ? (
                    <Image width={50} height={50} src={artist?.artist_photo} alt={artist?.artist_name} className="rounded-full object-fill  border-white"/>
                ) : null}
                <h3>{artist?.artist_name}</h3>
              </div>
            ))
          ) : (
            <p>No hay artistas destacados disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTopArtist;
