import { createContext, useState, ReactNode } from "react";
import { Language } from "@/types/language.types";

interface LanguageContextType {
  languages: Language[];
  setLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [languages, setLanguages] = useState<Language[]>([]); // State dengan tipe Language[]

  return (
    <LanguageContext.Provider value={{ languages, setLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};