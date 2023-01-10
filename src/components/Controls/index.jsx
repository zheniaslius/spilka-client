import React, { useContext } from 'react';

import { CallContext } from '../../context/CallContext';
import { QueueContext } from '../../context/QueueContext';
import { Container, CallIcon, ControlsButton, FlexContainer } from './styles';
import Microphone from './Microphone'
import notificaionSound from '../../assets/sounds/notifications-sound-127856_6LGXAENB.mp3'

const Controls = () => {
  const { callPending, leaveCall, hangUp, callUser, stream, setUserDisconnected } = useContext(CallContext);
  const { findSpeaker, setSearchStatus, loading } = useContext(QueueContext);
  const audio = new Audio(notificaionSound);

  const callRandomUser = async () => {
    await setSearchStatus(true);
    setUserDisconnected(false);
    const speakerId = await findSpeaker();
    callUser(speakerId);

    audio.play();
  };

  return (
    <Container>
      {callPending || loading ? (
        <FlexContainer>
          <ControlsButton onClick={callPending ? leaveCall : hangUp} cancel>
            <CallIcon />
          </ControlsButton>
          <Microphone stream={stream} />
        </FlexContainer>
      ) : (
        <ControlsButton onClick={callRandomUser}>
          <CallIcon />
        </ControlsButton>
      )}
    </Container>
  );
};

export default Controls;
