import { Language } from "./language.types";

interface Workspace {
  id: string;
  name: string;
  description?: string;
  language: Language;
}

export interface Recent {
  id: string;
  workspace: Workspace;
  accessedAt: string;
  isCompleted: boolean;
}
