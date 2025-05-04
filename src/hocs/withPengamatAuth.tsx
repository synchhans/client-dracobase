import { useEffect } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorHandler from "@/components/common/ErrorHandler";
import HeaderDashboard from "@/components/ui/HeaderDashboard";
import MainDashboard from "@/components/ui/MainDashboard";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { MainDashoardProps } from "@/types/mainDashoardProps.types";
import introJs from "intro.js";
import ExpandableIconMenu from "@/app/(pengamat)/pengamat/ui/ExpandableIconMenu";

type TutorialStep = {
  element: string;
  intro: string;
};

const withPengamatAuth = (
  contentMap: MainDashoardProps["contentMap"],
  tutorialKey?: string,
  tutorialSteps?: TutorialStep[]
) => {
  const PengamatAuthComponent = () => {
    const router = useRouter();
    const { user, isLoading, isAuthorized, handleLogout, error } = useAuth();

    useEffect(() => {
      if (user && user.level !== "pengamat") {
        router.push("/dashboard");
      }
    }, [user, router]);

    useEffect(() => {
      if (!tutorialSteps || !tutorialKey) return;

      const hasSeenTutorial = localStorage.getItem(`tutorial_${tutorialKey}`);
      if (hasSeenTutorial) return;

      const checkElementsExist = () => {
        const allElementsPresent = tutorialSteps.every((step) =>
          document.querySelector(step.element)
        );

        if (allElementsPresent) {
          const intro = introJs();
          intro.setOptions({
            tooltipPosition: "auto",
            tooltipClass: "bg-white text-black shadow-lg z-50",
            buttonClass: "px-2 py-1 rounded text-sm",
            steps: tutorialSteps.map((step) => ({
              element: step.element,
              intro: step.intro,
            })),
            exitOnOverlayClick: false,
            exitOnEsc: false,
            disableInteraction: true,
          });

          intro.oncomplete(() => {
            localStorage.setItem(`tutorial_${tutorialKey}`, "completed");
          });

          intro.onexit(() => {
            localStorage.setItem(`tutorial_${tutorialKey}`, "completed");
          });

          intro.start();
        } else {
          setTimeout(checkElementsExist, 300);
        }
      };

      checkElementsExist();

      return () => {
        introJs().exit(true);
      };
    }, []);

    if (isLoading || !isAuthorized || user?.level !== "pengamat") {
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
        <HeaderDashboard
          tutorialKey={tutorialKey}
          id1={"step-lencana"}
          id2={"step-re-tutorial"}
          id3={"step-button-language"}
          id4={"step-button-notification"}
          id5={"step-button-settings"}
          user={user!}
          handleLogout={handleLogout}
        />
        <MainDashboard
          id6={"step-button-recent"}
          id7={"step-button-documentation"}
          id8={"step-button-setting"}
          id9={"step-button-recently"}
          id10={"step-button-account"}
          id11={"step-button-maintenance"}
          user={user!}
          contentMap={contentMap}
        />
        <ExpandableIconMenu id12={"step-button-pengamat"} />
      </div>
    );
  };

  PengamatAuthComponent.displayName = `PengamatAuthComponent(${Object.keys(
    contentMap
  ).join(", ")})`;

  return PengamatAuthComponent;
};

export default withPengamatAuth;
