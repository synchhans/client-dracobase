import { User } from "./user.types";

export interface LoginFormProps {
  user: User;
  handleUpdateUser: (userData: User, type: string) => Promise<void>;
}
