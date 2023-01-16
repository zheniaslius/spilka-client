import React, { useContext } from 'react';
import { MoonLoader } from 'react-spinners';

import { CallContext } from '../../context/CallContext';
import { QueueContext } from '../../context/QueueContext';
import { MicrophoneContext } from '../../context/MicrophoneContext';
import {
  Pulse,
  Outline,
  Container,
  UserLogo,
  GuideText,
  SearchContainer,
  DisconnectedLogo,
  ErrorContainer,
  WarningMsg,
} from './styles';

const Main = () => {
  const { callPending, userDisconnected } = useContext(CallContext);
  const { loading } = useContext(QueueContext);
  const { muted } = useContext(MicrophoneContext);

  const getScreen = () => {
    if (callPending) {
      return (
        <Pulse>
          <Outline />
          <Outline delayed />
          <UserLogo />
          <WarningMsg>{muted && 'Your mic is muted'}</WarningMsg>
        </Pulse>
      );
    }
    if (userDisconnected) {
      return <DisconnectedText />;
    }
    return <InitialText loading={loading} />;
  };

  return <Container>{getScreen()}</Container>;
};

const InitialText = ({ loading }) => {
  return loading ? (
    <SearchContainer>
      <GuideText mb="70px">Seaching for someone cool</GuideText>
      <MoonLoader loading={loading} color="#ffffff" speedMultiplier={0.6} />
    </SearchContainer>
  ) : (
    <GuideText>
      To start anonymous chat press the button <br />
      Conversations are not recorded. <a href="https://bloggeek.me/is-webrtc-safe/" target="_blank" rel="noreferrer">Learn how</a>
    </GuideText>
  );
};

const DisconnectedText = () => {
  return (
    <ErrorContainer>
      <GuideText mb="70px">
        User disconnected <br />
        Start new search
      </GuideText>
      <DisconnectedLogo />
    </ErrorContainer>
  );
};

export default Main;
