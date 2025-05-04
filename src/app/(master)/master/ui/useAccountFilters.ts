import { User } from "@/types/user.types";

export const useAccountFilters = ({
  accounts,
  searchTerm,
  sortBy,
  filterLoginVia,
  filterProfileComplete,
}: {
  accounts: User[];
  searchTerm: string;
  sortBy: "latest" | "oldest";
  filterLoginVia: string;
  filterProfileComplete: "completed" | "incomplete" | "";
}): User[] => {
  if (!Array.isArray(accounts)) return [];

  let filtered = [...accounts];

  if (searchTerm) {
    filtered = filtered.filter((user) =>
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortBy === "latest") {
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortBy === "oldest") {
    filtered.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  if (filterLoginVia === "Google") {
    filtered = filtered.filter((user) => user.googleId);
  } else if (filterLoginVia === "GitHub") {
    filtered = filtered.filter((user) => user.githubId);
  }

  if (filterProfileComplete === "completed") {
    filtered = filtered.filter((user) => user.isProfileComplete);
  } else if (filterProfileComplete === "incomplete") {
    filtered = filtered.filter((user) => !user.isProfileComplete);
  }

  return filtered;
};
