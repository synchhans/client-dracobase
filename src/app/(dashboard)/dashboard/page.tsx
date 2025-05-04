"use client";

import { recentContentMap } from "@/constants/recentContentMap";
import withUserAuth from "@/hocs/withUserAuth";

const tutorialSteps = [
  {
    element: "#step-re-tutorial",
    intro: "Klik ikon ini untuk mengulang panduan kapan saja.",
  },
  {
    element: "#step-recent",
    intro: "Lihat daftar workspace bahasa pemrograman yang sudah Anda buat.",
  },
  {
    element: "#step-recent-content",
    intro:
      "Ini adalah area daftar recent workspace. Klik card untuk membuka atau hapus jika tidak diperlukan.",
  },
  {
    element: "#step-button-language",
    intro:
      "Pilih bahasa pemrograman untuk mulai belajar atau membuat workspace baru.",
  },
  {
    element: "#step-button-notification",
    intro: "Lihat notifikasi terbaru dari sistem atau pengembang platform.",
  },
  {
    element: "#step-button-settings",
    intro: "Akses menu profil dan pengaturan akun di sini.",
  },
  {
    element: "#step-button-recent",
    intro:
      "Buka halaman Recent untuk melihat semua workspace yang pernah dibuat.",
  },
  {
    element: "#step-button-documentation",
    intro: "Lihat dokumentasi lengkap cara menggunakan platform ini.",
  },
  {
    element: "#step-button-setting",
    intro: "Update informasi profil, pengaturan akun, dan preferensi lainnya.",
  },
  {
    element: "#step-button-recently",
    intro:
      "Workspace yang dihapus tersimpan di sini. Bisa dikembalikan jika diperlukan.",
  },
];

export default withUserAuth(recentContentMap, "dashboard", tutorialSteps);
