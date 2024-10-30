// import { useGetTopSongsPlaylistQuery } from "@/services/spotifyApi";
// import { Song } from "@/types";
// import Image from "next/image";
// import React from "react";

// const PopularSongNow = () => {
//   const {
//     data: playlistData,
//     isLoading,
//     error,
//   } = useGetTopSongsPlaylistQuery({});

//   // Check if loading or error state
//   if (isLoading) return <p>Loading...</p>;
//   if (error || !playlistData) return <p>Error loading data...</p>;

//   // Extract the tracks data, fallback to an empty array if not available
//   const TopSongs = playlistData?.tracks || [];

//   // Limit to top 10 songs
//   const topTenSongs = TopSongs.slice(0, 10);

//   // Split into two rows
//   const firstRow = topTenSongs.slice(0, 5);
//   const secondRow = topTenSongs.slice(5, 10);

//   return (
//     <article className="bg-spotify-light-gray rounded-lg w-full p-2 justify-center items-center mt-4">
//       <div className="w-[100%] mx-auto flex flex-col gap-[1rem] rounded pt-3 pb-5 mt-4">
//         <h2 className="text-white font-sans text-start px-4 text-lg font-bold mb-4">
//           Popular Now
//         </h2>
//         <p className="text-[#63707F] font-sans text-start px-4 text-sm">
//           What the world is listening to.
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-0 md:gap-[1rem] w-[100%] mx-auto">
//         {/* First row of songs */}
//         <div className="md:w-[50%] p-4 gap-2">
//           {firstRow.map((song: Song, index: number) => (
//             <div key={index} className="flex gap-4 mt-4">
//               <Image
//                 src={song.albumImageUrl || "/placeholder-image.jpg"}
//                 alt={`${song.albumName} cover`}
//                 width={50}
//                 height={100}
//                 className="rounded-lg w-16 h-16"
//               />
//               <div>
//                 <p className="text-white font-sans text-start px-4 text-sm font-bold">
//                   {song.songName}
//                 </p>
//                 <p className="text-[#63707F] font-sans text-start px-4 text-sm">
//                   {song.artists}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Second row of songs */}
//         <div className="md:w-[50%] p-4 gap-2">
//           {secondRow.map((song: Song, index: number) => (
//             <div key={index} className="flex gap-4 mt-4">
//               <Image
//                 src={song.albumImageUrl || "/placeholder-image.jpg"}
//                 alt={`${song.albumName} cover`}
//                 width={50}
//                 height={100}
//                 className="rounded-lg w-16 h-16"
//               />
//               <div>
//                 <p className="text-white font-sans text-start px-4 text-sm font-bold">
//                   {song.songName}
//                 </p>
//                 <p className="text-[#63707F] font-sans text-start px-4 text-sm">
//                   {song.artists}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </article>
//   );
// };

// export default PopularSongNow;
