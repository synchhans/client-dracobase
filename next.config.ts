import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.w3schools.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
