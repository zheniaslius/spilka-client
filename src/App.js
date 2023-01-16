import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

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

  @media ${device.laptopHeight} {
    margin: 20px auto;
    max-width: 483px;
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

  @media ${device.laptopHeight} {
    margin-top: 30px;
  }
`;

const TRACKING_ID = 'G-QTFJJYLH4C';
ReactGA.initialize(TRACKING_ID);

const App = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

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
