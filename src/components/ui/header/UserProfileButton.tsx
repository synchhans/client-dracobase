import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ProfilePanel from "./ProfilePanel";
import { User } from "@/types/user.types";

export default function UserProfileButton({
  id4,
  user,
  handleLogout,
}: {
  id4?: string;
  user: User;
  handleLogout: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <div
        className="cursor-pointer hover:bg-gray-100 px-1 rounded-xs"
        onClick={() => setIsOpen(!isOpen)}
        id={id4}
      >
        <Image
          src={user.picture!}
          width={30}
          height={30}
          alt="User Profile"
          className="rounded-full"
          priority
        />
      </div>

      {isOpen && <ProfilePanel handleLogout={handleLogout} />}
    </div>
  );
}
