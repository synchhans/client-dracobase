"use client";
import Header from "@/components/layout/Header";
import FindHelp from "@/app/support/components/FindHelp";
import ContactOur from "@/app/support/components/ContactOur";
import JoinOur from "@/app/support/components/JoinOur";
import Footer from "@/components/layout/Footer";

const Support = () => {
  const customNavLinks = [
    { href: "#help", label: "Bantuan" },
    { href: "#contact", label: "Hubungi Kami" },
    { href: "#join", label: "Gabung Kami" },
  ];
  return (
    <div>
      <Header navLinks={customNavLinks} />
      <FindHelp />
      <ContactOur />
      <JoinOur />
      <Footer />
    </div>
  );
};

export default Support;
