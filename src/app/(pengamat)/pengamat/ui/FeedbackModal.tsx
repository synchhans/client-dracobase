import React from "react";
import { FaTimes } from "react-icons/fa";

interface FeedbackModalProps {
  displyname: string;
  isOpen: boolean;
  onClose: () => void;
  feedbacks: any[];
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  feedbacks,
  displyname,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-100 text-gray-600 hover:bg-gray-200 transition duration-300 p-2 rounded-full"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Feedback dari <span className="text-blue-500">{displyname}</span>
        </h2>

        {feedbacks.length > 0 ? (
          <ul className="space-y-4">
            {feedbacks.map((feedback, index) => (
              <li
                key={index}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <p className="font-medium text-gray-700">{feedback.feedback}</p>
                {feedback.image && (
                  <div className="mt-4">
                    <img
                      src={feedback.image}
                      alt="Screenshot"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">
              Tidak ada feedback tersedia.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
