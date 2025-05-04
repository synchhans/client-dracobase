import Link from "next/link";
import { GiWorld } from "react-icons/gi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function JoinOur() {
  return (
    <section className="py-24 bg-gray-50 min-h-1/2" id="join">
      <div className="container px-6 mx-auto text-center">
        <h2 className="text-6xl font-bold text-gray-800 mb-8">
          Join Our Community
        </h2>

        <div className="flex justify-center space-x-6">
          <Link
            href="#"
            className="relative inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-110"
          >
            <GiWorld className="text-white w-12 h-12" />
          </Link>

          <Link
            href="#"
            className="relative inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-110"
          >
            <IoChatbubbleEllipsesOutline className="text-white w-12 h-12" />
          </Link>
        </div>
      </div>
    </section>
  );
}
