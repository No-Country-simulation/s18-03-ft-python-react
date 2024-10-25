import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface chat {
	user: string;
	time: string;
	avatar: string;
	message: string;
}

// datos iniciales DEMO
const chatBase:chat[] = [
	{user:"John Doe", time:"10:00", avatar:"https://i.scdn.co/image/ab6775700000ee85604fbf7c4e971678ceefd34e", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"me", time:"10:05", avatar:"https://i.scdn.co/image/ab6775700000ee85c3718099ef6c51236aca8983", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"John Doe", time:"10:10", avatar:"https://i.scdn.co/image/ab6775700000ee85604fbf7c4e971678ceefd34e", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"John Doe", time:"10:11", avatar:"https://i.scdn.co/image/ab6775700000ee85604fbf7c4e971678ceefd34e", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"me", time:"10:20", avatar:"https://i.scdn.co/image/ab6775700000ee85c3718099ef6c51236aca8983", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"John Doe", time:"10:30", avatar:"https://i.scdn.co/image/ab6775700000ee85604fbf7c4e971678ceefd34e", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"me", time:"10:40", avatar:"https://i.scdn.co/image/ab6775700000ee85c3718099ef6c51236aca8983", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"me", time:"10:41", avatar:"https://i.scdn.co/image/ab6775700000ee85c3718099ef6c51236aca8983", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
];

// estilos para globos de chat
const bocadoUser = "before:-left-4 before:border-l-transparent before:border-t-[#2b2b35] before:border-r-[#2b2b35]";
const bocadoMe = "before:-right-4 before:border-r-transparent before:border-t-emerald-900 before:border-l-emerald-900";
const roundedUser = "rounded-tr-lg ml-4"
const roundedMe ="rounded-tl-lg mr-4"

function Chat () {	const ref = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState<chat[]>(chatBase);
  const [message, setMessage] = useState<{message:string}>({message:""});

	useEffect(() => {
    // coloca el foto en el ultimo mensaje
		if (ref.current) {
			ref.current.scrollTop = ref.current.scrollHeight;
		}
	}, [chat]);

  const handlerMessage = (e:React.ChangeEvent<HTMLInputElement>) => {
    setMessage({...message, message:e.target.value});
  };

  const handlerSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.message === "") return; // verifica que no se envie un mensaje vacio
    const date = new Date();
    // las siguientes lineas se deberian hacer en el backend, hora de envio del mensaje y avatar del usuario
    const [hour, minute] = date.toTimeString().split(":");
    const newMessage = {...message, user:"me", time:`${hour}:${minute}`, avatar:"https://i.scdn.co/image/ab6775700000ee85604fbf7c4e971678ceefd34e"};
    setChat([...chat, newMessage]);
    setMessage({message:""});
  };

	return (
    <div className="bg-spotify-light-gray mt-4 mb-4 rounded-lg w-full pt-6">
      <div ref={ref} className="max-h-[500px] overflow-y-auto border-b-2 border-gray-700 px-6">
        {
          chat.map((chat, idx) => (
            <div key={idx} className="flex">
              <div className={`flex flex-col gap-2 p-4 max-w-[70%] mb-4 rounded-b-lg relative before:contents-[''] before:absolute before:top-0 before:border-[.5rem] before:border-b-transparent
                ${chat.user === "me" ? roundedMe : roundedUser}
                ${chat.user === "me" ? bocadoMe : bocadoUser}
                ${chat.user === "me" ? "bg-emerald-900 ml-auto" : "bg-[#2b2b35] mr-auto"}`}>
                <div className={`flex gap-2 items-center ${chat.user ==="me" && "justify-end"}`}>
                  <Image
                    src={chat.avatar}
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8"
                    alt={chat.user}
                  />
                  <div>
                    <p className="text-sm font-semibold">{chat.user}</p>
                    <p className="text-xs text-gray-500">{chat.time}</p>
                  </div>
                </div>
                <p className={`text-sm flex gap-2 items-center ${chat.user ==="me" && "justify-end"}`}>{chat.message}</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className="pb-6 mx-6">
        <form className="flex justify-center mt-4 gap-4" onSubmit={handlerSend}>
          <input type="text" className="w-full p-2 rounded-lg" placeholder="Type your message here..." value={message.message} onChange={handlerMessage} />
          <button type="submit" className="bg-emerald-900 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-300" >
            Send
          </button>
        </form>
      </div>
    </div>
	)
}

export default Chat