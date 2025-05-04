"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const Hero = () => {
  const ref = useRef(null);

  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d3/JavaScript_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/f8/Python_logo_and_wordmark.svg",
    "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/f5/Typescript.svg",
    "https://upload.wikimedia.org/wikipedia/commons/9/95/Tailwind_CSS_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg",
    "https://upload.wikimedia.org/wikipedia/id/a/a5/MongoDB_Fores-Green_logo.svg",
  ];

  return (
    <section
      ref={ref}
      className="flex flex-col items-center justify-center px-4 py-8 text-center bg-gray-50 relative"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="container p-4 mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl md:text-6xl">
          Platform Pemrograman Berbasis AI
        </h1>
        <p className="mt-4 text-base text-gray-600 sm:text-lg md:text-xl">
          Dracobase adalah platform pemrograman berbasis AI dengan feedback
          otomatis dan debugging untuk mahasiswa.
        </p>
        <div className="flex flex-col justify-center space-y-4 mt-8 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Link
            href="#usecase"
            className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded sm:text-base hover:bg-blue-700"
          >
            Memulai
          </Link>
          <Link
            href="#features"
            className="px-6 py-3 text-sm font-medium text-gray-600 border rounded sm:text-base hover:bg-gray-100"
          >
            Pelajari lebih lanjut
          </Link>
        </div>
      </div>

      <div className="w-full bg-gray-50 absolute lg:bottom-10 bottom-0 left-0 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content flex">
            {logos.map((logo, index) => (
              <Image
                src={logo}
                alt={`Partner ${index + 1}`}
                width={800}
                height={600}
                className="logo"
                key={index}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wQAAwAB/1h7bQAAAABJRU5ErkJggg=="
                priority={index < 3}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
