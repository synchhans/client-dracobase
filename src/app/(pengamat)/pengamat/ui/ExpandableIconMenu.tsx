import React, { useState, useEffect } from "react";
import { FaSearchPlus } from "react-icons/fa";
import Link from "next/link";
import FeedbackForm from "./FeedbackForm";
import useFeedbackPengamat from "@/hooks/useFeedbackPengamat";

const ExpandableIconMenu = ({ id12 }: { id12?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const {
    image,
    feedbackText,
    isCapturing,
    loading,
    captureScreenshot,
    setFeedbackText,
    submitFeedback,
    reset,
  } = useFeedbackPengamat();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openFeedbackForm = () => {
    captureScreenshot();
    toggleMenu();
  };

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
    reset();
  };

  useEffect(() => {
    if (image) {
      setShowFeedbackForm(true);
    }
  }, [image]);

  return (
    <div className="fixed bottom-4 right-4 z-50" id={id12}>
      <button
        onClick={toggleMenu}
        className="p-4 bg-blue-500 text-white rounded-full shadow-lg"
      >
        <FaSearchPlus className="text-xl" />
      </button>
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white p-4 rounded-lg shadow-lg w-48">
          <div className="flex flex-col space-y-2">
            <button
              onClick={openFeedbackForm}
              className="cursor-pointer text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
            >
              Berikan Masukan
            </button>
            <Link
              href="https://wa.me/6283804506486"
              target="_blank"
              onClick={toggleMenu}
              className="cursor-pointer text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
            >
              Hubungi Developer
            </Link>
          </div>
        </div>
      )}
      {isCapturing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-600 text-xl">
          Loading...
        </div>
      )}
      {showFeedbackForm && (
        <FeedbackForm
          onClose={closeFeedbackForm}
          image={image}
          feedbackText={feedbackText}
          setFeedbackText={setFeedbackText}
          submitFeedback={submitFeedback}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ExpandableIconMenu;
