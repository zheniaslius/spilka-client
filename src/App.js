import React from 'react';
import styled from 'styled-components';

import Main from './components/Main';
import Audio from './components/Audio';
import Controls from './components/Controls';
import CurrentUsers from './components/CurrentUsers';
import Header from './components/Header';

import { device } from './constants';

const Wrapper = styled.div`
  margin: 120px auto;
  max-width: 620px;

  @media (max-width: 680px) {
    margin: 20px 15px 0;
    padding: 0 15px;
  }

  @media ${device.mobileL} {
    margin: 20px 0;
  }
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.darkBlue};
  border-radius: 20px;
  box-shadow: 0px 5px 14px -1px rgb(2 3 12 / 37%);
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 41px;
  padding: 0 13px;

  @media ${device.mobileL} {
    margin-top: 30px;
  }
`;

const App = () => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Main />
        <Audio />
        <Controls />
      </Container>
      <Footer>
        <CurrentUsers />
      </Footer>
    </Wrapper>
  );
};

export default App;
