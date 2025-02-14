import Link from "next/link";
import { HomeIcon, MicrophoneIcon, UserIcon, BookmarkIcon } from "@heroicons/react/24/solid";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md py-3 flex justify-around items-center z-50">
      <Link href="/">
        <HomeIcon className="h-8 w-8 text-[#F37826] cursor-pointer hover:scale-110 transition" />
      </Link>
      <Link href="/meus-cursos">
        <BookmarkIcon className="h-8 w-8 text-[#4CAF50] cursor-pointer hover:scale-110 transition" />
      </Link>
      <Link href="/perfil">
        <UserIcon className="h-8 w-8 text-[#F37826] cursor-pointer hover:scale-110 transition" />
      </Link>
    </div>
  );
};

export default BottomNav;
