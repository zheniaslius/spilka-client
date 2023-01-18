import React, { useState, useContext, useEffect } from 'react';
import ReactGA from 'react-ga4';

import { CallContext } from '../../context/CallContext';
import { QueueContext } from '../../context/QueueContext';
import { Container, CallIcon, ControlsButton, FlexContainer } from './styles';
import Microphone from './Microphone';
import notificaionSound from '../../assets/sounds/notifications-sound-127856_6LGXAENB.mp3';

const Controls = () => {
  const [disabled, setDisabled] = useState(false);
  const { callPending, leaveCall, hangUp, callUser, setUserDisconnected } = useContext(CallContext);
  const { findSpeaker, updateDocument, loading } = useContext(QueueContext);
  const audio = new Audio(notificaionSound);

  useEffect(() => {
    // prevent another tab open
    const channel = new BroadcastChannel('tab');
    let isOriginal = true;

    channel.postMessage('another-tab');

    channel.addEventListener('message', (msg) => {
      if (msg.data === 'another-tab' && isOriginal) {
        channel.postMessage('already-open');
      }
      if (msg.data === 'already-open') {
        isOriginal = false;
        setDisabled(true);
        alert('Cannot open multiple instances');
      }
    });
  }, []);

  const callRandomUser = async () => {
    if (disabled) return;

    ReactGA.event({
      category: 'App',
      action: 'Started search',
    });
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
        <ControlsButton onClick={callRandomUser} disabled={disabled}>
          <CallIcon />
        </ControlsButton>
      )}
    </Container>
  );
};

export default Controls;
