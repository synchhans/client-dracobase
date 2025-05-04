import { useState } from "react";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/pengamat`;

type FeedbackPengamat = {
  _id: string;
  userId: string;
  feedback: string;
  image?: string;
  createdAt: Date;
};

interface UseFeedbackPengamatResult {
  image: string | null;
  feedbackText: string;
  isCapturing: boolean;
  loading: boolean;
  captureScreenshot: () => Promise<void>;
  setFeedbackText: (text: string) => void;
  submitFeedback: () => Promise<void>;
  reset: () => void;
  fetchFeedbackByUserId: (userId: string) => Promise<FeedbackPengamat[]>;
  fetchFeedbackCountByUserId: (userId: string) => Promise<number>;
}

const useFeedbackPengamat = (): UseFeedbackPengamatResult => {
  const [image, setImage] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchFeedbackByUserId = async (
    userId: string
  ): Promise<FeedbackPengamat[]> => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        return data.data;
      } else {
        throw new Error("Gagal mengambil feedback.");
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      alert("Terjadi kesalahan saat mengambil feedback.");
      return [];
    }
  };

  const fetchFeedbackCountByUserId = async (
    userId: string
  ): Promise<number> => {
    try {
      const response = await fetch(`${API_URL}/count/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        return typeof data.data === "number" ? data.data : 0;
      } else {
        throw new Error("Gagal menghitung feedback.");
      }
    } catch (error) {
      console.error("Error fetching feedback count:", error);
      alert("Terjadi kesalahan saat menghitung feedback.");
      return 0;
    }
  };

  const captureScreenshot = async () => {
    setIsCapturing(true);
    setLoading(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = document.documentElement.scrollWidth;
      const height = document.documentElement.scrollHeight;
      canvas.width = width;
      canvas.height = height;

      const scaleFactor = 2;
      canvas.width *= scaleFactor;
      canvas.height *= scaleFactor;
      ctx.scale(scaleFactor, scaleFactor);

      const options = {
        scale: scaleFactor,
        useCORS: true,
        logging: true,
        allowTaint: false,
        foreignObjectRendering: true,
      };

      const canvasElement = await html2canvas(
        document.documentElement,
        options
      );
      const imgData = canvasElement.toDataURL("image/png");
      setImage(imgData);
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    } finally {
      setIsCapturing(false);
      setLoading(false);
    }
  };

  const submitFeedback = async () => {
    if (!image || !feedbackText) {
      alert("Silakan ambil screenshot dan isi feedback.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          feedback: feedbackText,
        }),
      });

      if (response.ok) {
        toast.success("Feedback berhasil dikirim!");
      } else {
        toast.error("Gagal mengirim feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Terjadi kesalahan saat mengirim feedback.");
    } finally {
      reset();
    }
  };

  const reset = () => {
    setImage(null);
    setFeedbackText("");
  };

  return {
    image,
    feedbackText,
    isCapturing,
    loading,
    captureScreenshot,
    setFeedbackText,
    submitFeedback,
    reset,
    fetchFeedbackByUserId,
    fetchFeedbackCountByUserId,
  };
};

export default useFeedbackPengamat;
