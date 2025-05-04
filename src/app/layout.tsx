import type { Metadata } from "next";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "intro.js/introjs.css";

export const metadata: Metadata = {
  title: "Dracobase: Platform Pemrograman",
  description: "berbasis AI, feedback Otomatis, debugging, untuk Mahasiswa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
