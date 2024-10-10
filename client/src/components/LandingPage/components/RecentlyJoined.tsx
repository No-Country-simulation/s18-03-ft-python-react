import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { useGetRecentlyJoinedQuery } from "@/services/RecentlyApi";

// Datos demos, mientras se crea el backend
// import demoData from "../../../services/demoRecentlyJoined.json";

interface url {
  url: string;
}
interface User {
  user_id: string;
  images: url[];
  display_name: string;
}

// Componente para mostrar si hay error
function Error({text, error}: {text:string, error: FetchBaseQueryError | SerializedError | undefined}) {
  return error && <div className="text-red-700 font-bold mt-8">{text}</div>
}
// Componente para mostrar si se esta cargando
function IsLoding({isLoading}: {isLoading: boolean}) {
  return isLoading && <div className="text-white mt-8">Loading...</div>
}

// Componente para mostrar los datos de un usuario
function CardUserRJ({user}: {user: User}) {
  return (
    <li className="text-white text-base">
      <a href={`/user/${user.user_id}`} className="flex flex-row items-center justify-center gap-x-2">
        <Image
          src={user.images[0].url}
          width={24}
          height={24}
          className="rounded-full w-6 h-6"
          alt={user.display_name}
        />
        <span className="">{user.display_name}</span>
      </a>
    </li>
  )
}

//  Componente principal
export default function RecentlyJoined() {
  const appToken = useAppSelector((state) => state.userReducer.appToken?.token);

  const { data:recently, error, isLoading } = useGetRecentlyJoinedQuery({
    appToken,
    limit:"10"
  });

  return (
  <>
    <h2 className="font-extrabold text-2xl md:text-3xl text-center md:text-left">
      Recently Joined
    </h2>
    <Error error={error} text="Error"/>
    <IsLoding isLoading={isLoading}/>
    <ul className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
      {
        recently?.length === 0 ? <Error error={{status:0,data:null}} text="No data"/> :
        recently?.map((user: User, key: number) => (
          <CardUserRJ user={user} key={key}/>
        ))
      }
    </ul>
  </>
  );
}