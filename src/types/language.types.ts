import { ReactNode } from "react";

export interface Language {
  _id?: string;
  name: string;
  icon: string;
  description: string;
  categories: string[];
  materials: Material[];
  published: boolean;
}

export interface ContentBlock {
  _id?: string;
  type: "text" | "code" | "commands" | "terminal" | "image" | "video";
  content: string[];
  order: number;
}

export interface Material {
  _id?: string;
  title: string;
  contentBlocks: ContentBlock[];
  createdAt?: string;
}

export interface FormData {
  name: string;
  icon: string;
  description: string;
  categories: string[];
  materials: Material[];
  published: boolean;
}

export type FormErrors = Partial<Record<keyof FormData, string>>;

export interface SubmitButtonProps {
  isLoading: boolean;
  isFormValid: boolean;
  handleSubmit: () => void;
  children?: ReactNode;
}

export interface FormFieldsProps {
  formData: FormData;
  formErrors: FormErrors;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

export interface MaterialInputProps {
  materials: Material[];
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formErrors: FormErrors;
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

export interface CULanguageModalProps {
  onClose: () => void;
  mode?: "add" | "update";
  languageToUpdate?: Language;
}
