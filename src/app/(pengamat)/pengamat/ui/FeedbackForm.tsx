import React from "react";
import { FaTimes } from "react-icons/fa";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface FeedbackFormProps {
  onClose: () => void;
  image: string | null;
  feedbackText: string;
  setFeedbackText: (text: string) => void;
  submitFeedback: () => Promise<void>;
  loading: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onClose,
  image,
  feedbackText,
  setFeedbackText,
  submitFeedback,
  loading,
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitFeedback();
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-h-screen w-full overflow-y-auto flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded"
          >
            <FaTimes />
          </button>
          <h2 className="text-xl font-bold mb-4">Berikan Masukan</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Screenshot
              </label>
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner />
                  <span className="ml-2">Mengambil Screenshot...</span>
                </div>
              ) : (
                image && (
                  <div className="mt-2">
                    <img src={image} alt="Screenshot" className="max-w-full" />
                  </div>
                )
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Masukan dari pengamat
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={4}
                required
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Tutup
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
