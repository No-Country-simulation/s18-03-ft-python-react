import Image from "next/image";
import { getRecentUsers } from "@/supabase/getRecentUsers";
import { useEffect, useState } from "react";
import { Userinfo } from "@/types";

// Component to display each user’s data
function CardUserRJ({ user }: { user: Userinfo }) {
  return (
    <li className="text-white text-base">
      <a href={`/profile/${user.spotify_id}`} className="flex flex-row items-center justify-center gap-x-2">
        <Image
          src={user.profile_photo || "/default-profile.jpg"}
          width={24}
          height={24}
          className="rounded-full w-6 h-6"
          alt={user.display_name}
        />
        <span>{user.display_name}</span>
      </a>
    </li>
  );
}

// Main Component
export default function RecentlyJoined() {
  const [recentlyJoined, setRecentlyJoined] = useState<Userinfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getRecentUsers(15);

      if ("error" in result) {
        setError(result.error);
      } else {
        setRecentlyJoined(result as Userinfo[]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <h2 className="font-extrabold text-2xl md:text-3xl text-center md:text-left">
        Recently Joined
      </h2>

      {error ? (
        <p className="text-red-500">Error loading recently joined users.</p>
      ) : (
        <ul className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
          {recentlyJoined.length === 0 ? (
            <p>No recently joined users found.</p>
          ) : (
            recentlyJoined.map((user) => <CardUserRJ user={user} key={user.id} />)
          )}
        </ul>
      )}
    </>
  );
}
