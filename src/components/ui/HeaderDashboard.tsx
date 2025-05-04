import { HeaderDashboardProps } from "@/types/headerDashboard.types";
import LanguageModal from "../modal/LanguageModal";
import NotificationButton from "./header/NotificationButton";
import UserProfileButton from "./header/UserProfileButton";
import RestartTutorialButton from "./header/RestartTutorialButton";

import { BiCheckCircle } from "react-icons/bi";
import Image from "next/image";

export default function HeaderDashboard({
  tutorialKey,
  id1,
  id2,
  id3,
  id4,
  id5,
  user,
  handleLogout,
}: HeaderDashboardProps) {
  return (
    <div className="flex justify-between py-3 px-5 h-14 items-center">
      <div className="inline-flex gap-x-2 items-center">
        <a
          href={
            user.level === "admin"
              ? "/master"
              : user.level === "pengamat"
              ? "/pengamat"
              : "/dashboard"
          }
          className="px-0.5 hover:bg-gray-100 rounded-sm"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={10}
            height={10}
            className="w-8 h-auto"
          />
        </a>

        <div className="hidden md:flex items-center group">
          <p
            className="cursor-pointer px-0.5 hover:bg-gray-100 rounded-xs transition-colors duration-200"
            title={user.displayName ? user.displayName : user.githubUsername}
          >
            {user.displayName ? user.displayName : user.githubUsername}
          </p>

          {user.level === "admin" && (
            <BiCheckCircle className="text-red-500" size={16} title="Master" />
          )}

          {user.level === "pengamat" && (
            <BiCheckCircle
              className="text-blue-500"
              size={16}
              title="Pengamat - Akses terbatas"
              id={id1}
            />
          )}
        </div>
      </div>

      <div className="inline-flex gap-x-3 items-center">
        {tutorialKey && id2 && (
          <RestartTutorialButton tutorialKey={tutorialKey} id1={id2} />
        )}
        <LanguageModal userId={user._id} role={user.level} id2={id3} />
        <NotificationButton id3={id4} />
        <UserProfileButton user={user} handleLogout={handleLogout} id4={id5} />
      </div>
    </div>
  );
}
