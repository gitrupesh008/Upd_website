import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'te';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  
  const toggleLang = () => setLang(prev => prev === 'en' ? 'te' : 'en');
  
  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
