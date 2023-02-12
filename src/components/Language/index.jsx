import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { LanguageText } from './styles';

const languageMapper = {
  en: {
    route: '/',
    name: 'eng',
  },
  uk: {
    route: '/uk',
    name: 'ua',
  },
};

const Language = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');
  const navigate = useNavigate();
  const newLanguage = language === 'uk' ? 'en' : 'uk';

  const handleLanguageChange = () => {
    setLanguage(newLanguage);
    navigate(languageMapper[newLanguage].route);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
    document.title = t('description');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, i18n]);

  return <LanguageText onClick={handleLanguageChange}>{languageMapper[newLanguage].name}</LanguageText>;
};

export default Language;
