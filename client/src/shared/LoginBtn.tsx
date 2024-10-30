import { ArrowRightIcon } from "@heroicons/react/24/solid";

const loginRedirect = process.env.NEXT_PUBLIC_AUTHORIZE_LOGIN;

export default function LoginBtn() {
  return (
    <a
      href={loginRedirect}
      className="bg-spotify-green text-black rounded-full font-bold flex items-center gap-2 justify-center mx-auto px-8 py-3 whitespace-nowrap"
    >
      <span className="text-xl">Log in</span>
      <ArrowRightIcon className="w-6 h-6" />
    </a>
  );
}
