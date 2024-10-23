import Image from "next/image";

interface chats {
  id: number;
  avatar: string;
  name: string;
  message: string;
  time: string;
}
const chats:chats[] = [
  {
    id: 1,
    avatar: "https://i.scdn.co/image/ab6775700000ee85604fbf7c4e971678ceefd34e",
    name: "John Doe",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    time: "10:00 AM",
  },
  {
    id: 2,
    avatar: "https://i.scdn.co/image/ab6775700000ee85c3718099ef6c51236aca8983",
    name: "Jane Doe",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    time: "10:05 AM",
  },
	{
		id: 3,
		avatar: "https://i.scdn.co/image/ab6775700000ee854349a9f2f7eba676c7b30418",
		name: "John Doe",
		message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		time: "10:10 AM",
	},
	{
		id: 4,
		avatar: "https://i.scdn.co/image/ab6775700000ee85853b3ddc9e7410822e2dfee0",
		name: "Jane Doe",
		message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		time: "10:15 AM",
	}
]
const PreviewChat = () => {
	// adelanto de la solicitud a la API (descomentar las lineas siguiente e impotar las librerias para implementar y usar variable data)
	// const appToken = useAppSelector((state) => state.userReducer.appToken?.token);
  // const { data } = useGetPreviewChatsQuery({
  //   appToken,
  //   page:0
  // })

  return (
    <div className="flex flex-col gap-4 mt-8">
			<h2 className="font-extrabold text-2xl md:text-3xl text-center md:text-left">
				Chat Preview
			</h2>
			{
				chats.map(chat => (
					<div key={chat.id} className="flex flex-col gap-2 p-4 rounded-lg bg-spotify-light-gray">
						<div className="flex gap-2 items-center">
							<Image
								src={chat.avatar}
								width={24}
								height={24}
								className="w-8 h-8 rounded-full"
								alt={chat.name}
							/>
							<div>
								<p className="text-sm font-semibold">{chat.name}</p>
								<p className="text-xs text-gray-500">{chat.time}</p>
							</div>
						</div>
						<p className="text-sm">{chat.message.substring(0, 100)}...</p>
					</div>
				))
			}
    </div>
  );
};

export default PreviewChat;