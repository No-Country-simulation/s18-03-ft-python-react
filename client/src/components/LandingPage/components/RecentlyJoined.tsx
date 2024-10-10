import Image from "next/image";
import demoData from "../../../services/demoRecentlyJoined.json"; // Datos demos, mientras se crea el backend

interface url {
  url: string;
}
interface User {
  user_id: string;
  images: url[];
  display_name: string;
}

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

export default function RecentlyJoined() { 
  return (
  <>
    <h2 className="font-extrabold text-2xl md:text-3xl text-center md:text-left">
      Recently Joined
    </h2>
    <div id="users" className="mt-8">
      <ul className="flex flex-wrap gap-4 justify-center md:justify-start">
        {
          demoData.map((user: User, key: number) => (
              <CardUserRJ user={user} key={key}/>
          ))
        }
      </ul>
    </div>
  </>
  );
}