import { useEffect } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorHandler from "@/components/common/ErrorHandler";
import HeaderDashboard from "@/components/ui/HeaderDashboard";
import MainDashboard from "@/components/ui/MainDashboard";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { MainDashoardProps } from "@/types/mainDashoardProps.types";

const withMasterAuth = (contentMap: MainDashoardProps["contentMap"]) => {
  return () => {
    const router = useRouter();
    const { user, isLoading, isAuthorized, handleLogout, error } = useAuth();

    useEffect(() => {
      if (user && user.level !== "admin") {
        router.push("/dashboard");
      }
    }, [user, router]);

    if (isLoading || !isAuthorized || user?.level !== "admin") {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <ErrorHandler
          message={error}
          onRetry={() => {
            window.location.reload();
          }}
        />
      );
    }

    return (
      <div className="min-h-screen">
        <HeaderDashboard user={user!} handleLogout={handleLogout} />
        <MainDashboard user={user!} contentMap={contentMap} />
      </div>
    );
  };
};

export default withMasterAuth;
