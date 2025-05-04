import { FormFieldsProps } from "@/types/language.types";
import MaterialInput from "./MaterialInput";

export default function FormFields({
  formData,
  formErrors,
  setFormData,
  setFormErrors,
}: FormFieldsProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (field: string, value: string) => {
    const errors = { ...formErrors };
    switch (field) {
      case "name":
        errors.name = value.trim() ? "" : "Nama bahasa wajib diisi.";
        break;
      case "icon":
        errors.icon = value.trim()
          ? value.endsWith(".svg")
            ? ""
            : "URL ikon harus berupa file .svg."
          : "URL ikon wajib diisi.";
        break;
      case "description":
        errors.description = value.trim() ? "" : "Deskripsi wajib diisi.";
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategories = formData.categories.includes(category)
      ? formData.categories.filter((cat: string) => cat !== category)
      : [...formData.categories, category];

    setFormData((prev) => ({ ...prev, categories: updatedCategories }));
    validateCategories(updatedCategories);
  };

  const validateCategories = (categories: string[]) => {
    const errors = { ...formErrors };
    errors.categories =
      categories.length > 0 ? "" : "Minimal 1 kategori harus dipilih.";
    setFormErrors(errors);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nama Bahasa
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {formErrors.name && (
          <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL Ikon (.svg)
        </label>
        <input
          type="text"
          name="icon"
          value={formData.icon}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {formErrors.icon && (
          <p className="text-sm text-red-500 mt-1">{formErrors.icon}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Deskripsi
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {formErrors.description && (
          <p className="text-sm text-red-500 mt-1">{formErrors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kategori
        </label>
        <div className="flex gap-2 mt-1 flex-wrap">
          {["frontend", "backend", "server", "browser", "popular"].map(
            (category) => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.categories.includes(category)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
          )}
        </div>
        {formErrors.categories && (
          <p className="text-sm text-red-500 mt-1">{formErrors.categories}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status Publikasi
        </label>
        <select
          name="published"
          value={formData.published ? "true" : "false"}
          onChange={(e) => {
            const value = e.target.value === "true";
            setFormData((prev) => ({ ...prev, published: value }));
          }}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="true">Dipublikasikan</option>
          <option value="false">Draft (Belum Dipublikasikan)</option>
        </select>
      </div>

      <MaterialInput
        materials={formData.materials}
        setFormData={setFormData}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
      />
    </div>
  );
}
