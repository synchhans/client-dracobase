import FormFields from "../ui/programming/FormFields";
import SubmitButton from "../ui/programming/SubmitButton";
import { CULanguageModalProps } from "@/types/language.types";
import useCULanguage from "@/hooks/useCULanguage";

export default function CULanguageModal({
  onClose,
  mode = "add",
  languageToUpdate,
}: CULanguageModalProps) {
  const {
    formData,
    formErrors,
    setFormData,
    setFormErrors,
    isLoading,
    isFormValid,
    handleSubmit,
  } = useCULanguage({ onClose, mode, languageToUpdate });

  return (
    <div className="fixed inset-0 z-50 flex overflow-y-auto items-center justify-center backdrop-brightness-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {mode === "add"
            ? "Tambah Bahasa Pemrograman"
            : "Perbarui Bahasa Pemrograman"}
        </h2>

        <FormFields
          formData={formData}
          formErrors={formErrors}
          setFormData={setFormData}
          setFormErrors={setFormErrors}
        />

        <SubmitButton
          isLoading={isLoading}
          isFormValid={isFormValid()}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
