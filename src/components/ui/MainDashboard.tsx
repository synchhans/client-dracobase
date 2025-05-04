import { MainDashoardProps } from "@/types/mainDashoardProps.types";
import SidebarDashboard from "./SidebarDashboard";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";

export default function MainDashboard({
  id6,
  id7,
  id8,
  id9,
  id10,
  id11,
  user,
  contentMap,
}: MainDashoardProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const getContent = () => {
    const ContentComponent = contentMap[pathname];
    if (!ContentComponent) {
      return <div>Content Not Allowed</div>;
    }

    return React.createElement(ContentComponent, { user });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {isMobile && (
        <button
          ref={buttonRef}
          className="p-4 bg-transparent text-gray-700 fixed top-0 left-0 z-49 cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <div id={id6}>
            <div id={id7}>
              <div id={id8}>
                <div id={id9}>
                  <div id={id10}>
                    <div id={id11}>
                      <FaBars className="text-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
      )}

      {!isMobile && (
        <div
          ref={sidebarRef}
          className={`w-64 h-[calc(100vh-56px)] bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 md:translate-x-0 md:relative fixed z-40`}
        >
          <SidebarDashboard
            user={user}
            id6={id6}
            id7={id7}
            id8={id8}
            id9={id9}
            id10={id10}
            id11={id11}
          />
        </div>
      )}

      <div
        className={`flex-1 p-4 ${
          isSidebarOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {getContent()}
      </div>
    </div>
  );
}
