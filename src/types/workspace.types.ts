import { Language } from "./language.types";
import { User } from "./user.types";

export interface Workspace {
  _id: string;
  userId: User;
  name: string;
  description: string;
  language: Language;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
