import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { LanguageText } from './styles';

const languageMapper = {
  en: {
    name: 'eng',
  },
  uk: {
    name: 'ua',
  },
};

const Language = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [language, setLanguage] = useState(i18n.language || 'en');
  const newLanguage = language === 'uk' ? 'en' : 'uk';

  const handleLanguageChange = () => {
    setLanguage(newLanguage);
    router.push('/', '/', { locale: newLanguage });
  };

  useEffect(() => {
    i18n.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, i18n]);

  return <LanguageText onClick={handleLanguageChange}>{languageMapper[newLanguage].name}</LanguageText>;
};

export default Language;
