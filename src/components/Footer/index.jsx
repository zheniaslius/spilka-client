import React from 'react';

import CurrentUsers from '../../components/CurrentUsers';
import { FooterContainer, Contact, TelegramIcon } from './styles';

const Footer = () => {
  return (
    <FooterContainer>
      <Contact href='https://t.me/Eugene332' target="_blank" rel="noreferrer">Contact<TelegramIcon/></Contact>
      <CurrentUsers />
    </FooterContainer>
  );
};

export default Footer;
