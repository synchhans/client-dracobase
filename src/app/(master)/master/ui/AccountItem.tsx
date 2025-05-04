import { RefObject, useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Image from "next/image";
import { User } from "@/types/user.types";
import useFeedbackPengamat from "@/hooks/useFeedbackPengamat";
import FeedbackModal from "@/app/(pengamat)/pengamat/ui/FeedbackModal";

type FeedbackPengamat = {
  _id: string;
  userId: string;
  feedback: string;
  createdAt: Date;
};

export default function AccountItem({
  user,
  activeDropdown,
  toggleDropdown,
  openEditModal,
  handleDelete,
  actionRef,
}: {
  user: User;
  activeDropdown: string | null;
  toggleDropdown: () => void;
  openEditModal: () => void;
  handleDelete: () => void;
  actionRef: RefObject<HTMLDivElement | null>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackPengamat[]>([]);
  const [feedbackCount, setFeedbackCount] = useState<number>(0);
  const { fetchFeedbackByUserId, fetchFeedbackCountByUserId } =
    useFeedbackPengamat();

  useEffect(() => {
    if (user.level === "pengamat") {
      fetchFeedbackCountByUserId(user._id)
        .then((count) => setFeedbackCount(count))
        .catch((error) => {
          console.error("Error fetching feedback count:", error);
          setFeedbackCount(0);
        });
    }
  }, [user._id, user.level, fetchFeedbackCountByUserId]);

  const handleCardClick = async () => {
    if (user.level === "pengamat") {
      try {
        const feedbackData = await fetchFeedbackByUserId(user._id);
        setFeedbacks(feedbackData);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-between py-4 px-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer relative"
        onClick={handleCardClick}
      >
        {user.level === "pengamat" && feedbackCount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {feedbackCount}
          </div>
        )}

        <div className="flex items-center gap-x-4 flex-grow">
          <div className="flex-shrink-0 relative w-10 h-10">
            <Image
              src={user.picture || ""}
              alt={`${user.displayName}'s profile`}
              width={100}
              height={100}
              className="w-full h-full rounded-full object-cover"
              priority
            />
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">
              {user.displayName}
            </h3>
            <p
              className={`inline text-xs sm:text-sm text-white px-1 rounded-md line-clamp-2 ${
                user.level === "admin"
                  ? "bg-green-500"
                  : user.level === "pengamat"
                  ? "bg-yellow-500"
                  : "bg-blue-800"
              }`}
            >
              {user.level}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
              Login via {user.googleId ? "Google" : "GitHub"}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
              Role: {user.role}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
              Plan: {user.plan}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
              Profile Complete: {user.isProfileComplete ? "Yes" : "No"}
            </p>
            <p
              className={`inline text-xs text-white px-1 rounded-md line-clamp-2 ${
                user.status === "active" ? "bg-cyan-500" : "bg-red-600"
              }`}
            >
              {user.status}
            </p>
          </div>
        </div>
        <div className="relative">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }}
          >
            <FaEllipsisV className="w-5 h-5 cursor-pointer" />
          </button>
          {activeDropdown === user._id && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10"
              ref={actionRef}
            >
              <ul className="py-1">
                <li>
                  <button
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal();
                    }}
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                  >
                    Hapus
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <FeedbackModal
        displyname={user?.displayName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feedbacks={feedbacks}
      />
    </>
  );
}
