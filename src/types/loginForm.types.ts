import { User } from "./user.types";

export interface LoginFormProps {
  user: User;
  handleUpdateUser: (userData: User) => Promise<void>;
}
