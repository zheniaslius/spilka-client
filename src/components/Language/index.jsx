import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { LanguageText } from './styles';

const Language = () => {
  const { i18n } = useTranslation();
  const { lng: lngParams } = useParams();
  const isUkrainian = i18n.language === 'uk';
  const displayLng = isUkrainian ? 'eng' : 'ua';

  useEffect(() => {
    const newLanguage = lngParams === 'uk' ? 'uk' : 'en';
    i18n.changeLanguage(newLanguage);
  }, [lngParams, i18n]);

  return <LanguageText href={isUkrainian ? ' /' : 'uk'}>{displayLng}</LanguageText>;
};

export default Language;
