import {
  ContentBlock,
  FormErrors,
  Material,
  MaterialInputProps,
} from "@/types/language.types";
import { useEffect, useState } from "react";
import {
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaTimes,
  FaFileAlt,
  FaCode,
  FaTerminal,
  FaImage,
  FaVideo,
} from "react-icons/fa";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function MaterialInput({
  materials,
  setFormData,
  formErrors,
  setFormErrors,
}: MaterialInputProps) {
  const [newMaterial, setNewMaterial] = useState<Material>({
    title: "",
    contentBlocks: [],
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentContentType, setCurrentContentType] = useState<
    ContentBlock["type"] | null
  >(null);

  useEffect(() => {
    console.log("Current newMaterial:", newMaterial);
  }, [newMaterial]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addContentBlock = (
    type: ContentBlock["type"],
    content: string | string[]
  ) => {
    const newBlock: ContentBlock = {
      type,
      content: Array.isArray(content) ? content : content.toString(),
      order: newMaterial.contentBlocks.length + 1,
    };
    setNewMaterial((prev) => ({
      ...prev,
      contentBlocks: [...prev.contentBlocks, newBlock],
    }));
    setIsModalOpen(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setNewMaterial((prev) => {
        const oldIndex = prev.contentBlocks.findIndex(
          (block) => block.order === active.id
        );
        const newIndex = prev.contentBlocks.findIndex(
          (block) => block.order === over.id
        );
        const updatedContentBlocks = arrayMove(
          prev.contentBlocks,
          oldIndex,
          newIndex
        );
        const reorderedBlocks = updatedContentBlocks.map((block, index) => ({
          ...block,
          order: index + 1,
        }));
        return {
          ...prev,
          contentBlocks: reorderedBlocks,
        };
      });
    }
  };

  const SortableItem = ({
    id,
    children,
  }: {
    id: number;
    children: React.ReactNode;
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    );
  };

  const handleAddContent = (type: ContentBlock["type"]) => {
    setCurrentContentType(type);
    setIsModalOpen(true);
  };

  const handleSubmitModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("content")?.toString();

    if (!content) {
      alert("Konten tidak boleh kosong.");
      return;
    }

    if (currentContentType === "commands") {
      addContentBlock(
        "commands",
        content.split(",").map((cmd) => cmd.trim())
      );
    } else if (currentContentType === "terminal") {
      addContentBlock("terminal", content);
    } else {
      addContentBlock(currentContentType!, content);
    }
  };

  const addMaterial = () => {
    if (!newMaterial.title.trim() || newMaterial.contentBlocks.length === 0) {
      let errorMessage = "";
      if (!newMaterial.title.trim() && newMaterial.contentBlocks.length === 0) {
        errorMessage = "Judul dan minimal satu content block wajib diisi.";
      } else if (!newMaterial.title.trim()) {
        errorMessage = "Judul materi wajib diisi.";
      } else {
        errorMessage = "Minimal satu content block wajib diisi.";
      }
      setFormErrors((prev: FormErrors) => ({
        ...prev,
        materials: errorMessage,
      }));
      return;
    }

    const updatedMaterials = [...materials, newMaterial];
    setFormData((prev) => ({ ...prev, materials: updatedMaterials }));
    setNewMaterial({ title: "", contentBlocks: [] });

    validateMaterials(updatedMaterials);
  };

  const editMaterial = (index: number) => {
    const materialToEdit = materials[index];
    setNewMaterial(materialToEdit);
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setNewMaterial({ title: "", contentBlocks: [] });
  };

  const updateMaterial = () => {
    if (!newMaterial.title.trim() || newMaterial.contentBlocks.length === 0) {
      setFormErrors((prev: FormErrors) => ({
        ...prev,
        materials:
          !newMaterial.title.trim() && newMaterial.contentBlocks.length === 0
            ? "Judul dan minimal satu content block wajib diisi."
            : !newMaterial.title.trim()
            ? "Judul materi wajib diisi."
            : "Minimal satu content block wajib diisi.",
      }));
      return;
    }

    const updatedMaterials = [...materials];
    updatedMaterials[editingIndex!] = newMaterial;
    setFormData((prev) => ({ ...prev, materials: updatedMaterials }));

    setNewMaterial({ title: "", contentBlocks: [] });

    setEditingIndex(null);
    validateMaterials(updatedMaterials);
  };

  const removeMaterial = (index: number) => {
    const updatedMaterials = materials.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, materials: updatedMaterials }));

    validateMaterials(updatedMaterials);
  };

  const validateMaterials = (updatedMaterials: Material[]) => {
    const errors = { ...formErrors };
    errors.materials =
      updatedMaterials.length > 0 ? "" : "Minimal 1 materi harus ditambahkan.";
    setFormErrors(errors);
  };

  const removeContentBlock = (order: number) => {
    setNewMaterial((prev) => {
      const updatedContentBlocks = prev.contentBlocks
        .filter((block) => block.order !== order)
        .map((block, index) => ({
          ...block,
          order: index + 1,
        }));
      return {
        ...prev,
        contentBlocks: updatedContentBlocks,
      };
    });
  };

  return (
    <div>
      <label className="block text-xl font-medium text-gray-700">
        Materi Pembelajaran
      </label>

      <input
        type="text"
        placeholder="Judul Materi"
        value={newMaterial.title}
        onChange={(e) =>
          setNewMaterial((prev) => ({ ...prev, title: e.target.value }))
        }
        className={`block w-full px-3 py-2 border ${
          formErrors.materials && !newMaterial.title.trim()
            ? "border-red-500"
            : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4`}
      />
      {formErrors.materials && !newMaterial.title.trim() && (
        <p className="text-sm text-red-500">{formErrors.materials}</p>
      )}

      <div className="mt-3 flex gap-2 flex-wrap justify-center">
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => handleAddContent("text")}
        >
          <FaFileAlt className="w-5 h-5" />
          Tambah Teks
        </button>
        <button
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          onClick={() => handleAddContent("code")}
        >
          <FaCode className="w-5 h-5" />
          Tambah Kode
        </button>
        <button
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
          onClick={() => handleAddContent("commands")}
        >
          <FaTerminal className="w-5 h-5" />
          Tambah Perintah Terminal
        </button>
        <button
          className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
          onClick={() => handleAddContent("terminal")}
        >
          <FaTerminal className="w-5 h-5" />
          Tambah Terminal
        </button>
        <button
          className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
          onClick={() => handleAddContent("image")}
        >
          <FaImage className="w-5 h-5" />
          Tambah Gambar
        </button>
        <button
          className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
          onClick={() => handleAddContent("video")}
        >
          <FaVideo className="w-5 h-5" />
          Tambah Video
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={newMaterial.contentBlocks.map((block) => block.order)}
          strategy={verticalListSortingStrategy}
        >
          <div className="mt-4 space-y-2">
            {newMaterial.contentBlocks.map((block) => (
              <div key={block.order} className="relative">
                <SortableItem id={block.order}>
                  <div className="p-3 border border-gray-200 rounded-md flex justify-between items-center">
                    <div>
                      <strong>{block.type.toUpperCase()}</strong>:{" "}
                      {block.type === "terminal" ? (
                        <>
                          Terminal dengan kode default:{" "}
                          <code>{block.content}</code>
                        </>
                      ) : (
                        block.content.toString()
                      )}
                    </div>
                  </div>
                </SortableItem>

                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(
                      "Remove button clicked for order:",
                      block.order
                    );
                    removeContentBlock(block.order);
                  }}
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex gap-2 mt-6 justify-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          onClick={editingIndex !== null ? updateMaterial : addMaterial}
        >
          {editingIndex !== null ? "Simpan Perubahan" : "Tambah Materi"}
        </button>
        {editingIndex !== null && (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            onClick={cancelEdit}
          >
            Batal
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-brightness-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Tambah {currentContentType?.toUpperCase()}
            </h3>
            <form onSubmit={handleSubmitModal}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {currentContentType === "commands"
                    ? "Masukkan perintah terminal (pisahkan dengan koma):"
                    : currentContentType === "terminal"
                    ? "Masukkan kode default untuk terminal:"
                    : "Masukkan konten:"}
                </label>
                <textarea
                  name="content"
                  rows={5}
                  className="block w-full h-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2"
                  placeholder={
                    currentContentType === "commands"
                      ? "Perintah 1, Perintah 2, ..."
                      : currentContentType === "terminal"
                      ? "npm start"
                      : "Konten Materi"
                  }
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="my-4 space-y-2">
        {materials.map((material, index) => (
          <div
            key={index}
            className="p-3 border border-gray-200 rounded-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{material.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {material.contentBlocks
                  .map((block) => block.content.toString())
                  .join(", ")}
              </p>
            </div>
            {editingIndex !== index && (
              <div className="relative">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownIndex(dropdownIndex === index ? null : index);
                  }}
                >
                  <FaEllipsisV className="w-5 h-5 cursor-pointer" />
                </button>
                {dropdownIndex === index && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li>
                        <button
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
                          onClick={() => {
                            setDropdownIndex(null);
                            editMaterial(index);
                          }}
                        >
                          <FaEdit className="w-4 h-4" />
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                          onClick={() => {
                            setDropdownIndex(null);
                            removeMaterial(index);
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
          </div>
        ))}
      </div>
    </div>
  );
}
