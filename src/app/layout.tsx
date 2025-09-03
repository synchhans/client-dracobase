import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "intro.js/introjs.css";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "dracobase.my.id";

  const proto = process.env.NODE_ENV === "production" ? "https" : "http";
  const path = headersList.get("x-invoke-path") || "/";
  const url = `${proto}://${host}${path}`;

  return {
    title: "Dracobase: Platform Belajar Pemrograman dengan Feedback AI",
    description:
      "Tingkatkan skill pemrograman Anda dengan Dracobase. Dapatkan feedback otomatis berbasis AI, debugging cerdas, dan materi terstruktur yang dirancang untuk mahasiswa.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Dracobase: Platform Belajar Pemrograman dengan Feedback AI",
      description:
        "Belajar pemrograman lebih efektif dengan feedback instan dari AI.",
      url,
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
    metadataBase: new URL("https://dracobase.my.id"),
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
