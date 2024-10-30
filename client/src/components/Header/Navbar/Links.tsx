
import { CiHome, CiChat1  } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";




interface Link {
  id: number;
  name: string;
  url: string;
  icon: JSX.Element;
}

export const links: Link[] = [
  {
    id: 1,
    name: "Home",
    url: "/",
    icon: <CiHome className="h-6 w-6" />, 
  },
  {
    id: 2,
    name: "Message",
    url: "/messages",
    icon: <CiChat1 className="h-6 w-6" />,
  },
  {
    id: 3,
    name: "Connect",
    url: "/connect",
    icon: <FaUserFriends className="h-6 w-6" />,
  }
];