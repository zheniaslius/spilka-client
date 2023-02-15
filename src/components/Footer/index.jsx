import React from 'react';

import CurrentUsers from '../../components/CurrentUsers';
import TelegramIcon from '../../components/Icons/TelegramIcon';
import { FooterContainer, Contact } from './styles';

const Footer = () => {
  return (
    <FooterContainer>
      <Contact href='https://t.me/Eugene332' target="_blank" rel="noreferrer"><TelegramIcon/>Contact</Contact>
      <CurrentUsers />
    </FooterContainer>
  );
};

export default Footer;
