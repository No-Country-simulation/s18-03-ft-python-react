import { FaHome, FaEnvelope } from 'react-icons/fa'; 

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
    icon: <FaHome />, 
  },
  {
    id: 2,
    name: "Message",
    url: "/Message",
    icon: <FaEnvelope />,
  }
];
