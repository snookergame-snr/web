import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'th' | 'en';

export function useLanguage() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>('th');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return { language, changeLanguage };
}
