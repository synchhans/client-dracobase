import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-12 bg-gray-900">
      <div className="container px-6 mx-auto text-center md:text-left">
        <div className="flex flex-col items-center justify-between mb-8 space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-500">Dracobase</span>
            <p className="text-sm text-gray-400">
              Platform Pemrograman Berbasis AI
            </p>
          </div>

          <div className="flex flex-col space-y-2 text-gray-400 md:flex-row md:space-y-0 md:space-x-6">
            <a href="#features" className="hover:text-blue-500 transition">
              Fitur
            </a>
            <a href="#usecase" className="hover:text-blue-500 transition">
              Kasus Pengguna
            </a>
            <Link href="/support" className="hover:text-blue-500 transition">
              Dukungan
            </Link>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm text-gray-400">
            &copy; 2025 Dracobase. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <a
              href="https://github.com/synchhans"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <FaGithub className="w-8 h-8" />
            </a>
            <a
              href="https://www.linkedin.com/in/muhamadfarhaninc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <FaLinkedin className="w-8 h-8" />
            </a>
            <a
              href="https://www.youtube.com/@codeworshipper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <FaYoutube className="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com/sphansay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <FaInstagram className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
