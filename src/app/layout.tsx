import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "intro.js/introjs.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dracobase: Platform Belajar Pemrograman dengan Feedback AI",
  description:
    "Tingkatkan skill pemrograman Anda dengan Dracobase. Dapatkan feedback otomatis berbasis AI, debugging cerdas, dan materi terstruktur yang dirancang untuk mahasiswa.",

  keywords: [
    "belajar koding",
    "platform pemrograman",
    "feedback AI",
    "debugging otomatis",
    "pemrograman untuk mahasiswa",
    "belajar coding Indonesia",
  ],

  openGraph: {
    title: "Dracobase: Platform Belajar Pemrograman dengan Feedback AI",
    description:
      "Belajar pemrograman lebih efektif dengan feedback instan dari AI.",
    url: "https://dracobase.my.id",
    siteName: "Dracobase",
    images: [
      {
        url: "https://dracobase.my.id/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dracobase Platform Pemrograman AI",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dracobase: Platform Belajar Pemrograman dengan Feedback AI",
    description:
      "Belajar pemrograman lebih efektif dengan feedback instan dari AI.",
    images: ["https://dracobase.my.id/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: "/apple-touch-icon.png",
  },

  applicationName: "Dracobase",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dracobase",
  },

  manifest: "/site.webmanifest",

  metadataBase: new URL("https://dracobase.my.id"),

  alternates: {
    canonical: "https://dracobase.my.id",
    languages: {
      "id-ID": "https://dracobase.my.id",
    },
  },

  themeColor: "#ffffff",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  creator: "Muhamad Farhan",
  authors: [{ name: "Muhamad Farhan", url: "https://github.com/synchhans" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
