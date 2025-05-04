import { SubmitButtonProps } from "@/types/language.types";

export default function SubmitButton({
  isLoading,
  isFormValid,
  handleSubmit,
  children = "Simpan",
}: SubmitButtonProps) {
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer ${
        isLoading || !isFormValid ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={handleSubmit}
      disabled={isLoading || !isFormValid}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
