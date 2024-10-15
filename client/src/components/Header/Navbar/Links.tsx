import { FaHome, FaEnvelope, FaSignInAlt, FaUser } from 'react-icons/fa'; 

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
  },
  {
    id: 3,
    name: "Login",
    url: "/Login",
    icon: <FaSignInAlt />,
  },
  {
    id: 4,
    name: "Profile",
    url: "/Profile",
    icon: <FaUser />,
  },
];
