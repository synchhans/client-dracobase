import useLanguages from "@/hooks/useLanguages";
import useWorkspaces from "@/hooks/useWorkspaces";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaCode, FaEdit, FaEllipsisV, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import CULanguageModal from "./CULanguageModal";
import { Language } from "@/types/language.types";

export default function LanguageModal({
  id2,
  role,
  userId,
}: {
  id2?: string;
  role: string;
  userId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>([
    "popular",
  ]);
  const [isCUDModalOpen, setIsCUDModalOpen] = useState(false);
  const [isCModalOpen, setIsCModalOpen] = useState(false);
  const [languageToUpdate, setLanguageToUpdate] = useState<Language | null>(
    null
  );
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { languages, deleteLanguage } = useLanguages();
  const { createWorkspace, loading } = useWorkspaces();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleEditClick = (language: Language) => {
    setLanguageToUpdate(language);
    setIsCUDModalOpen(true);
  };

  const handleDeleteClick = async (languageId: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus bahasa ini?")) {
      try {
        await deleteLanguage(languageId);
        toast.success("Bahasa berhasil dihapus.");

        window.location.reload();
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(`Gagal menghapus bahasa: ${err.message}`);
        } else {
          toast.error(`Gagal tak terduga menghapus bahasa!`);
        }
      }
    }
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredLanguages = languages.filter((language) => {
    const matchesSearch = language.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategories.length === 0 ||
      activeCategories.some((cat) => language.categories.includes(cat));
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsWorkspaceModalOpen(true);
  };

  const closeWorkspaceModal = () => {
    setIsWorkspaceModalOpen(false);
    setSelectedLanguage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const workspaceName = formData.get("workspaceName") as string;
    const description = formData.get("description") as string;

    if (!workspaceName || !selectedLanguage) {
      toast.error("Nama workspace dan bahasa wajib diisi.");
      return;
    }

    try {
      await createWorkspace(
        userId,
        workspaceName,
        description,
        selectedLanguage._id!
      );

      toast.success("Workspace berhasil dibuat!");
      closeWorkspaceModal();
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Gagal membuat workspace: ${err.message}`);
      } else {
        toast.error(`Gagal tak terduga membuat workspace!`);
      }
    }
  };

  return (
    <>
      <button
        className="inline-flex items-center gap-x-2 md:py-1 lg:py-2 px-4 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer"
        onClick={openModal}
        id={id2}
      >
        <FaCode className="w-5 h-5" />
        Pilih Bahasa Pemrograman
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-lg sm:max-w-xl md:max-w-2xl p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Pilih Bahasa Pemrograman
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none text-xl cursor-pointer"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>

            {role === "admin" || role === "pengamat" || role === "dosen" ? (
              <button
                className={`mb-5 px-4 py-2 text-sm rounded-md transition-colors ${
                  role === "admin"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={
                  role === "admin" ? () => setIsCModalOpen(true) : undefined
                }
                disabled={role === "pengamat" || role === "dosen"}
                title={
                  role === "pengamat"
                    ? "Dibatasi oleh master. Hanya master yang bisa mengakses."
                    : role === "dosen"
                    ? "Dosen tidak dapat menambah bahasa. Hubungi Master."
                    : ""
                }
              >
                Tambah Bahasa Pemrograman
              </button>
            ) : null}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex flex-wrap gap-2">
                {["popular", "frontend", "backend", "server", "browser"].map(
                  (category) => (
                    <button
                      key={category}
                      className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                        activeCategories.includes(category)
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => toggleCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  )
                )}
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Cari bahasa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  ref={searchInputRef}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setSearchTerm("")}
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((language, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 px-1 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleLanguageSelect(language)}
                  >
                    <div className="flex items-center gap-x-4 flex-grow">
                      <div className="flex-shrink-0 relative w-10 h-10">
                        <Image
                          src={language.icon}
                          alt={`Icon ${language.name}`}
                          fill
                          priority
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">
                          {language.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                          {language.description}
                        </p>
                      </div>
                    </div>
                    {(role as "admin" | "pengamat" | "dosen") === "admin" && (
                      <div className="relative">
                        <button
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDropdownIndex(
                              dropdownIndex === index ? null : index
                            );
                          }}
                        >
                          <FaEllipsisV className="w-5 h-5 cursor-pointer" />
                        </button>

                        {dropdownIndex === index && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <ul className="py-1">
                              <li>
                                <button
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDropdownIndex(null);
                                    handleEditClick(language);
                                  }}
                                >
                                  <FaEdit className="w-4 h-4" />
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDropdownIndex(null);
                                    handleDeleteClick(language._id!);
                                  }}
                                >
                                  <FaTrash className="w-4 h-4" />
                                  Hapus
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {(role as "admin" | "pengamat" | "dosen") ===
                      "pengamat" && (
                      <div className="relative">
                        <button
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDropdownIndex(
                              dropdownIndex === index ? null : index
                            );
                          }}
                        >
                          <FaEllipsisV className="w-5 h-5 cursor-pointer" />
                        </button>

                        {dropdownIndex === index && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <ul className="py-1">
                              <li>
                                <button
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-400 hover:bg-gray-100 cursor-not-allowed opacity-60"
                                  disabled
                                  title="Dibatasi oleh master"
                                >
                                  <FaEdit className="w-4 h-4" />
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-100 cursor-not-allowed opacity-60"
                                  disabled
                                  title="Dibatasi oleh master"
                                >
                                  <FaTrash className="w-4 h-4" />
                                  Hapus
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {(role as "admin" | "pengamat" | "dosen") === "dosen" && (
                      <div className="relative">
                        <button
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDropdownIndex(
                              dropdownIndex === index ? null : index
                            );
                          }}
                        >
                          <FaEllipsisV className="w-5 h-5 cursor-pointer" />
                        </button>

                        {dropdownIndex === index && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <ul className="py-1">
                              <li>
                                <button
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDropdownIndex(null);
                                    handleEditClick(language);
                                  }}
                                >
                                  <FaEdit className="w-4 h-4" />
                                  Kelola Materi
                                </button>
                              </li>
                              <li>
                                <button
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-100 cursor-not-allowed opacity-60"
                                  disabled
                                  title="Dibatasi oleh master"
                                >
                                  <FaTrash className="w-4 h-4" />
                                  Hapus
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 text-sm sm:text-base">
                  Tidak ada hasil yang ditemukan.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isWorkspaceModalOpen && selectedLanguage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50"
          onClick={closeWorkspaceModal}
        >
          <div
            className="bg-white w-full max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Buat Workspace Baru
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none text-xl cursor-pointer"
                onClick={closeWorkspaceModal}
              >
                &times;
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Bahasa Pemrograman:
              </h3>
              <div className="flex items-center gap-x-4 mt-2">
                <div className="flex-shrink-0 relative w-10 h-10">
                  <Image
                    src={selectedLanguage.icon}
                    alt={`Icon ${selectedLanguage.name}`}
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    {selectedLanguage.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedLanguage.description}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="workspaceName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama Workspace
                </label>
                <input
                  type="text"
                  id="workspaceName"
                  name="workspaceName"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deskripsi (Opsional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300"
              >
                {loading ? "Membuat Workspace..." : "Buat Workspace"}
              </button>
            </form>
          </div>
        </div>
      )}

      {isCUDModalOpen && (
        <CULanguageModal
          onClose={() => setIsCUDModalOpen(false)}
          mode="update"
          languageToUpdate={languageToUpdate!}
        />
      )}
      {isCModalOpen && (
        <CULanguageModal onClose={() => setIsCModalOpen(false)} />
      )}
    </>
  );
}
