import { ArrowRightIcon } from "@heroicons/react/24/solid";


const loginRedirect = process.env.NEXT_PUBLIC_AUTHORIZE_LOGIN

export default function LoginBtn() {
  return (
        <a
          href={loginRedirect}
          className="text-spotify-green rounded font-bold flex items-center gap-[.2rem] justify-center mx-auto max-w-[160px] text-center text-[1.6rem]"
        >
          Log in <ArrowRightIcon className="size-6 text-spotify-green" />{" "}
        </a>

  )
}
