import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-12 bg-gray-900">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center justify-between mb-8 space-y-4 md:flex-row md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-3 text-center md:text-left">
            <span className="text-2xl font-bold text-blue-500">Dracobase</span>
            <p className="text-sm text-gray-400">
              Platform Pemrograman Berbasis AI
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-gray-400">
            <a href="#features" className="hover:text-blue-500 transition">
              Fitur
            </a>
            <a href="#usecase" className="hover:text-blue-500 transition">
              Kasus Pengguna
            </a>
            <Link href="/support" className="hover:text-blue-500 transition">
              Dukungan
            </Link>
            <Link href="#" className="hover:text-blue-500 transition">
              Proyek
            </Link>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-gray-400">
          <div className="text-center md:text-left">
            <p className="text-sm">
              &copy; 2025 Dracobase. All rights reserved.
            </p>
          </div>

          <div className="text-center md:text-center space-y-2">
            <h4 className="font-semibold text-gray-200">Proyek Kami</h4>
            <a
              href="https://kingsonght.dracobase.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 block"
            >
              KingSongHT (AI Playlist)
            </a>
            <Link href="#" className="hover:text-blue-500 block">
              Lihat Semua Proyek →
            </Link>
          </div>

          <div className="flex justify-center md:justify-end space-x-4">
            <a
              href="https://github.com/synchhans"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <FaGithub className="w-7 h-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/muhamadfarhaninc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <FaLinkedin className="w-7 h-7" />
            </a>
            <a
              href="https://www.youtube.com/@codeworshipper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <FaYoutube className="w-7 h-7" />
            </a>
            <a
              href="https://instagram.com/sphansay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <FaInstagram className="w-7 h-7" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
