import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import { lazy, Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const Features = lazy(() => import("@/components/layout/Features"));
const UseCase = lazy(() => import("@/components/layout/UseCase"));
const Footer = lazy(() => import("@/components/layout/Footer"));

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <Features />
        <UseCase />
        <Footer />
      </Suspense>
    </div>
  );
}
