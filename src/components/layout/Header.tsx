"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeaderProps } from "@/types/header.types";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorHandler from "../common/ErrorHandler";

const Header = ({ navLinks }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthorized, isLoading, error } = useAuth(false);

  const defaultNavLinks = [
    { href: "#features", label: "Fitur" },
    { href: "#usecase", label: "Kasus Pengguna" },
    { href: "/support", label: "Dukungan" },
  ];

  const links =
    Array.isArray(navLinks) && navLinks.length > 0 ? navLinks : defaultNavLinks;

  const menuVariants = {
    hidden: { opacity: 0, y: -20, display: "none" },
    visible: {
      opacity: 1,
      y: 0,
      display: "block",
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorHandler message={error!} onRetry={() => window.location.reload()} />
    );
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          aria-label="Homepage"
          className="flex items-center space-x-2 mr-16"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-blue-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
          </svg>
          <h1 className="text-xl font-bold text-blue-600">Dracobase</h1>
        </Link>

        <nav className="hidden space-x-6 md:flex">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {isAuthorized ? (
          <Link
            href="/dashboard"
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100 transition duration-300"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100 transition duration-300"
          >
            Login
          </Link>
        )}
        <Link
          href="/support/#contact"
          className="px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Contact Us
        </Link>
      </div>

      <div className="md:hidden flex items-center space-x-4">
        <Link
          href="/login"
          className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100 transition duration-300"
        >
          Login
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-600 hover:text-blue-600 focus:outline-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="absolute top-20 right-0 w-full bg-white shadow-lg rounded-lg py-4 px-6 md:hidden z-50 menu"
          >
            <nav className="space-y-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block text-gray-600 hover:text-blue-600 transition duration-300"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
