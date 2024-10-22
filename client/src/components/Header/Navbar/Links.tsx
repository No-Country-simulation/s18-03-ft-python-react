
import { HomeIcon, ChatBubbleBottomCenterIcon, UsersIcon } from "@heroicons/react/24/outline";


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
    url: "/home",
    icon: <HomeIcon className="h-5 w-5" />, 
  },
  {
    id: 2,
    name: "Message",
    url: "/Message",
    icon: <ChatBubbleBottomCenterIcon className="h-5 w-5" />,
  },
  {
    id: 3,
    name: "Connect",
    url: "/connect",
    icon: <UsersIcon className="h-5 w-5" />,
  },
];