import dynamic from "next/dynamic";

const AccountContent = dynamic(
  () => import("@/app/(master)/master/ui/AccountContent")
);

const MaintenanceControl = dynamic(
  () => import("@/app/(master)/master/ui/MaintenanceControl")
);

export const contentMasterMap = {
  "/account": AccountContent,
  "/sysmaster": MaintenanceControl,
};
