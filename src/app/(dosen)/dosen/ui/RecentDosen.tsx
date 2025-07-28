"use client";

import DosenRecentSection from "./DosenRecentSection";
import PantauMahasiswaSection from "./PantauMahasiswaSection";

export default function RecentDosen() {
  return (
    <div className="p-4 md:p-6 space-y-8">
      <DosenRecentSection />

      <div className="border-t border-gray-200"></div>

      <PantauMahasiswaSection />
    </div>
  );
}