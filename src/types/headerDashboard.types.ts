import { User } from "./user.types";

export interface HeaderDashboardProps {
  tutorialKey?: string;
  id1?: string;
  id2?: string;
  id3?: string;
  id4?: string;
  id5?: string;
  user: User;
  handleLogout: () => void;
}
