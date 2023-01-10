import React, { useContext } from 'react';
import { MoonLoader } from 'react-spinners';

import { CallContext } from '../../context/CallContext';
import { QueueContext } from '../../context/QueueContext';
import { Pulse, Outline, Container, UserLogo, GuideText, SearchContainer, DisconnectedLogo, ErrorContainer } from './styles';

const Main = () => {
  const { callPending, userDisconnected } = useContext(CallContext);
  const { loading } = useContext(QueueContext);

  const getScreen = () => {
    if (callPending) {
      return (
        <Pulse>
          <Outline />
          <Outline delayed />
          <UserLogo />
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
      <GuideText mb="70px">Seaching for someone...</GuideText>
      <MoonLoader loading={loading} color="#ffffff" speedMultiplier={0.6} />
    </SearchContainer>
  ) : (
    <GuideText>
      To start anonymous chat press the button <br />
      Conversations are not recorded
    </GuideText>
  );
};

const DisconnectedText = () => {
  return (
    <ErrorContainer>
      <GuideText mb="70px">User disconnected</GuideText>
      <DisconnectedLogo />
    </ErrorContainer>
  );
};

export default Main;
