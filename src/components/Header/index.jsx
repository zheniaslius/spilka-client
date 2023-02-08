import React from 'react';
import Language from '../Language';

import { Container, AppName } from './styles';

const Header = () => {
  return (
    <Container>
      <AppName>Spilka</AppName>
      <Language />
    </Container>
  );
};

export default Header;
