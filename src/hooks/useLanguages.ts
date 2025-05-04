import { apiDeleteLanguage, apiGetLanguages } from "@/app/api/programming";
import { Language } from "@/types/language.types";
import { useState, useEffect } from "react";

export default function useLanguages() {
  const [languages, setLanguages] = useState<Language[]>([]);

  const fetchLanguages = async () => {
    try {
      const data = await apiGetLanguages();
      setLanguages(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message || "Gagal mengambil bahasa.");
      }
    }
  };

  const deleteLanguage = async (languageName: string) => {
    try {
      await apiDeleteLanguage(languageName);

      setLanguages((prev) => prev.filter((lang) => lang.name !== languageName));
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message || "Gagal menghapus bahasa.");
      }
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  return {
    languages,
    deleteLanguage,
  };
}
