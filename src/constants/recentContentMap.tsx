import dynamic from "next/dynamic";

const RecentContent = dynamic(
  () => import("@/app/(dashboard)/dashboard/ui/RecentContent")
);

const RecentMaster = dynamic(
  () => import("@/app/(master)/master/ui/RecentMaster")
);

const RecentDosen = dynamic(() => import("@/app/(dosen)/dosen/ui/RecentDosen"));

const RecentPengamat = dynamic(
  () => import("@/app/(pengamat)/pengamat/ui/RecentPengamat")
);

export const recentContentMap = {
  "/dashboard": () => (
    <RecentContent id1="step-recent" id2="step-recent-content" />
  ),
  "/pengamat": () => (
    <RecentPengamat id1="step-recent" id2="step-recent-content" />
  ),
  "/master": () => <RecentMaster />,
  "/dosen": () => <RecentDosen />,
};
