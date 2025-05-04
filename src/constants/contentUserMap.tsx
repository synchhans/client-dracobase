import dynamic from "next/dynamic";

const GetStartedContent = dynamic(
  () => import("@/app/(dashboard)/dashboard/ui/GetStartedContent")
);
const SettingContent = dynamic(
  () => import("@/app/(dashboard)/dashboard/ui/SettingContent")
);
const RecentlyDeletedContent = dynamic(
  () => import("@/app/(dashboard)/dashboard/ui/RecentlyDeletedContent")
);

export const contentUserMap = {
  "/get-started": GetStartedContent,
  "/setting": SettingContent,
  "/deleted": RecentlyDeletedContent,
};
