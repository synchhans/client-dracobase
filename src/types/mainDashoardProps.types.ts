import { User } from "./user.types";

interface ContentMap {
  [key: string]: React.ComponentType<{ user: User }>;
}

export interface MainDashoardProps {
  id6?: string;
  id7?: string;
  id8?: string;
  id9?: string;
  id10?: string;
  id11?: string;
  user: User;
  contentMap: ContentMap;
}
