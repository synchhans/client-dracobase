import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorHandler from "@/components/common/ErrorHandler";
import HeaderDashboard from "@/components/ui/HeaderDashboard";
import MainDashboard from "@/components/ui/MainDashboard";
import { useAuth } from "@/hooks/useAuth";
import { MainDashoardProps } from "@/types/mainDashoardProps.types";

const withAuth = (contentMap: MainDashoardProps["contentMap"]) => {
  return () => {
    const { user, isLoading, isAuthorized, handleLogout, error } = useAuth();

    if (isLoading || !isAuthorized) {
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

export default withAuth;
