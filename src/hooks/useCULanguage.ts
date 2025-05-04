import { useEffect, useState } from "react";
import { FormData, FormErrors } from "@/types/language.types";
import { apiAddLanguage, apiUpdateLanguage } from "@/app/api/programming";
import { toast } from "react-toastify";

export default function useCULanguage({
  onClose,
  mode = "add",
  languageToUpdate,
}: {
  onClose: () => void;
  mode?: "add" | "update";
  languageToUpdate?: FormData;
}) {
  const [formData, setFormData] = useState<FormData>(
    mode === "update" && languageToUpdate
      ? languageToUpdate
      : {
          name: "",
          icon: "",
          description: "",
          categories: [],
          materials: [],
          published: false,
        }
  );

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: "Nama bahasa wajib diisi.",
    icon: "URL ikon wajib diisi.",
    description: "Deskripsi wajib diisi.",
    categories: "Minimal 1 kategori harus dipilih.",
    materials: "Minimal 1 materi harus ditambahkan.",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (data: FormData): boolean => {
    const errors: FormErrors = {};

    if (!data.name.trim()) {
      errors.name = "Nama bahasa wajib diisi.";
    }
    if (!data.icon.trim()) {
      errors.icon = "URL ikon wajib diisi.";
    } else if (!data.icon.endsWith(".svg")) {
      errors.icon = "URL ikon harus berupa file .svg.";
    }
    if (!data.description.trim()) {
      errors.description = "Deskripsi wajib diisi.";
    }
    if (data.categories.length === 0) {
      errors.categories = "Minimal 1 kategori harus dipilih.";
    }
    if (data.materials.length === 0) {
      errors.materials = "Minimal 1 materi harus ditambahkan.";
    }

    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  useEffect(() => {
    if (mode === "update" && languageToUpdate) {
      validateForm(formData);
    }
  }, [mode, languageToUpdate]);

  const isFormValid = (): boolean => {
    return Object.values(formErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    if (!validateForm(formData)) return;

    setIsLoading(true);

    try {
      if (mode === "add") {
        await apiAddLanguage(formData);
      } else if (mode === "update" && languageToUpdate) {
        await apiUpdateLanguage(languageToUpdate.name, formData);
      }

      window.location.reload();

      setTimeout(() => {
        toast.success(
          mode === "add"
            ? "Bahasa pemrograman berhasil ditambahkan."
            : "Bahasa pemrograman berhasil diperbarui."
        );
      }, 100);
      onClose();
    } catch (err: any) {
      const errorMessage =
        err.message || "Terjadi kesalahan saat menambahkan/memperbarui bahasa.";
      toast.error(errorMessage);
      console.error("Submit failed:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    formErrors,
    setFormData,
    setFormErrors,
    isLoading,
    isFormValid,
    handleSubmit,
  };
}
