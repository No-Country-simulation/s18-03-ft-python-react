
import { Song, Userinfo } from "@/types";
import Image from "next/image";
import Link from "next/link";


type Props = {
  user: Userinfo | null
};

const UserTopSongs = ({user}: Props) => {

  
  const topSongs = user?.user_top_songs
  
  return (
    <div className="w-[100%] md:w-[50%]">
      <h2 className="text-3xl text-white font-bold font-sans">Top Songs</h2>
      <div className="bg-spotify-light-gray mt-4 rounded-lg mb-10">
        <div>
        <div className="relative flex justify-center items-center p-10">
            <Image
              src={
                topSongs?.[1]?.song_image ||
                "https://i.scdn.co/image/ab6775700000ee852ba57998f0be198a92734260"
              }
              alt={topSongs?.[0]?.artist_name || "artist"}
              width={120}
              height={120}
              className="rounded-md absolute left-10 hover:-translate-x-6 hover:-rotate-12 transition-transform"
            />
            <Image
              src={
                topSongs?.[0]?.song_image ||
                "https://i.scdn.co/image/ab6775700000ee852ba57998f0be198a92734260"
              }
              alt={topSongs?.[1]?.artist_name || "artist"}
              width={160}
              height={120}
              className="rounded-md z-10 hover:scale-110 transition-transform"
            />
            <Image
              src={
                topSongs?.[2]?.song_image ||
                "https://i.scdn.co/image/ab6775700000ee852ba57998f0be198a92734260"
              }
              alt={topSongs?.[2]?.artist_name || "artist"}
              width={120}
              height={120}
              className="rounded-md absolute right-10 hover:translate-x-6 transition-transform hover:rotate-12"
            />
          </div>


          {topSongs && topSongs.length > 0 ? (
            // Mapeamos las canciones del usuario
            topSongs.map((song: Song, index: number) => (
              <div key={song.song_id} className="flex items-center gap-3 p-4 rounded-lg">
                <p className="text-[#63707F] font-sans font-bold text-lg">{index + 1} </p>
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
                  <Link href={song?.song_uri}><h3 className="hover:text-spotify-green font-sans">{song.song_name}</h3></Link>
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