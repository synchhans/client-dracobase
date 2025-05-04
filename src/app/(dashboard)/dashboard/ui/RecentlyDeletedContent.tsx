import ExpandableIconMenu from "@/app/(pengamat)/pengamat/ui/ExpandableIconMenu";
import { User } from "@/types/user.types";

export default function RecentlyDeletedContent({ user }: { user: User }) {
  return (
    <div>
      Recently Deleted Content
      {user?.level === "pengamat" && <ExpandableIconMenu />}
    </div>
  );
}
