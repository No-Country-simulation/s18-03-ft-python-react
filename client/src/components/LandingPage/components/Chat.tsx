import Image from "next/image";

interface chat {
	user: string;
	time: string;
	avatar: string;
	message: string;
}
const chat:chat[] = [
	{user:"John Doe", time:"10:00 AM", avatar:"https://i.scdn.co/image/ab6775700000ee85604fbf7c4e971678ceefd34e", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"me", time:"10:05 AM", avatar:"https://i.scdn.co/image/ab6775700000ee85c3718099ef6c51236aca8983", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"John Doe", time:"10:10 AM", avatar:"https://i.scdn.co/image/ab6775700000ee85604fbf7c4e971678ceefd34e", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"John Doe", time:"10:11 AM", avatar:"https://i.scdn.co/image/ab6775700000ee85604fbf7c4e971678ceefd34e", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"me", time:"10:20 AM", avatar:"https://i.scdn.co/image/ab6775700000ee85c3718099ef6c51236aca8983", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"John Doe", time:"10:30 AM", avatar:"https://i.scdn.co/image/ab6775700000ee85604fbf7c4e971678ceefd34e", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"me", time:"10:40 AM", avatar:"https://i.scdn.co/image/ab6775700000ee85c3718099ef6c51236aca8983", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
	{user:"me", time:"10:41 AM", avatar:"https://i.scdn.co/image/ab6775700000ee85c3718099ef6c51236aca8983", message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
];

const bocadoUser = "before:-left-4 before:border-l-transparent before:border-t-[#2b2b35] before:border-r-[#2b2b35]";
const bocadoMe = "before:-right-4 before:border-r-transparent before:border-t-emerald-900 before:border-l-emerald-900";
const roundedUser = "rounded-tr-lg ml-4"
const roundedMe ="rounded-tl-lg mr-4"
function Chat () {
	return (
		<div className="">
			<h2 className="font-extrabold text-2xl md:text-3xl text-center md:text-left mb-4">
				Chat
			</h2>
			{
				chat.map(chat => (
					<div key={chat.user} className="flex">
						<div className={`
							flex flex-col gap-2 p-4 max-w-[70%] mb-4 rounded-b-lg relative before:contents-[''] before:absolute before:top-0 before:border-[.5rem] before:border-b-transparent
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
	)
}

export default Chat