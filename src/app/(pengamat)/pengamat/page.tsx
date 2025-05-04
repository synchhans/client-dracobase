"use client";

import { recentContentMap } from "@/constants/recentContentMap";
import withPengamatAuth from "@/hocs/withPengamatAuth";

const tutorialSteps = [
  {
    element: "#step-lencana",
    intro:
      "Lencana ini adalah tanda apresiasi khusus untuk para pengamat seperti Anda — yang tetap berkontribusi meski dengan akses terbatas. Anda adalah bagian dari perjalanan developer platform.",
  },
  {
    element: "#step-button-pengamat",
    intro:
      "PENTING! Klik ikon ini untuk mengirim saran beserta schreenshot nya, atau bisa hubungi jika ada yang mau didiskusikan dengan developer platform.",
  },
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
  {
    element: "#step-button-account",
    intro:
      "Ini adalah Fitur khusus untuk monitoring account, jika anda butuh untuk mengunjunginya harap hubungi developer platform.",
  },
  {
    element: "#step-button-maintenance",
    intro:
      "Ini adalah Fitur khusus untuk maintenance platform ini, jika anda butuh untuk mengunjunginya harap hubungi developer platform.",
  },
];

export default withPengamatAuth(
  recentContentMap,
  "dashboard-pengamat",
  tutorialSteps
);
