import React, { useContext } from 'react';

import { CallContext } from '../../context/CallContext';
import { QueueContext } from '../../context/QueueContext';
import { Container, CallIcon, ControlsButton, FlexContainer } from './styles';
import Microphone from './Microphone';
import notificaionSound from '../../assets/sounds/notifications-sound-127856_6LGXAENB.mp3';

const Controls = () => {
  const { callPending, leaveCall, hangUp, callUser, setUserDisconnected } = useContext(CallContext);
  const { findSpeaker, updateDocument, loading } = useContext(QueueContext);
  const audio = new Audio(notificaionSound);

  const callRandomUser = async () => {
    try {
      await updateDocument({ inSearch: true });
      setUserDisconnected(false);
      const speakerId = await findSpeaker();
      callUser(speakerId);
    } catch (error) {
      console.error('Error calling', error);
    }
    audio.play();
  };

  return (
    <Container>
      {callPending || loading ? (
        <FlexContainer>
          <ControlsButton onClick={callPending ? leaveCall : hangUp} cancel>
            <CallIcon />
          </ControlsButton>
          <Microphone />
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
