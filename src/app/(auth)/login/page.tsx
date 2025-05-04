"use client";

import useGuest from "@/hooks/useGuest";
import ErrorHandler from "../../../components/common/ErrorHandler";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import HeaderLogin from "@/app/(auth)/login/components/HeaderLogin";
import ButtonLoginWith from "@/components/common/ButtonLoginWith";
import FooterLogin from "@/app/(auth)/login/components/FooterLogin";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import { openPopup } from "@/utils/popupUtils";

export default function Login() {
  const {
    user,
    isLoading,
    error,
    handleUpdateUser,
    refetchUser,
    isProfileComplete,
  } = useGuest();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data === "AUTH_SUCCESS") {
        try {
          await refetchUser();
          setShowEditProfile(true);
        } catch (err) {
          console.error("Error during refetch:", err);
        }
      } else if (event.data === "REDIRECT_DASHBOARD") {
        setIsRedirecting(true);
        window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [refetchUser]);

  useEffect(() => {
    if (
      isProfileComplete &&
      !isRedirecting &&
      window.location.pathname === "/login"
    ) {
      setIsRedirecting(true);
      window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`;
    }
  }, [isProfileComplete, isRedirecting]);

  if (error) {
    return (
      <ErrorHandler message={error} onRetry={() => window.location.reload()} />
    );
  }

  if (isLoading || isRedirecting) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {showEditProfile ? (
        <LoginForm user={user!} handleUpdateUser={handleUpdateUser} />
      ) : (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <HeaderLogin />
          <ButtonLoginWith openPopup={openPopup} />
          <FooterLogin />
        </div>
      )}
    </div>
  );
}
