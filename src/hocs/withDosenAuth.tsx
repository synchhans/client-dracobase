import { useEffect } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorHandler from "@/components/common/ErrorHandler";
import HeaderDashboard from "@/components/ui/HeaderDashboard";
import MainDashboard from "@/components/ui/MainDashboard";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { MainDashoardProps } from "@/types/mainDashoardProps.types";

const withDosenAuth = (contentMap: MainDashoardProps["contentMap"]) => {
  const DosenAuthComponent = () => {
    const router = useRouter();
    const { user, isLoading, isAuthorized, handleLogout, error } = useAuth();

    useEffect(() => {
      if (!isLoading && user) {
        if (user && user.level !== "dosen") {
          router.push("/dashboard");
        }
      }
    }, [isLoading, user, router]);

    if (isLoading || !isAuthorized || user?.level !== "dosen") {
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

  DosenAuthComponent.displayName = `DosenAuthComponent(${Object.keys(
    contentMap
  ).join(", ")})`;

  return DosenAuthComponent;
};

export default withDosenAuth;
