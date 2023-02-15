import React from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga4';

import Main from '../components/Main';
import Audio from '../components/Audio';
import Controls from '../components/Controls';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { device } from '../constants';
import { ThemeProvider } from 'styled-components';
import '../i18n';

import { CallContextProvider } from '../context/CallContext';
import { QueueContextProvider } from '../context/QueueContext';
import { MicrophoneContextProvider } from '../context/MicrophoneContext';

const theme = {
  colors: {
    black: '#040a20',
    blue: '#4285f4',
    darkBlue: '#161d34',
    white: '#ffffff',
    red: '#EB4F6F',
    grey: '#ffffff45',
  },
};

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

const TRACKING_ID = 'G-C4YZZ43W5F';
ReactGA.initialize(TRACKING_ID);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MicrophoneContextProvider>
        <QueueContextProvider>
          <CallContextProvider>
            <Wrapper>
              <Header />
              <Container>
                <Main />
                <Audio />
                <Controls />
              </Container>
              <Footer />
            </Wrapper>
          </CallContextProvider>
        </QueueContextProvider>
      </MicrophoneContextProvider>
    </ThemeProvider>
  );
};

export default App;
